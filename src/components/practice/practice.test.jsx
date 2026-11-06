import { beforeEach, describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import Flashcards from './Flashcards';
import MatchGame from './MatchGame';
import QuizRound from './QuizRound';
import { CONCEPTS } from '../../content/concepts';
import { ITEMS } from '../../content/items';
import { GAME_KEY } from '../../lib/game';
import { buildMatchRound, buildQuiz } from '../../lib/quiz';

function storedGame() {
  const raw = window.localStorage.getItem(GAME_KEY);
  return raw ? JSON.parse(raw) : null;
}

describe('thẻ ghi nhớ', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('lật thẻ rồi tự đánh giá thì cộng điểm và ghi lịch ôn', async () => {
    render(<Flashcards />);

    const flip = await screen.findByRole('button', { name: 'Lật thẻ' });
    expect(screen.getByText('Mặt trước')).toBeTruthy();
    fireEvent.click(flip);

    expect(screen.getByText('Mặt sau')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Nhớ/ }));

    await waitFor(() => {
      const game = storedGame();
      expect(game.xp).toBe(5);
      expect(Object.keys(game.cards)).toHaveLength(1);
      expect(game.streak.count).toBe(1);
    });

    const [firstCard] = Object.values(storedGame().cards);
    expect(firstCard.interval).toBe(3);
    expect(firstCard.due).toBeTruthy();
  });

  it('đánh giá "Quên" thì thẻ quay lại ngay trong hôm nay', async () => {
    render(<Flashcards />);
    fireEvent.click(await screen.findByRole('button', { name: 'Lật thẻ' }));
    fireEvent.click(screen.getByRole('button', { name: /Quên/ }));

    await waitFor(() => expect(storedGame().cards).toBeTruthy());
    const [firstCard] = Object.values(storedGame().cards);
    expect(firstCard.interval).toBe(0);
    expect(firstCard.ease).toBeLessThan(2.3);
  });
});

describe('ghép cặp', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('khớp hết sáu cặp thì báo xong và cộng thưởng lượt', async () => {
    render(<MatchGame />);
    const data = buildMatchRound(CONCEPTS, ITEMS, 0);

    const [leftList, rightList] = screen.getAllByRole('list');
    const leftButtons = within(leftList).getAllByRole('button');
    const rightButtons = within(rightList).getAllByRole('button');
    expect(leftButtons).toHaveLength(6);
    expect(rightButtons).toHaveLength(6);

    data.pairs.forEach((pair, index) => {
      act(() => {
        fireEvent.click(leftButtons[index]);
      });
      act(() => {
        fireEvent.click(rightButtons[data.rightOrder.indexOf(pair.id)]);
      });
    });

    await screen.findByText(/Đã khớp hết 6 cặp/);
    await waitFor(() => {
      expect(storedGame().xp).toBe(data.pairs.length * 3 + 20);
    });
    expect(storedGame().best.match).toBe(100);
  });
});

describe('trắc nghiệm', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('chọn đúng thì hiện giải thích, cộng điểm và giữ đáp án đúng duy nhất', async () => {
    render(<QuizRound />);
    const questions = buildQuiz(ITEMS);
    const first = questions[0];

    expect(first.options.filter((option) => option.correct)).toHaveLength(1);
    const correctIndex = first.options.findIndex((option) => option.correct);

    const buttons = await screen.findAllByRole('button');
    const optionButtons = buttons.filter((button) => button.className.includes('quiz-option'));
    expect(optionButtons).toHaveLength(4);
    fireEvent.click(optionButtons[correctIndex]);

    await screen.findByRole('button', { name: 'Câu tiếp theo' });
    expect(document.querySelectorAll('.quiz-why')).toHaveLength(4);

    await waitFor(() => {
      const game = storedGame();
      expect(game.xp).toBe(10);
      expect(game.streak.count).toBe(1);
    });
  });
});
