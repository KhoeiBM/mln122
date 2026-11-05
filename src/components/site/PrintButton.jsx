'use client';

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-primary btn-sm no-print" onClick={() => window.print()}>
      In hoặc lưu PDF
    </button>
  );
}
