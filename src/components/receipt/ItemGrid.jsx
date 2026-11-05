'use client';

import Link from 'next/link';
import { ITEMS } from '../../content/items';
import { completedCount, formatVnd, itemStatus } from '../../lib/split';
import { useSplit } from '../../lib/useSplit';

export default function ItemGrid() {
  const { progress, ready } = useSplit();
  const done = completedCount(progress, ITEMS);

  return (
    <div className="item-grid-wrap">
      <div className="item-grid">
        {ITEMS.map((item) => {
          const status = itemStatus(progress, item);
          return (
            <article className="item-card" key={item.id}>
              <div className="item-card-top">
                <span className="item-code">{item.code}</span>
                <span className={`status status-${status.key}`}>{status.label}</span>
              </div>
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">{formatVnd(item.price)}</p>
              <p className="item-kicker">{item.kicker}</p>
              <Link className="btn btn-sm item-cta" href={`/boc/${item.id}`}>
                {status.key === 'chua-mo' ? 'Bóc món này' : status.key === 'xong' ? 'Xem cách chia' : 'Làm tiếp'}
              </Link>
            </article>
          );
        })}
      </div>
      <p className="item-progress">
        {ready ? `Đã bóc xong ${done}/${ITEMS.length} món.` : 'Đang đọc tiến độ…'}
      </p>
    </div>
  );
}
