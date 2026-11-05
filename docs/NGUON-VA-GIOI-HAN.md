# Nguồn và giới hạn

Tài liệu này ghi rõ mỗi con số đến từ đâu và điều gì **chưa** được kiểm chứng. Trước khi trình bày
chính thức, nhóm phải đọc hết và cập nhật cột trạng thái.

## 1. Hai mốc lịch sử

| Mốc | Nội dung hiển thị | Nguồn dự kiến | Trạng thái |
| --- | --- | --- | --- |
| 1986 | "Ba chữ số" — lạm phát mỗi năm giữa thập niên 80 | Niên giám thống kê 1986–1990 | **Chưa chốt** — cần lấy số in chính xác từng năm, không dùng số lan truyền trên mạng |
| 1986 | Tem phiếu là phương thức phân phối chủ yếu hàng thiết yếu trước Đổi mới | Văn kiện Đại hội VI; giáo trình MLN122 ch.5 | Đã đối chiếu, cần trích dẫn số trang |
| 1986 | Đại hội VI khởi xướng đường lối đổi mới | Văn kiện Đại hội đại biểu toàn quốc lần thứ VI (1986) | Đã chốt |
| 2007 | 11/01/2007 Việt Nam là thành viên WTO; nộp đơn năm 1995 | Thông tin thành viên WTO | Đã chốt (kiểm lại ngày khi in tài liệu) |
| 2007 | "≈ 48 tỷ USD" kim ngạch xuất khẩu 2007 | Niên giám thống kê 2008 | **Số nháp** — làm tròn, cần số chính xác |
| 2007 | "≈ 20 tỷ USD" vốn FDI đăng ký 2007 | Niên giám thống kê 2008 | **Số nháp** — làm tròn, cần số chính xác |

Trên giao diện, mọi con số chưa chốt đều có chữ "Số nháp —" ngay dưới giá trị. Không được bỏ nhãn
này cho tới khi thay bằng số đã đối chiếu.

## 2. Hai kịch bản

Cả hai kịch bản là **tình huống hư cấu**, dựng từ những quan hệ kinh tế phổ biến:

- Nhà máy may 1.200 công nhân, các mức 60%, 400 người, 80 kỹ thuật viên, 9 triệu đồng/người, biên
  lợi nhuận 4%: **số minh hoạ do nhóm đặt**, không lấy từ một doanh nghiệp cụ thể.
- Nền tảng "Nồi Niêu", 72% thị phần, 40.000 quán, phí 20% → 28%, lỗ 31%/đơn: **số minh hoạ**, tên
  nền tảng là hư cấu.

Quy tắc khi sửa nội dung: con số minh hoạ phải giữ được quan hệ logic giữa các dòng (ví dụ phí tăng
8 điểm phần trăm phải tương ứng với số tiền trên 100 triệu doanh thu). Test nội dung không kiểm tra
điều này, nên phải rà bằng tay.

## 3. Phạm trù và chương

Sáu chương lấy theo giáo trình MLN122 hiện hành. Khi giáo trình đổi, sửa duy nhất
`src/content/chapters.js`; mọi nhãn chương trong mốc và kịch bản đọc từ đó.

## 4. Nguồn thiết kế

- **MengToFrontend audit** (Kappaemme-git/MengToFrontend): kiểm tra giãn chữ, dùng tư liệu thật thay
  ảnh AI, cắt ảnh nhất quán, kiểm cả viewport desktop và mobile.
- **Anthropic `frontend-design` skill**: thiết kế phải bắt nguồn từ đối tượng (hồ sơ quyết định),
  lập kế hoạch token trước khi viết CSS, tránh các dấu hiệu giao diện mặc định của AI, dành "độ
  mạnh" cho một chỗ duy nhất, giữ sàn chất lượng (mobile, focus rõ ràng, reduced motion).

Sản phẩm **không dùng ảnh**: toàn bộ là chữ, đường kẻ và con dấu. Vì vậy không có vấn đề bản quyền
ảnh, nhưng cũng không có tư liệu ảnh — đây là lựa chọn có chủ ý, không phải thiếu sót.

## 5. Giấy phép

- Phông chữ: **Barlow Condensed**, **Be Vietnam Pro** — SIL Open Font License 1.1, cài qua
  `@fontsource` (tự lưu trữ, không gọi Google Fonts).
- Mã nguồn: chưa gắn giấy phép; nhóm quyết định trước khi công khai.

## 6. Những gì chưa kiểm chứng

- Chưa có giảng viên MLN122 đọc và duyệt nội dung.
- Chưa kiểm thử với người dùng thật ngoài nhóm: chưa có số liệu về thời gian thực tế của 5 bước
  (ước lượng 8 phút/kịch bản là ước lượng thiết kế).
- Chưa kiểm tra giao diện trên máy thật ở 375 px; mới kiểm bằng CSS và HTML server.
- Chưa kiểm thử với trình đọc màn hình; đã có skip link, `aria-live`, `aria-current`, nhãn nút rõ
  ràng nhưng chưa audit bằng axe hay screen reader thật.
- Chưa kiểm tra in A4 trên máy in thật (chỉ kiểm bằng CSS `@page` và chế độ print preview của
  trình duyệt).

## 7. Danh sách kiểm trước khi công bố

- [ ] Thay hai số nháp của năm 2007 bằng số đã đối chiếu, bỏ nhãn "Số nháp".
- [ ] Chốt số lạm phát 1986 (và các năm liên quan) từ bản in Niên giám thống kê.
- [ ] Giảng viên đọc và duyệt toàn bộ nội dung hai kịch bản.
- [ ] Thử với 5 sinh viên, ghi thời gian từng bước, sửa chỗ gây bỏ dở.
- [ ] Kiểm 375 px và 1440 px trên máy thật.
- [ ] In thử hồ sơ A4, kiểm không cắt chữ và không tràn trang.
- [ ] Kiểm lại toàn bộ liên kết nội bộ và tiêu đề trang.
