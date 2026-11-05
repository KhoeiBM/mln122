// Con dấu đỏ — khoảnh khắc chuyển động duy nhất của sản phẩm.
// Chỉ hiện khi một quyết định thật sự đã được ghi vào hồ sơ.
export default function Stamp({ label, detail }) {
  return (
    <span className="stamp" data-testid="stamp">
      <span className="stamp-label">{label}</span>
      {detail ? <span className="stamp-detail">{detail}</span> : null}
    </span>
  );
}
