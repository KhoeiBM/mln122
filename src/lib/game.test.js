import { beforeEach, describe, expect, it } from 'vitest';
import {
  XP,
  addXp,
  dayKey,
  daysBetween,
  dueConceptIds,
  emptyGame,
  levelFor,
  levelProgress,
  migrateGame,
  recordMatch,
  recordQuiz,
  reviewCard,
  shiftDay,
  touchDay,
} from './game';

const CONCEPTS = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

describe('chuỗi ngày học', () => {
  it('ngày đầu tính 1, hôm sau nối tiếp, bỏ một ngày thì bắt đầu lại', () => {
    let game = emptyGame();
    game = touchDay(game, '2026-03-01');
    expect(game.streak).toEqual({ count: 1, last: '2026-03-01' });

    game = touchDay(game, '2026-03-01');
    expect(game.streak.count).toBe(1);

    game = touchDay(game, '2026-03-02');
    expect(game.streak.count).toBe(2);

    game = touchDay(game, '2026-03-04');
    expect(game.streak.count).toBe(1);
  });

  it('cộng điểm giữ nguyên ngày cuối và không xuống dưới 0', () => {
    let game = addXp(emptyGame(), XP.flashcard, '2026-03-01');
    expect(game.xp).toBe(5);
    expect(game.streak.last).toBe('2026-03-01');
    game = addXp(game, -50, '2026-03-02');
    expect(game.xp).toBe(0);
  });

  it('tính khoảng cách ngày và cộng ngày qua ranh giới tháng', () => {
    expect(daysBetween('2026-02-27', '2026-03-02')).toBe(3);
    expect(shiftDay('2026-02-27', 2)).toBe('2026-03-01');
    expect(shiftDay('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('dayKey trả về ngày dạng YYYY-MM-DD', () => {
    expect(dayKey(new Date(2026, 2, 5))).toBe('2026-03-05');
  });
});

describe('lịch ôn thẻ', () => {
  it('thẻ mới được coi là đến hạn', () => {
    expect(dueConceptIds(emptyGame(), CONCEPTS, '2026-03-01')).toEqual(['a', 'b', 'c']);
  });

  it('mức "Quên" đưa thẻ về hôm nay và giảm độ dễ', () => {
    const game = reviewCard(emptyGame(), 'a', 1, '2026-03-01');
    const card = game.cards.a;
    expect(card.interval).toBe(0);
    expect(card.due).toBe('2026-03-01');
    expect(card.ease).toBeLessThan(2.3);
    expect(card.reps).toBe(1);
    expect(dueConceptIds(game, CONCEPTS, '2026-03-01')).toContain('a');
  });

  it('mức "Chắc" giãn lịch và đẩy thẻ ra khỏi danh sách đến hạn', () => {
    const game = reviewCard(emptyGame(), 'a', 4, '2026-03-01');
    expect(game.cards.a.interval).toBe(7);
    expect(dueConceptIds(game, CONCEPTS, '2026-03-01')).toEqual(['b', 'c']);
    expect(dueConceptIds(game, CONCEPTS, '2026-03-08')).toContain('a');
  });

  it('ôn lại lần hai nhân khoảng nghỉ theo độ dễ', () => {
    let game = reviewCard(emptyGame(), 'a', 3, '2026-03-01');
    expect(game.cards.a.interval).toBe(3);
    const ease = game.cards.a.ease;
    game = reviewCard(game, 'a', 3, '2026-03-04');
    expect(game.cards.a.interval).toBe(Math.round(3 * ease));
  });

  it('điểm kinh nghiệm lên cấp mỗi 100 điểm', () => {
    expect(levelFor(0)).toBe(1);
    expect(levelFor(99)).toBe(1);
    expect(levelFor(100)).toBe(2);
    expect(levelProgress(145)).toBe(45);
  });
});

describe('đọc dữ liệu cũ', () => {
  it('dữ liệu rác trả về trạng thái rỗng', () => {
    expect(migrateGame(null)).toEqual(emptyGame());
    expect(migrateGame('hỏng')).toEqual(emptyGame());
    expect(migrateGame({ xp: -20, cards: { a: { due: 5 } } })).toEqual(emptyGame());
  });

  it('giữ dữ liệu hợp lệ và kẹp giá trị ngoài biên', () => {
    const game = migrateGame({
      xp: 130,
      streak: { count: 4, last: '2026-03-02' },
      cards: { a: { ease: 2.5, interval: 6, reps: 2, due: '2026-03-08' }, b: {} },
      best: { quiz: 250, match: 60 },
      rounds: 3,
    });
    expect(game.xp).toBe(130);
    expect(game.cards.a.interval).toBe(6);
    expect(game.cards.b).toBeUndefined();
    expect(game.best).toEqual({ quiz: 100, match: 60 });
    expect(game.rounds).toBe(3);
  });
});

describe('điểm cao nhất', () => {
  it('chỉ ghi nhận kỷ lục mới', () => {
    let game = recordQuiz(emptyGame(), 3, 4, '2026-03-01');
    expect(game.best.quiz).toBe(75);
    game = recordQuiz(game, 1, 4, '2026-03-02');
    expect(game.best.quiz).toBe(75);
    expect(game.rounds).toBe(2);
  });

  it('ghép cặp trừ 10 điểm mỗi lần chọn sai, không âm', () => {
    expect(recordMatch(emptyGame(), 0).best.match).toBe(100);
    expect(recordMatch(emptyGame(), 3).best.match).toBe(70);
    expect(recordMatch(emptyGame(), 20).best.match).toBe(0);
  });
});
