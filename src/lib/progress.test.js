import { describe, expect, it } from 'vitest';
import { SCENARIOS, scenarioById } from '../content/scenarios';
import {
  REFLECTION_BADGE,
  REFLECTION_MIN,
  chooseOption,
  completedCount,
  emptyProgress,
  earnedBadges,
  markMilestone,
  markPerspective,
  markStepSeen,
  migrate,
  prologueSeenCount,
  resetScenario,
  saveReflection,
  scenarioState,
  scenarioStatus,
  stepCompletion,
} from './progress';

const AI = scenarioById('ai-va-viec-lam');
const PLATFORM = scenarioById('nen-tang-tang-phi');

const reflection = (length) => 'a'.repeat(length);

function reachPerspectives(progress, scenario) {
  let next = chooseOption(progress, scenario.id, scenario.options[0].id);
  scenario.options[0].perspectives.forEach((_, index) => {
    next = markPerspective(next, scenario.id, index);
  });
  return next;
}

function finishScenario(progress, scenario, text = reflection(REFLECTION_MIN)) {
  let next = markStepSeen(progress, scenario.id, 'boi-canh');
  next = reachPerspectives(next, scenario);
  next = markStepSeen(next, scenario.id, 'phan-tich');
  next = saveReflection(next, scenario.id, text);
  return next;
}

describe('tiến độ kịch bản', () => {
  it('bắt đầu ở trạng thái chưa mở và không có bước nào hoàn thành', () => {
    const progress = emptyProgress();
    const status = scenarioStatus(progress, AI);
    expect(status.key).toBe('chua-mo');
    expect(status.doneCount).toBe(0);
    expect(stepCompletion(progress, AI)['phuong-an']).toBe(false);
  });

  it('chọn phương án mà chưa đọc bối cảnh vẫn tính là đang làm', () => {
    const progress = chooseOption(emptyProgress(), AI.id, 'B');
    expect(scenarioStatus(progress, AI).key).toBe('dang-lam');
    expect(stepCompletion(progress, AI)['phuong-an']).toBe(true);
    expect(stepCompletion(progress, AI)['boi-canh']).toBe(false);
  });

  it('chỉ tính góc nhìn khi đã chọn phương án và đủ cả ba phía', () => {
    let progress = markPerspective(emptyProgress(), AI.id, 0);
    expect(scenarioState(progress, AI.id).perspectivesSeen).toEqual([]);

    progress = chooseOption(progress, AI.id, 'A');
    progress = markPerspective(progress, AI.id, 0);
    progress = markPerspective(progress, AI.id, 1);
    expect(stepCompletion(progress, AI)['goc-nhin']).toBe(false);

    progress = markPerspective(progress, AI.id, 2);
    expect(stepCompletion(progress, AI)['goc-nhin']).toBe(true);
    expect(scenarioState(progress, AI.id).perspectivesSeen).toEqual([0, 1, 2]);
  });

  it('đổi phương án thì các góc nhìn đã xem bị đặt lại', () => {
    let progress = reachPerspectives(emptyProgress(), AI);
    expect(scenarioState(progress, AI.id).perspectivesSeen).toHaveLength(3);

    progress = chooseOption(progress, AI.id, 'C');
    expect(scenarioState(progress, AI.id).choice).toBe('C');
    expect(scenarioState(progress, AI.id).perspectivesSeen).toEqual([]);
  });

  it('hoàn thành cần đủ năm bước, phản biện ngắn hơn ngưỡng thì không tính', () => {
    const short = finishScenario(emptyProgress(), AI, reflection(REFLECTION_MIN - 10));
    expect(scenarioStatus(short, AI).key).toBe('dang-lam');
    expect(stepCompletion(short, AI)['phan-bien']).toBe(false);

    const full = finishScenario(emptyProgress(), AI);
    expect(scenarioStatus(full, AI).key).toBe('xong');
    expect(scenarioStatus(full, AI).label).toBe('Đã hoàn thành');
  });

  it('đếm số kịch bản hoàn thành trên cả hai kịch bản', () => {
    let progress = finishScenario(emptyProgress(), AI);
    expect(completedCount(progress, SCENARIOS)).toBe(1);
    progress = finishScenario(progress, PLATFORM);
    expect(completedCount(progress, SCENARIOS)).toBe(2);
  });

  it('xoá tiến độ một kịch bản không ảnh hưởng kịch bản còn lại', () => {
    let progress = finishScenario(emptyProgress(), AI);
    progress = markMilestone(progress, 'moc-1986');
    const cleared = resetScenario(progress, AI.id);
    expect(scenarioStatus(cleared, AI).key).toBe('chua-mo');
    expect(prologueSeenCount(cleared)).toBe(1);
  });
});

describe('mốc lịch sử và huy hiệu', () => {
  it('đếm số mốc đã đọc', () => {
    let progress = markMilestone(emptyProgress(), 'moc-1986');
    expect(prologueSeenCount(progress)).toBe(1);
    progress = markMilestone(progress, 'moc-2007');
    expect(prologueSeenCount(progress)).toBe(2);
  });

  it('mở khoá huy hiệu theo hành vi, không theo phương án đã chọn', () => {
    const blank = earnedBadges(emptyProgress(), SCENARIOS);
    expect(blank.every((badge) => badge.earned === false)).toBe(true);

    let progress = finishScenario(emptyProgress(), AI, reflection(REFLECTION_BADGE));
    progress = markMilestone(markMilestone(progress, 'moc-1986'), 'moc-2007');

    const badges = Object.fromEntries(
      earnedBadges(progress, SCENARIOS).map((badge) => [badge.id, badge.earned]),
    );
    expect(badges['doc-lich-su']).toBe(true);
    expect(badges['ba-phia']).toBe(true);
    expect(badges['nguoi-phan-bien']).toBe(true);
    expect(badges['tu-duy-he-thong']).toBe(false);

    const all = finishScenario(progress, PLATFORM);
    expect(earnedBadges(all, SCENARIOS).find((badge) => badge.id === 'tu-duy-he-thong').earned).toBe(
      true,
    );
  });
});

describe('đọc lại dữ liệu đã lưu', () => {
  it('dữ liệu rỗng hoặc hỏng trả về tiến độ trắng', () => {
    expect(migrate(null)).toEqual(emptyProgress());
    expect(migrate('hỏng')).toEqual(emptyProgress());
    expect(migrate({ scenarios: 'không phải object' })).toEqual(emptyProgress());
  });

  it('giữ lại lựa chọn, góc nhìn và phản biện hợp lệ', () => {
    const stored = {
      prologue: { 'moc-1986': true, 'moc-2007': false },
      scenarios: {
        [AI.id]: {
          seen: { 'boi-canh': true },
          choice: 'B',
          perspectivesSeen: [0, 1],
          reflection: 'một phản biện',
        },
      },
    };
    const progress = migrate(stored);
    expect(prologueSeenCount(progress)).toBe(1);
    const state = scenarioState(progress, AI.id);
    expect(state.choice).toBe('B');
    expect(state.perspectivesSeen).toEqual([0, 1]);
    expect(state.reflection).toBe('một phản biện');
  });
});
