import ReviewRunner from '../../src/components/review/ReviewRunner';
import { HUB } from '../../src/content/hub';

export const metadata = {
  title: 'Ôn thẻ phạm trù | Sổ cái MLN122',
  description: `${HUB.length} thẻ ghi nhớ phạm trù MLN122, tự đánh giá bốn mức và giãn lịch ôn theo mức nhớ.`,
};

export default function ReviewPage() {
  return (
    <div className="review-page">
      <header className="page-head">
        <p className="eyebrow">Phần ôn</p>
        <h1 className="page-title">Thẻ phạm trù</h1>
        <p className="page-lead">
          Mặt trước là tên phạm trù, mặt sau là trích dẫn, phần nói lại, đúc kết và ví dụ. Sau khi lật,
          bạn tự xếp mình vào bốn mức — lịch ôn sẽ giãn ra hay khép lại theo mức đó.
        </p>
      </header>
      <ReviewRunner />
    </div>
  );
}
