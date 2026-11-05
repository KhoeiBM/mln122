import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ScenarioApp from './ScenarioApp';
import { nextScenario, scenarioById } from '../../content/scenarios';
import { STORAGE_KEY } from '../../lib/progress';

const AI = scenarioById('ai-va-viec-lam');

function renderScenario() {
  render(<ScenarioApp scenario={AI} next={nextScenario(AI.id)} />);
}

function openStep(label) {
  fireEvent.click(screen.getByRole('button', { name: new RegExp(label) }));
}

describe('luồng một kịch bản', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('bắt đầu ở bước bối cảnh, chưa có phương án nào được chọn', () => {
    renderScenario();
    expect(screen.getByRole('heading', { name: 'Bối cảnh' })).toBeTruthy();
    expect(screen.queryAllByText('Đã chọn')).toHaveLength(0);
    expect(screen.getByText('400 người')).toBeTruthy();
  });

  it('ghi phương án vào hồ sơ và lưu xuống localStorage', () => {
    renderScenario();
    openStep('Phương án');
    fireEvent.click(screen.getByRole('button', { name: 'Ghi phương án B vào hồ sơ' }));

    expect(screen.getAllByText('Đã chọn')).toHaveLength(1);
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(stored.scenarios[AI.id].choice).toBe('B');
  });

  it('mở ba góc nhìn của phương án đã chọn, đủ ba phía mới cho sang phân tích', () => {
    renderScenario();
    openStep('Phương án');
    fireEvent.click(screen.getByRole('button', { name: 'Ghi phương án A vào hồ sơ' }));
    openStep('Góc nhìn');

    const nextStep = screen.getByRole('button', { name: 'Đọc góc phân tích MLN122' });
    expect(nextStep.disabled).toBe(true);

    const reveals = screen.getAllByRole('button', { name: 'Xem góc nhìn này' });
    expect(reveals).toHaveLength(3);
    reveals.forEach((button) => fireEvent.click(button));

    expect(screen.queryAllByRole('button', { name: 'Xem góc nhìn này' })).toHaveLength(0);
    expect(screen.getByText(/Đã xem 3\/3 góc nhìn/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Đọc góc phân tích MLN122' }).disabled).toBe(false);
  });

  it('bấm sang bước góc nhìn khi chưa chọn phương án thì bị đưa về bước phương án', () => {
    renderScenario();
    openStep('Góc nhìn');
    expect(screen.getByRole('heading', { name: 'Ba phương án' })).toBeTruthy();
  });
});
