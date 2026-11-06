import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import QuizRunner from './QuizRunner';
import { QUESTIONS } from '../../content/questions';
import { GAME_KEY } from '../../lib/game';

function stored() {
  const raw = window.localStorage.getItem(GAME_KEY);
  return raw ? JSON.parse(raw) : null;
}

function optionButtons() {
  return Array.from(document.querySelectorAll('.quiz-option'));
}

describe('lượt quiz', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('chạy hết mười câu, ghi tiến độ và cộng điểm', async () => {
    render(<QuizRunner />);

    fireEvent.click(await screen.findByRole('button', { name: 'Bắt đầu làm' }));

    for (let i = 0; i < 10; i += 1) {
      const stemNode = document.querySelector('.quiz-stem');
      expect(stemNode, `câu ${i + 1}`).toBeTruthy();
      const question = QUESTIONS.find((item) => item.stem === stemNode.textContent);
      expect(question, `câu ${i + 1} khớp ngân hàng`).toBeTruthy();

      fireEvent.click(optionButtons()[question.answer]);

      await screen.findByText('Cách loại trừ');
      expect(document.querySelectorAll('.quiz-why')).toHaveLength(4);
      expect(document.querySelectorAll('.quiz-why.is-good')).toHaveLength(1);

      fireEvent.click(document.querySelector('.quiz-after-actions .btn'));
    }

    await screen.findByText(/câu đúng · 100%/);

    await waitFor(() => {
      const game = stored();
      expect(Object.keys(game.answered)).toHaveLength(10);
      expect(Object.values(game.answered).every((state) => state === 'correct')).toBe(true);
      expect(game.xp).toBe(10 * 10);
      expect(game.streak.count).toBe(1);
    });
  });

  it('chọn sai vẫn ghi nhận và hiện lời giải của phương án đã chọn', async () => {
    render(<QuizRunner />);
    fireEvent.click(await screen.findByRole('button', { name: 'Bắt đầu làm' }));

    const stemNode = document.querySelector('.quiz-stem');
    const question = QUESTIONS.find((item) => item.stem === stemNode.textContent);
    const wrongIndex = (question.answer + 1) % 4;
    fireEvent.click(optionButtons()[wrongIndex]);

    await screen.findByText('Cách loại trừ');
    const wrongButton = optionButtons()[wrongIndex];
    expect(wrongButton.className).toContain('is-wrong');

    await waitFor(() => {
      const game = stored();
      expect(game.answered[question.id]).toBe('wrong');
      expect(game.xp).toBe(2);
    });
  });

  it('chọn chương 3 thì mọi câu đều thuộc chương 3', async () => {
    render(<QuizRunner />);
    fireEvent.click(await screen.findByRole('button', { name: /Ch\.3/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Tất cả' }));
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu làm' }));

    const label = await screen.findByText(/Câu 1\/20/);
    expect(label.textContent).toContain('Ch.3');
  });
});
