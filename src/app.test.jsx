// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { quiz } from './data';

class Observer { observe() {} disconnect() {} }
beforeEach(() => { localStorage.clear(); globalThis.IntersectionObserver = Observer; });
afterEach(cleanup);

describe('Hành trình học', () => {
  it('lưu và khôi phục tiến độ các phần đã học', () => {
    const first = render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /đánh dấu đã học/i })[0]);
    expect(screen.getByText('1/5 phần đã hoàn thành')).toBeTruthy();
    first.unmount();
    render(<App />);
    expect(screen.getByText('1/5 phần đã hoàn thành')).toBeTruthy();
  });
  it('đổi mảnh ghép, xem tình huống và lật flashcard', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /02 Sở hữu & thành phần kinh tế/i }));
    expect(screen.getByText(/Nhiều hình thức sở hữu và thành phần kinh tế/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Đối thoại, chia sẻ thông tin/i }));
    expect(screen.getByText('Một hướng đi cân bằng!')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Kinh tế thị trường định hướng xã hội chủ nghĩa là gì/i }));
    expect(screen.getByText(/Nền kinh tế vận hành theo quy luật thị trường/)).toBeTruthy();
  });
  it('chấm đủ 10 câu và lưu điểm tốt nhất', () => {
    render(<App />);
    const panel = screen.getByText('Trắc nghiệm nhanh').closest('.quiz-panel');
    for (const question of quiz) {
      fireEvent.click(within(panel).getByRole('button', { name: new RegExp(question.options[question.answer].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }));
      expect(within(panel).getByText(/Chính xác!/)).toBeTruthy();
      fireEvent.click(within(panel).getByRole('button', { name: /Câu tiếp|Xem kết quả/ }));
    }
    expect(within(panel).getByText(/Kết quả tốt nhất trên thiết bị: 10\/10/)).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('thi-truong-loi-ich-progress-v1')).best).toBe(10);
    fireEvent.click(within(panel).getByRole('button', {name:/Làm lại/}));
    expect(within(panel).getByText(quiz[0].q)).toBeTruthy();
  });
});
