import DossierApp from '../../src/components/dossier/DossierApp';

export const metadata = {
  title: 'Hồ sơ của tôi | Chọn đường',
  description:
    'Bản ghi những phương án bạn đã chọn, ba góc nhìn đã xem và phần phản biện đã viết. In được thành một trang A4.',
};

export default function DossierPage() {
  return <DossierApp />;
}
