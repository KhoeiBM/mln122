import './studio.css';
import StudioApp from '../../src/components/studio/StudioApp';

export const metadata = {
  title: 'Phòng học — Sạp 122',
  description:
    'Bảng điều khiển sáu chương MLN122: bảng khái niệm, thẻ ghi nhớ, trắc nghiệm có giải thích và bảng tính giá trị thặng dư.',
};

export default function StudioPage() {
  return <StudioApp />;
}
