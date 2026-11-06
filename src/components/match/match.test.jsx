import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MatchRunner from './MatchRunner';
import { HUB } from '../../content/hub';
import { GAME_KEY } from '../../lib/game';

function stored() {
  const raw = window.localStorage.getItem(GAME_KEY);
  return raw ? JSON.parse(raw) : null;
}

describe('ghép cặp', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('khớp hết sáu cặp thì báo xong và cộng thưởng lượt', async () => {
    render(<MatchRunner />);

    const [leftColumn, rightColumn] = screen.getAllByRole('list');
    const leftButtons = Array.from(leftColumn.querySelectorAll('button'));
    const rightButtons = Array.from(rightColumn.querySelectorAll('button'));
    expect(leftButtons).toHaveLength(6);
    expect(rightButtons).toHaveLength(6);

    const startId = HUB[0].id;
    const roundEntries = [];
    const startIndex = HUB.findIndex((entry) => entry.id === startId);
    for (let i = 0; i < 6; i += 1) roundEntries.push(HUB[(startIndex + i) % HUB.length]);

    roundEntries.forEach((entry, index) => {
      fireEvent.click(leftButtons[index]);
      const target = rightButtons.find((button) =>
        button.textContent.includes(entry.conclusion.slice(0, 25)),
      );
      expect(target, entry.term).toBeTruthy();
      fireEvent.click(target);
    });

    await screen.findByText(/Đã khớp hết 6 cặp/);
    await waitFor(() => {
      const game = stored();
      expect(game.xp).toBe(6 * 3 + 20);
      expect(game.best.match).toBe(100);
    });
  });
});
