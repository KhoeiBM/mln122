import { notFound } from 'next/navigation';
import ReceiptApp from '../../../src/components/receipt/ReceiptApp';
import { ITEMS, itemById, nextItem } from '../../../src/content/items';
import { formatVnd } from '../../../src/lib/split';

export function generateStaticParams() {
  return ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = itemById(id);
  if (!item) return { title: 'Không tìm thấy món | Bóc giá' };
  return {
    title: `${item.name} ${formatVnd(item.price)} — bóc giá | MLN122`,
    description: `Chia ${formatVnd(item.price)} thành bảy khoản, đối chiếu với khoảng tham chiếu, rồi xem ai nhận phần thặng dư trong ${item.name.toLowerCase()}.`,
  };
}

export default async function ItemPage({ params }) {
  const { id } = await params;
  const item = itemById(id);
  if (!item) notFound();

  return <ReceiptApp item={item} next={nextItem(item.id)} />;
}
