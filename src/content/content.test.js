import { describe, expect, it } from 'vitest';
import { CHAPTERS, chapterLabel, chapterTitle } from './chapters';
import { MILESTONES } from './prologue';
import { AXES, SCENARIOS, nextScenario, scenarioById } from './scenarios';

const SIGNALS = ['len', 'xuong', 'hon-hop'];
const validChapter = (n) => CHAPTERS.some((chapter) => chapter.n === n);

describe('khung chương MLN122', () => {
  it('có đủ sáu chương, đánh số 1 đến 6 và tiêu đề không rỗng', () => {
    expect(CHAPTERS).toHaveLength(6);
    expect(CHAPTERS.map((chapter) => chapter.n)).toEqual([1, 2, 3, 4, 5, 6]);
    CHAPTERS.forEach((chapter) => expect(chapter.title.length).toBeGreaterThan(10));
  });

  it('trả nhãn và tiêu đề chương, chương không tồn tại trả chuỗi rỗng', () => {
    expect(chapterLabel(4)).toBe('Chương 4');
    expect(chapterTitle(4)).toContain('Cạnh tranh và độc quyền');
    expect(chapterTitle(99)).toBe('');
  });
});

describe('hai mốc lịch sử', () => {
  it('có hai mốc, mỗi mốc ba con số và hai phạm trù', () => {
    expect(MILESTONES).toHaveLength(2);
    MILESTONES.forEach((milestone) => {
      expect(milestone.year).toMatch(/^\d{4}$/);
      expect(milestone.figures).toHaveLength(3);
      expect(milestone.concepts).toHaveLength(2);
      expect(milestone.sources.length).toBeGreaterThanOrEqual(2);
      expect(milestone.question.length).toBeGreaterThan(30);
      expect(milestone.tension.sides.length).toBe(3);
    });
  });

  it('mọi phạm trù đều trỏ về một chương có thật', () => {
    MILESTONES.forEach((milestone) => {
      milestone.concepts.forEach((concept) => {
        expect(validChapter(concept.chapter)).toBe(true);
        expect(concept.name.length).toBeGreaterThan(3);
        expect(concept.link.length).toBeGreaterThan(40);
      });
    });
  });

  it('số liệu chưa chốt được đánh dấu rõ ràng', () => {
    const figures = MILESTONES.flatMap((milestone) => milestone.figures);
    const drafts = figures.filter((figure) => figure.canChot);
    expect(drafts.length).toBeGreaterThan(0);
    drafts.forEach((figure) => expect(figure.note.length).toBeGreaterThan(10));
  });
});

describe('hai kịch bản quyết định', () => {
  it('có hai kịch bản với mã và thời lượng riêng', () => {
    expect(SCENARIOS).toHaveLength(2);
    expect(new Set(SCENARIOS.map((scenario) => scenario.id)).size).toBe(2);
    expect(new Set(SCENARIOS.map((scenario) => scenario.code)).size).toBe(2);
    SCENARIOS.forEach((scenario) => expect(scenario.minutes).toBeGreaterThan(0));
  });

  it('mỗi kịch bản có bối cảnh, bốn dữ kiện và ba phương án A/B/C', () => {
    SCENARIOS.forEach((scenario) => {
      expect(scenario.dataPoints).toHaveLength(4);
      expect(scenario.options.map((option) => option.id)).toEqual(['A', 'B', 'C']);
      expect(scenario.role.name.length).toBeGreaterThan(10);
      expect(scenario.role.detail.length).toBeGreaterThan(30);
      expect(scenario.brief.length).toBeGreaterThan(80);
      expect(scenario.tension.body.length).toBeGreaterThan(60);
      expect(scenario.reflectionPrompt.length).toBeGreaterThan(40);
      expect(scenario.hints.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('mỗi phương án có hệ quả trên ba trục, dòng thời gian và người trả giá', () => {
    SCENARIOS.forEach((scenario) => {
      scenario.options.forEach((option) => {
        AXES.forEach((axis) => {
          const cell = option.ledger[axis.key];
          expect(cell, `${option.id} thiếu trục ${axis.key}`).toBeTruthy();
          expect(SIGNALS).toContain(cell.signal);
          expect(cell.text.length).toBeGreaterThan(30);
        });
        expect(option.timeline.length).toBeGreaterThanOrEqual(2);
        expect(option.costPaidBy.length).toBeGreaterThan(20);
        expect(option.summary.length).toBeGreaterThan(30);
      });
    });
  });

  it('mỗi phương án nhìn từ ba phía, mỗi phía có vai và lập trường riêng', () => {
    SCENARIOS.forEach((scenario) => {
      scenario.options.forEach((option) => {
        expect(option.perspectives).toHaveLength(3);
        const roles = option.perspectives.map((side) => side.role);
        expect(new Set(roles).size).toBe(3);
        option.perspectives.forEach((side) => {
          expect(side.view.length).toBeGreaterThan(40);
          expect(side.stake.length).toBeGreaterThan(4);
        });
      });
    });
  });

  it('mỗi phương án nêu phạm trù MLN122 có thật, kèm chương hợp lệ', () => {
    SCENARIOS.forEach((scenario) => {
      scenario.options.forEach((option) => {
        expect(option.theory.length).toBeGreaterThanOrEqual(2);
        option.theory.forEach((item) => {
          expect(validChapter(item.chapter)).toBe(true);
          expect(item.concept.length).toBeGreaterThan(6);
          expect(item.link.length).toBeGreaterThan(40);
        });
      });
      expect(scenario.counterQuestion.length).toBeGreaterThan(30);
    });
  });

  it('ba phương án không trùng tiêu đề và không phương án nào được đánh dấu đúng', () => {
    SCENARIOS.forEach((scenario) => {
      const titles = scenario.options.map((option) => option.title);
      expect(new Set(titles).size).toBe(3);
      scenario.options.forEach((option) => {
        expect(option.isCorrect).toBeUndefined();
      });
    });
  });

  it('tra cứu kịch bản và kịch bản kế tiếp', () => {
    expect(scenarioById('ai-va-viec-lam').id).toBe('ai-va-viec-lam');
    expect(scenarioById('khong-ton-tai')).toBeNull();
    expect(nextScenario('ai-va-viec-lam').id).toBe('nen-tang-tang-phi');
    expect(nextScenario('nen-tang-tang-phi')).toBeNull();
  });
});
