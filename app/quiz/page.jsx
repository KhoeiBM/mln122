import QuizRunner from '../../src/components/quiz/QuizRunner';
import { TOTAL_QUESTIONS } from '../../src/lib/questions';

export const metadata = {
  title: 'Quiz theo chương | Sổ cái MLN122',
  description: `Luyện ${TOTAL_QUESTIONS} câu hỏi MLN122 theo sáu chương, mỗi câu có giải thích từng phương án và mẹo loại trừ.`,
};

export default function QuizPage() {
  return (
    <div className="quiz-page">
      <header className="page-head">
        <p className="eyebrow">Phần luyện</p>
        <h1 className="page-title">Trắc nghiệm theo chương</h1>
        <p className="page-lead">
          Mỗi câu có bốn phương án và bốn dòng giải thích: vì sao phương án đúng là đúng, vì sao ba
          phương án còn lại sai. Điểm kinh nghiệm chỉ để giữ nhịp, không quy đổi thành điểm môn học.
        </p>
      </header>
      <QuizRunner />
    </div>
  );
}
