import './studio.css';
import StudioApp from '../../src/components/studio/StudioApp';
import { course } from '../../src/content/course';

export const metadata = {
  title: 'Phòng học — Sạp 122',
  description:
    'Bảng điều khiển sáu chương MLN122: lộ trình ba bước cho mỗi chương, thẻ ghi nhớ, trắc nghiệm có giải thích và bảng tính giá trị thặng dư.',
};

export default async function StudioPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.chuong;
  const initialSection = course.chapters.some((chapter) => chapter.id === requested)
    ? requested
    : 'tong-quan';

  return <StudioApp initialSection={initialSection} />;
}
