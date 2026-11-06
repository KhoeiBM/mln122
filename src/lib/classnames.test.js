// Canh gác lỗi đã từng xảy ra trên bản deploy: một tên lớp CSS dùng chung cho hai
// thành phần khác nhau. Kiểm thử jsdom không thấy được lỗi bố cục, nên lớp bảo vệ
// phải nằm ở tên lớp.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const CSS = readFileSync(join(ROOT, 'app/globals.css'), 'utf8');

function sourceFiles() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(jsx|js)$/.test(entry) && !/\.test\./.test(entry)) out.push(full);
    }
  };
  walk(join(ROOT, 'app'));
  walk(join(ROOT, 'src'));
  return out;
}

// Duyệt theo độ sâu ngoặc để biết khối nào nằm trong @media.
function cssBlocks() {
  const source = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = [];
  const stack = [];
  let buffer = '';
  let body = '';

  for (const char of source) {
    if (char === '{') {
      stack.push(buffer.trim());
      buffer = '';
      body = '';
    } else if (char === '}') {
      const prelude = stack.pop();
      if (prelude && !prelude.startsWith('@')) {
        blocks.push({ selector: prelude, body, topLevel: stack.length === 0 });
      }
      buffer = '';
      body = '';
    } else if (stack.length && !stack[stack.length - 1].startsWith('@')) {
      body += char;
    } else {
      buffer += char;
    }
  }

  return blocks;
}

// Lớp đặt kích thước cố định ở cả hai chiều: đúng kiểu lớp dễ làm hỏng bố cục khi bị
// dùng lại ở một thành phần khác.
function boxClasses() {
  const names = new Set();
  for (const { selector, body } of cssBlocks()) {
    const hasWidth = /(^|[;\s])width:\s*\d+px/.test(body);
    const hasHeight = /(^|[;\s])height:\s*\d+px/.test(body);
    if (!hasWidth || !hasHeight) continue;
    for (const part of selector.split(',')) {
      const match = part.trim().match(/^\.([a-z][\w-]*)/);
      if (match) names.add(match[1]);
    }
  }
  return names;
}

const FILES = sourceFiles();
const SOURCES = new Map(FILES.map((file) => [file, readFileSync(file, 'utf8')]));

function classTokens(source) {
  const classStrings = [...source.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`)/g)]
    .map((match) => match[1] ?? match[2] ?? '')
    .join(' ');
  return new Set(classStrings.split(/[^a-zA-Z0-9_-]+/).filter(Boolean));
}

function filesUsing(className) {
  return FILES.filter((file) => classTokens(SOURCES.get(file)).has(className)).map((file) =>
    file.slice(ROOT.length + 1),
  );
}

describe('tên lớp CSS', () => {
  it('lớp có kích thước cố định chỉ được dùng trong một tệp', () => {
    const shared = [...boxClasses()].filter((name) => filesUsing(name).length > 1);
    expect(shared).toEqual([]);
  });

  it('không định nghĩa trùng một bộ chọn ở cấp ngoài cùng', () => {
    const seen = new Set();
    const duplicated = [];
    for (const block of cssBlocks().filter((item) => item.topLevel)) {
      if (seen.has(block.selector)) duplicated.push(block.selector);
      seen.add(block.selector);
    }
    expect(duplicated).toEqual([]);
  });

  it('nút trong đề và nút trong phần ghép dùng hai hệ tên riêng', () => {
    expect(SOURCES.get(join(ROOT, 'src/components/quiz/QuizRunner.jsx'))).toContain('quiz-option');
    expect(SOURCES.get(join(ROOT, 'src/components/match/MatchRunner.jsx'))).toContain('match-card');
    expect(CSS).toMatch(/^\.quiz-option \{/m);
    expect(CSS).toMatch(/^\.match-card \{/m);
    expect(filesUsing('quiz-option')).toEqual(['src/components/quiz/QuizRunner.jsx']);
    expect(filesUsing('match-card')).toEqual(['src/components/match/MatchRunner.jsx']);
  });

  it('mọi lớp có kích thước cố định đều nằm trong một tệp thành phần, không phải trang', () => {
    const onPages = [...boxClasses()].filter((name) =>
      filesUsing(name).some((file) => file.startsWith('app/')),
    );
    expect(onPages).toEqual([]);
  });
});
