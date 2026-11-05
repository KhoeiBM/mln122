// Mô hình tiến độ của CHỌN ĐƯỜNG.
// Nguyên tắc: không tính "bấm vào là học xong". Một kịch bản chỉ hoàn thành khi
// người học đã chọn phương án, xem đủ ba góc nhìn, đọc góc phân tích và viết phản biện.

export const STORAGE_KEY = 'chon-duong:progress:v1';

// Số ký tự tối thiểu của phần phản biện để tính là đã viết (khoảng 2–3 câu).
export const REFLECTION_MIN = 80;
// Ngưỡng để nhận huy hiệu "Người phản biện" (khoảng 4–6 câu).
export const REFLECTION_BADGE = 200;

export const STEPS = [
  { key: 'boi-canh', label: 'Bối cảnh', short: 'Bối cảnh' },
  { key: 'phuong-an', label: 'Chọn phương án', short: 'Phương án' },
  { key: 'goc-nhin', label: 'Ba góc nhìn', short: 'Góc nhìn' },
  { key: 'phan-tich', label: 'Góc phân tích', short: 'Phân tích' },
  { key: 'phan-bien', label: 'Phản biện', short: 'Phản biện' },
];

export const BADGES = [
  {
    id: 'doc-lich-su',
    label: 'Người đọc lịch sử',
    note: 'Đã đọc cả hai mốc lịch sử kinh tế.',
  },
  {
    id: 'ba-phia',
    label: 'Đã xem cả ba phía',
    note: 'Xem đủ ba góc nhìn trong một kịch bản.',
  },
  {
    id: 'nguoi-phan-bien',
    label: 'Người phản biện',
    note: `Viết từ ${REFLECTION_BADGE} ký tự phản biện trong một kịch bản.`,
  },
  {
    id: 'tu-duy-he-thong',
    label: 'Tư duy hệ thống',
    note: 'Hoàn thành cả hai kịch bản.',
  },
];

export function emptyProgress() {
  return { prologue: {}, scenarios: {} };
}

function blankState() {
  return { seen: {}, choice: null, perspectivesSeen: [], reflection: '' };
}

export function scenarioState(progress, id) {
  const raw = progress && progress.scenarios ? progress.scenarios[id] : null;
  if (!raw) return blankState();
  const seen = raw.seen && typeof raw.seen === 'object' ? { ...raw.seen } : {};
  return {
    seen,
    choice: typeof raw.choice === 'string' ? raw.choice : null,
    perspectivesSeen: Array.isArray(raw.perspectivesSeen)
      ? raw.perspectivesSeen.filter((item) => Number.isInteger(item))
      : [],
    reflection: typeof raw.reflection === 'string' ? raw.reflection : '',
  };
}

function withState(progress, id, state) {
  return {
    ...progress,
    scenarios: { ...(progress.scenarios || {}), [id]: state },
  };
}

export function markMilestone(progress, milestoneId) {
  return {
    ...progress,
    prologue: { ...(progress.prologue || {}), [milestoneId]: true },
  };
}

export function markStepSeen(progress, scenarioId, stepKey) {
  const state = scenarioState(progress, scenarioId);
  return withState(progress, scenarioId, {
    ...state,
    seen: { ...state.seen, [stepKey]: true },
  });
}

// Đổi phương án thì các góc nhìn đã xem không còn giá trị: chúng gắn với phương án cũ.
export function chooseOption(progress, scenarioId, optionId) {
  const state = scenarioState(progress, scenarioId);
  const isSameChoice = state.choice === optionId;
  return withState(progress, scenarioId, {
    ...state,
    choice: optionId,
    perspectivesSeen: isSameChoice ? state.perspectivesSeen : [],
  });
}

export function markPerspective(progress, scenarioId, index) {
  const state = scenarioState(progress, scenarioId);
  if (!state.choice) return progress;
  if (state.perspectivesSeen.includes(index)) return progress;
  return withState(progress, scenarioId, {
    ...state,
    perspectivesSeen: [...state.perspectivesSeen, index].sort((a, b) => a - b),
  });
}

