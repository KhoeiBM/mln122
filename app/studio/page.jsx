import '@cloudscape-design/global-styles/index.css';
import './studio.css';
import StudioApp from '../../src/components/studio/StudioApp';

export const metadata = {
  title: 'Phòng học — Sạp 122',
  description:
    'Bảng điều khiển sáu chương MLN122: bảng khái niệm, flashcard, trắc nghiệm có giải thích và máy tính giá trị thặng dư.',
};

export default function StudioPage() {
  return <StudioApp />;
}
