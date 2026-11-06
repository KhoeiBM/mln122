import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReviewRunner from './ReviewRunner';
import { HUB } from '../../content/hub';
import { GAME_KEY } from '../../lib/game';

function stored() {
  const raw = window.localStorage.getItem(GAME_KEY);
  return raw ? JSON.parse(raw) : null;
}

describe('thẻ phạm trù', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('lật thẻ rồi tự đánh giá thì cộng điểm và ghi lịch ôn', async () => {
    render(<ReviewRunner />);

    const flip = await screen.findByRole('button', { name: 'Lật thẻ' });
    expect(screen.getByText(HUB[0].term)).toBeTruthy();
    fireEvent.click(flip);

    expect(screen.getByText(HUB[0].quote)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Nhớ/ }));

    await waitFor(() => {
      const game = stored();
      expect(game.xp).toBe(5);
      expect(Object.keys(game.cards)).toHaveLength(1);
      expect(game.cards[HUB[0].id].interval).toBe(3);
    });
  });

  it('đánh giá "Quên" đưa thẻ về hôm nay', async () => {
    render(<ReviewRunner />);
    fireEvent.click(await screen.findByRole('button', { name: 'Lật thẻ' }));
    fireEvent.click(screen.getByRole('button', { name: /Quên/ }));

    await waitFor(() => expect(stored().cards).toBeTruthy());
    const card = stored().cards[HUB[0].id];
    expect(card.interval).toBe(0);
    expect(card.due).toBeTruthy();
  });
});