export function saveReflection(progress, scenarioId, text) {
  const state = scenarioState(progress, scenarioId);
  return withState(progress, scenarioId, {
    ...state,
    reflection: typeof text === 'string' ? text : '',
  });
}

export function resetScenario(progress, scenarioId) {
  const scenarios = { ...(progress.scenarios || {}) };
  delete scenarios[scenarioId];
  return { ...progress, scenarios };
}

function optionOf(scenario, choice) {
  if (!scenario || !choice) return null;
  return scenario.options.find((option) => option.id === choice) || null;
}

export function reflectionEnough(text) {
  return (text || '').trim().length >= REFLECTION_MIN;
}

export function stepCompletion(progress, scenario) {
  const state = scenarioState(progress, scenario.id);
  const option = optionOf(scenario, state.choice);
  const perspectiveTotal = option ? option.perspectives.length : 3;
  return {
    'boi-canh': Boolean(state.seen['boi-canh']),
    'phuong-an': Boolean(state.choice),
    'goc-nhin': Boolean(option) && state.perspectivesSeen.length >= perspectiveTotal,
    'phan-tich': Boolean(state.seen['phan-tich']),
    'phan-bien': reflectionEnough(state.reflection),
  };
}

export function scenarioStatus(progress, scenario) {
  const done = stepCompletion(progress, scenario);
  const state = scenarioState(progress, scenario.id);
  const doneCount = STEPS.filter((step) => done[step.key]).length;
  if (doneCount === STEPS.length) {
    return { key: 'xong', label: 'Đã hoàn thành', doneCount, total: STEPS.length };
  }
  const touched =
    doneCount > 0 ||
    Object.keys(state.seen).length > 0 ||
    state.perspectivesSeen.length > 0 ||
    state.reflection.trim().length > 0;
  if (!touched) {
    return { key: 'chua-mo', label: 'Chưa mở', doneCount: 0, total: STEPS.length };
  }
  const next = STEPS.findIndex((step) => !done[step.key]) + 1;
  return {
    key: 'dang-lam',
    label: `Đang ở bước ${next}/${STEPS.length}`,
    doneCount,
    total: STEPS.length,
  };
}

export function completedCount(progress, scenarios) {
  return scenarios.filter((scenario) => scenarioStatus(progress, scenario).key === 'xong').length;
}

export function prologueSeenCount(progress) {
  return Object.values(progress.prologue || {}).filter(Boolean).length;
}

export function earnedBadges(progress, scenarios) {
  const hasThreeSides = scenarios.some(
    (scenario) => scenarioState(progress, scenario.id).perspectivesSeen.length >= 3,
  );
  const hasLongReflection = scenarios.some(
    (scenario) =>
      scenarioState(progress, scenario.id).reflection.trim().length >= REFLECTION_BADGE,
  );
  const earned = {
    'doc-lich-su': prologueSeenCount(progress) >= 2,
    'ba-phia': hasThreeSides,
    'nguoi-phan-bien': hasLongReflection,
    'tu-duy-he-thong': scenarios.length > 0 && completedCount(progress, scenarios) === scenarios.length,
  };
  return BADGES.map((badge) => ({ ...badge, earned: Boolean(earned[badge.id]) }));
}

// Dữ liệu cũ, dữ liệu hỏng hoặc phiên bản khác đều đưa về hình dạng an toàn.
export function migrate(raw) {
  if (!raw || typeof raw !== 'object') return emptyProgress();
  const progress = emptyProgress();
  if (raw.prologue && typeof raw.prologue === 'object') {
    progress.prologue = Object.fromEntries(
      Object.entries(raw.prologue).filter(([, value]) => value === true),
    );
  }
  if (raw.scenarios && typeof raw.scenarios === 'object') {
    for (const [id, value] of Object.entries(raw.scenarios)) {
      if (!value || typeof value !== 'object') continue;
      progress.scenarios[id] = {
        ...scenarioState({ scenarios: { [id]: value } }, id),
      };
    }
  }
  return progress;
}
