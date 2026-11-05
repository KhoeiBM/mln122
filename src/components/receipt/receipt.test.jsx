import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ReceiptApp from './ReceiptApp';
import ItemGrid from './ItemGrid';
import { itemById, nextItem } from '../../content/items';
import { STORAGE_KEY } from '../../lib/split';

const TEA = itemById('tra-sua');

function renderTea() {
  render(<ReceiptApp item={TEA} next={nextItem(TEA.id)} />);
}

function bump(label, times) {
  const button = screen.getByRole('button', { name: `Tăng 5 phần trăm cho ${label}` });
  for (let i = 0; i < times; i += 1) fireEvent.click(button);
}

function fillTo100() {
  bump('Nguyên liệu, hàng nhập', 6); // 30
  bump('Máy móc, dụng cụ', 1); // 5
  bump('Mặt bằng, điện nước', 3); // 15
  bump('Công người pha chế', 4); // 20
  bump('Biển hiệu, quảng cáo', 1); // 5
  bump('Lợi nhuận của chủ quán', 5); // 25
}

describe('tờ hoá đơn', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('hiện giá, bảy khoản và trạng thái ban đầu', () => {
    renderTea();
    expect(screen.getByRole('heading', { name: 'Ly trà sữa' })).toBeTruthy();
    expect(screen.getByText('45.000đ')).toBeTruthy();
    TEA.buckets.forEach((bucket) => expect(screen.getByText(bucket.label)).toBeTruthy());
    expect(screen.getByTestId('total-value').textContent).toBe('0%');
    expect(screen.getByRole('button', { name: /Còn 100% chưa chia/ })).toBeTruthy();
  });

  it('cộng phần trăm và chặn khi đã đủ 100%', () => {
    renderTea();
    bump('Nguyên liệu, hàng nhập', 2);
    expect(screen.getByTestId('total-value').textContent).toBe('10%');

    bump('Nguyên liệu, hàng nhập', 30);
    expect(screen.getByTestId('total-value').textContent).toBe('100%');
    expect(screen.getByText('đủ 100%')).toBeTruthy();
  });

  it('chưa đủ 100% thì nút mở phần thật bị khoá', () => {
    renderTea();
    const button = screen.getByRole('button', { name: /Còn 100% chưa chia/ });
    expect(button.disabled).toBe(true);
    expect(screen.queryByRole('heading', { name: 'Phần thật (tham chiếu)' })).toBeNull();
  });

  it('mở phần thật thì hiện bốn nhóm, m′ và ghi chú nguồn', () => {
    renderTea();
    fillTo100();
    fireEvent.click(screen.getByRole('button', { name: 'Mở phần thật để đối chiếu' }));

    expect(screen.getByRole('heading', { name: 'Phần thật (tham chiếu)' })).toBeTruthy();
    expect(screen.getByText(/m′ = m \/ v × 100%/)).toBeTruthy();
    expect(screen.getByText('150%')).toBeTruthy();
    expect(screen.getByText(/ước lượng minh hoạ/)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Ai lấy phần thặng dư' })).toBeTruthy();
  });

  it('lưu cách chia xuống localStorage', () => {
    renderTea();
    bump('Nguyên liệu, hàng nhập', 6);
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(stored.items[TEA.id].split['nguyen-lieu']).toBe(30);
  });

  it('phần kiến thức có trích dẫn, đúc kết và ứng dụng vào chính món này', () => {
    renderTea();
    expect(screen.getByRole('heading', { name: 'Kiến thức dùng ở đây' })).toBeTruthy();
    expect(screen.getByText(/Giá trị thặng dư là phần giá trị mới dư ra/)).toBeTruthy();
    expect(screen.getAllByText('Đúc kết').length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText(/Giáo trình Kinh tế chính trị Mác – Lênin/).length).toBeGreaterThanOrEqual(
      4,
    );
  });
});

describe('danh sách món', () => {
  it('liệt kê ba món và trạng thái chưa bóc', () => {
    window.localStorage.clear();
    render(<ItemGrid />);
    expect(screen.getByText('Ly trà sữa')).toBeTruthy();
    expect(screen.getByText('Áo thun có thương hiệu')).toBeTruthy();
    expect(screen.getByText('Suất ăn đặt qua ứng dụng')).toBeTruthy();
    expect(screen.getAllByText('Chưa bóc')).toHaveLength(3);
  });
});
