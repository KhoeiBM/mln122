import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Ledger from './Ledger';
import ScenarioList from './ScenarioList';
import { scenarioById } from '../../content/scenarios';

const option = scenarioById('nen-tang-tang-phi').options[0];

describe('bảng hệ quả', () => {
  it('hiện đủ ba trục, dòng thời gian và người trả chi phí', () => {
    render(<Ledger option={option} />);
    expect(screen.getByText('Kinh tế')).toBeTruthy();
    expect(screen.getByText('An sinh')).toBeTruthy();
    expect(screen.getByText('Bền vững')).toBeTruthy();
    expect(screen.getByText(option.ledger.kinhTe.text)).toBeTruthy();
    expect(screen.getByText(option.timeline[0].when)).toBeTruthy();
    expect(screen.getByText('Ai trả chi phí')).toBeTruthy();
    expect(screen.getByText(option.costPaidBy)).toBeTruthy();
  });

  it('không hiển thị điểm số hay tổng kết đúng sai', () => {
    const { container } = render(<Ledger option={option} />);
    expect(container.textContent).not.toMatch(/\bđiểm\b/i);
    expect(container.textContent).not.toMatch(/đúng|sai/i);
  });
});

describe('danh sách kịch bản', () => {
  it('liệt kê cả hai kịch bản và trạng thái ban đầu', () => {
    window.localStorage.clear();
    render(<ScenarioList />);
    expect(screen.getByText('AI thay đổi dây chuyền')).toBeTruthy();
    expect(screen.getByText('Nền tảng tăng phí hoa hồng')).toBeTruthy();
    expect(screen.getAllByText('Chưa mở')).toHaveLength(2);
  });
});
