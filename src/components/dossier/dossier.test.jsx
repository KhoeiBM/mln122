import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DossierBody from './DossierBody';
import { SCENARIOS, scenarioById } from '../../content/scenarios';
import {
  REFLECTION_MIN,
  chooseOption,
  emptyProgress,
  markMilestone,
  markPerspective,
  markStepSeen,
  saveReflection,
} from '../../lib/progress';

const AI = scenarioById('ai-va-viec-lam');

function finishedAi() {
  let progress = markMilestone(markMilestone(emptyProgress(), 'moc-1986'), 'moc-2007');
  progress = markStepSeen(progress, AI.id, 'boi-canh');
  progress = chooseOption(progress, AI.id, 'B');
  AI.options[1].perspectives.forEach((_, index) => {
    progress = markPerspective(progress, AI.id, index);
  });
  progress = markStepSeen(progress, AI.id, 'phan-tich');
  progress = saveReflection(progress, AI.id, 'a'.repeat(REFLECTION_MIN));
  return progress;
}

describe('hồ sơ học tập', () => {
  it('hồ sơ trống nói rõ chưa có lựa chọn và chưa có phản biện', () => {
    render(<DossierBody progress={emptyProgress()} scenarios={SCENARIOS} />);
    expect(screen.getByRole('heading', { name: 'Hồ sơ của tôi' })).toBeTruthy();
    expect(screen.getAllByText('Chưa ghi phương án nào.')).toHaveLength(2);
    expect(screen.getAllByText('Chưa viết phản biện.')).toHaveLength(2);
  });

  it('hồ sơ ghi lại phương án, ba trục, phản biện và huy hiệu đã nhận', () => {
    render(<DossierBody progress={finishedAi()} scenarios={SCENARIOS} />);

    expect(screen.getByText(/Phương án đã ghi:/)).toBeTruthy();
    expect(screen.getByText(/Đầu tư công nghệ, đào tạo lại 400 người/)).toBeTruthy();
    expect(screen.getByText('Kinh tế')).toBeTruthy();
    expect(screen.getByText('An sinh')).toBeTruthy();
    expect(screen.getByText('Bền vững')).toBeTruthy();
    expect(screen.getByText('Người đọc lịch sử')).toBeTruthy();

    const earned = screen.getAllByText('Đã nhận');
    expect(earned.length).toBeGreaterThanOrEqual(2);
  });

  it('phần giới hạn nêu rõ số liệu nháp và việc không chấm điểm', () => {
    render(<DossierBody progress={emptyProgress()} scenarios={SCENARIOS} />);
    expect(screen.getByRole('heading', { name: 'Nguồn và giới hạn' })).toBeTruthy();
    expect(screen.getByText(/Số liệu ở hai mốc lịch sử là bản nháp/)).toBeTruthy();
    expect(screen.getByText(/Sản phẩm không chấm điểm lựa chọn/)).toBeTruthy();
  });

  it('in đúng ngày khi được truyền vào', () => {
    render(
      <DossierBody progress={emptyProgress()} scenarios={SCENARIOS} dateLabel="06/11/2026" />,
    );
    expect(screen.getByText('06/11/2026')).toBeTruthy();
  });
});
