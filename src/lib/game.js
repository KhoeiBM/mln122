// Điểm kinh nghiệm, chuỗi ngày học, lịch ôn thẻ và số câu đã làm.
// Toàn bộ là hàm thuần; ngày tháng được truyền vào để kiểm thử được.

export const GAME_KEY = 'so-cai:v1';

export const XP = {
  answer: 10,
  wrongAnswer: 2,
  flashcard: 5,
  matchPair: 3,
  round: 20,
};

export const RATINGS = [
  { level: 1, label: 'Quên', hint: 'ôn lại ngay' },
  { level: 2, label: 'Mơ hồ', hint: 'ôn lại ngày mai' },
  { level: 3, label: 'Nhớ', hint: 'ôn lại sau vài ngày' },
  { level: 4, label: 'Chắc', hint: 'giãn lịch ra' },
];

// Khoảng nghỉ cơ bản (ngày) cho lần ôn đầu tiên theo mức tự đánh giá.
const BASE_INTERVAL = { 1: 0, 2: 1, 3: 3, 4: 7 };

export function emptyGame() {
  return {
    xp: 0,
    streak: { count: 0, last: null },
    cards: {},
    answered: {},
    best: { quiz: 0, match: 0 },
    rounds: 0,
  };
}

export function dayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function shiftDay(key, days) {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return dayKey(date);
}

export function daysBetween(from, to) {
  const [y1, m1, d1] = from.split('-').map(Number);
  const [y2, m2, d2] = to.split('-').map(Number);
  const a = Date.UTC(y1, m1 - 1, d1);
  const b = Date.UTC(y2, m2 - 1, d2);
  return Math.round((b - a) / 86400000);
}

// Học hôm nay thì chuỗi tăng 1 nếu hôm qua cũng học, còn lại bắt đầu lại từ 1.
export function touchDay(game, today) {
  const last = game.streak.last;
  if (last === today) return game;
  const continues = last && daysBetween(last, today) === 1;
  return {
    ...game,
    streak: { count: continues ? game.streak.count + 1 : 1, last: today },
  };
}

export function addXp(game, amount, today) {
  const touched = touchDay(game, today);
  return { ...touched, xp: Math.max(0, touched.xp + amount) };
}

// Ghi nhận một câu đã làm. Đúng thì cộng điểm đầy đủ, sai cộng ít; đã đúng rồi thì
// giữ nguyên trạng thái đúng và không cộng thêm điểm cho lần đúng lại.
export function recordAnswer(game, questionId, correct, today) {
  const previous = game.answered[questionId];
  const answered = {
    ...game.answered,
    [questionId]: previous === 'correct' || correct ? 'correct' : 'wrong',
  };
  const gained = correct && previous !== 'correct' ? XP.answer : correct ? 0 : XP.wrongAnswer;
  return { ...addXp(game, gained, today), answered };
}

export function learnedCount(game) {
  return Object.keys(game.answered || {}).length;
}

export function levelFor(xp) {
  return Math.floor(xp / 100) + 1;
}

export function levelProgress(xp) {
  return xp % 100;
}

// SM-2 rút gọn: mức càng chắc thì khoảng nghỉ càng giãn, hệ số ease tăng dần.
export function reviewCard(game, conceptId, level, today) {
  const previous = game.cards[conceptId] || { ease: 2.3, interval: 0, reps: 0, due: null };
  let ease = previous.ease;
  let interval;

  if (level === 1) {
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else if (level === 2) {
    interval = previous.interval ? Math.max(1, Math.round(previous.interval * 0.6)) : 1;
    ease = Math.max(1.3, ease - 0.05);
  } else {
    interval = previous.interval ? Math.round(previous.interval * ease) : BASE_INTERVAL[level];
    ease = Math.min(2.8, ease + (level === 4 ? 0.12 : 0.05));
  }

  return {
    ...game,
    cards: {
      ...game.cards,
      [conceptId]: {
        ease,
        interval,
        reps: previous.reps + 1,
        due: shiftDay(today, interval),
      },
    },
  };
}

export function cardState(game, conceptId) {
  return game.cards[conceptId] || null;
}

// Thẻ đến hạn: chưa từng học, hoặc tới ngày ôn.
export function dueConceptIds(game, concepts, today) {
  return concepts
    .filter((concept) => {
      const card = game.cards[concept.id];
      return !card || !card.due || daysBetween(card.due, today) >= 0;
    })
    .map((concept) => concept.id);
}

export function dueCount(game, concepts, today) {
  return dueConceptIds(game, concepts, today).length;
}

export function recordQuiz(game, score, total, today) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  return {
    ...game,
    best: { ...game.best, quiz: Math.max(game.best.quiz, percent) },
    rounds: game.rounds + 1,
  };
}

export function recordMatch(game, mistakes) {
  const result = Math.max(0, 100 - mistakes * 10);
  return {
    ...game,
    best: { ...game.best, match: Math.max(game.best.match, result) },
    rounds: game.rounds + 1,
  };
}

export function migrateGame(raw) {
  const game = emptyGame();
  if (!raw || typeof raw !== 'object') return game;
  if (Number.isFinite(raw.xp)) game.xp = Math.max(0, Math.round(raw.xp));
  if (raw.streak && typeof raw.streak === 'object') {
    game.streak = {
      count: Number.isFinite(raw.streak.count) ? Math.max(0, Math.round(raw.streak.count)) : 0,
      last: typeof raw.streak.last === 'string' ? raw.streak.last : null,
    };
  }
  if (raw.cards && typeof raw.cards === 'object') {
    for (const [id, card] of Object.entries(raw.cards)) {
      if (!card || typeof card !== 'object') continue;
      if (typeof card.due !== 'string') continue;
      game.cards[id] = {
        ease: Number.isFinite(card.ease) ? card.ease : 2.3,
        interval: Number.isFinite(card.interval) ? Math.max(0, Math.round(card.interval)) : 0,
        reps: Number.isFinite(card.reps) ? Math.max(0, Math.round(card.reps)) : 0,
        due: card.due,
      };
    }
  }
  if (raw.answered && typeof raw.answered === 'object') {
    for (const [id, state] of Object.entries(raw.answered)) {
      if (state === 'correct' || state === 'wrong') game.answered[id] = state;
    }
  }
  if (raw.best && typeof raw.best === 'object') {
    game.best = {
      quiz: Number.isFinite(raw.best.quiz) ? Math.max(0, Math.min(100, Math.round(raw.best.quiz))) : 0,
      match: Number.isFinite(raw.best.match) ? Math.max(0, Math.min(100, Math.round(raw.best.match))) : 0,
    };
  }
  if (Number.isFinite(raw.rounds)) game.rounds = Math.max(0, Math.round(raw.rounds));
  return game;
}
