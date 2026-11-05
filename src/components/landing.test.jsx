import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import LandingPage from './site/LandingPage';

describe('Landing page', () => {
  it('hiển thị tiêu đề, hoá đơn minh hoạ và liên kết vào phòng học', () => {
    const { container } = render(<LandingPage />);
    const text = container.textContent;

    expect(text).toContain('Giá trị thặng dư');
    expect(text).toContain('m′ = m / v');
    expect(container.querySelectorAll('a[href="/studio"]').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.chapter-row')).toHaveLength(6);
    expect(text).toContain('Sáu chương');
  });
});
