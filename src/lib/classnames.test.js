// Canh gác lỗi đã từng xảy ra trên bản deploy: một tên lớp CSS dùng chung cho hai
// thành phần khác nhau. Lớp .step từng đặt width/height 40px cho nút tăng/giảm, và
// vô tình bóp ba thẻ giai đoạn ở trang chủ thành ô 40px, chữ chồng lên nhau.
// Kiểm thử jsdom không thấy được lỗi bố cục, nên lớp bảo vệ phải nằm ở tên lớp.

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
// Bỏ chú thích trước để prelude của khối không dính chữ chú thích.
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

// Lớp đặt kích thước cố định theo px ở cả hai chiều: đó chính là kiểu lớp dễ gây
// hỏng bố cục khi bị dùng lại ở một thành phần khác.
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

const page = SOURCES.get(join(ROOT, 'app/page.jsx'));
const bucketRow = SOURCES.get(join(ROOT, 'src/components/receipt/BucketRow.jsx'));

describe('tên lớp CSS', () => {
  it('lớp có kích thước cố định chỉ được dùng trong một tệp', () => {
    const shared = [...boxClasses()].filter((name) => filesUsing(name).length > 1);
    expect(shared).toEqual([]);
  });

  it('thẻ giai đoạn ở trang chủ dùng hệ tên riêng, không phải tên nút', () => {
    expect(page).toContain('className="stages"');
    expect(page).toContain('stage-num');
    expect(page).not.toMatch(/className="step\b/);
    expect(page).not.toMatch(/\.step\b/);
    expect(CSS).not.toMatch(/^\.step[\s,{:]/m);
  });

  it('nút tăng/giảm dùng lớp bump, chỉ một tệp định nghĩa và dùng nó', () => {
    expect(bucketRow).toContain('className="bump"');
    expect(CSS).toMatch(/^\.bump \{/m);
    expect(filesUsing('bump')).toEqual(['src/components/receipt/BucketRow.jsx']);
  });

  it('ba giai đoạn xếp dọc trên màn hẹp', () => {
    const narrow = cssBlocks().filter(
      (block) => !block.topLevel && block.selector === '.stages',
    );
    expect(narrow.some((block) => /grid-template-columns:\s*1fr/.test(block.body))).toBe(true);
  });

  it('mỗi lớp giai đoạn có đúng một khối CSS', () => {
    for (const name of ['stages', 'stage-num', 'stage-name', 'stage-body']) {
      const blocks = cssBlocks().filter(
        (block) =>
          block.topLevel && block.selector.split(',').some((part) => part.trim() === `.${name}`),
      );
      expect(blocks, name).toHaveLength(1);
    }
  });
});
