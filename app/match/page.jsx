import MatchRunner from '../../src/components/match/MatchRunner';

export const metadata = {
  title: 'Ghép thuật ngữ | Sổ cái MLN122',
  description:
    'Ghép sáu phạm trù MLN122 với câu đúc kết tương ứng trong mỗi lượt, lấy nội dung từ Knowledge Hub.',
};

export default function MatchPage() {
  return (
    <div className="match-page">
      <header className="page-head">
        <p className="eyebrow">Phần ghép</p>
        <h1 className="page-title">Ghép phạm trù với câu đúc kết</h1>
        <p className="page-lead">
          Sáu cặp mỗi lượt. Chọn sai không bị trừ điểm, chỉ đếm số lần để bạn biết mình đang lẫn giữa
          những phạm trù nào.
        </p>
      </header>
      <MatchRunner />
    </div>
  );
}
