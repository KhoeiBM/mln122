# Nguồn và giới hạn

Đọc hết tài liệu này trước khi trình bày. Mỗi mục ghi rõ cái gì đã chốt và cái gì còn phải kiểm.

## 1. Trích dẫn giáo trình

Nguồn: **Giáo trình Kinh tế chính trị Mác – Lênin (dành cho bậc đại học, không chuyên lý luận
chính trị)**, Nhà xuất bản Chính trị quốc gia Sự thật, 2021.

| Phạm trù | Trạng thái |
| --- | --- |
| Hàng hoá và hai thuộc tính | Nội dung trích theo cách diễn đạt phổ biến — **chưa đối chiếu số trang** |
| Giá trị hàng hoá | Như trên |
| Chi phí sản xuất `c + v` | Như trên |
| Tư bản bất biến / khả biến | Như trên |
| Giá trị thặng dư | Như trên |
| Tỷ suất giá trị thặng dư `m′ = m/v × 100%` | Công thức chốt; câu trích **chưa đối chiếu số trang** |
| Cạnh tranh và độc quyền | Như trên |
| Quan hệ lợi ích kinh tế | Như trên |

**Việc phải làm:** mở bản in, ghi số trang cho từng trích dẫn, cập nhật trường `page` trong
`src/content/concepts.js`. Khi trường này có số, giao diện tự hiện "tr. N" thay cho câu "số trang
cần đối chiếu bản in".

Lưu ý: sản phẩm **không đánh số chương** ở bất kỳ đâu (theo yêu cầu của nhóm). Nếu sau này cần
gắn lại với bài giảng, phải làm thành một bản đồ riêng, không sửa nội dung đang hiển thị.

## 2. Con số trong ba món

Toàn bộ là **ước lượng minh hoạ** do nhóm dựng để dạy cách chia:

- Ly trà sữa 45.000đ: dựng theo cấu trúc chi phí của một quán nhỏ ở đô thị.
- Áo thun 250.000đ: dựng theo cấu trúc giá của hàng may mặc có thương hiệu bán qua trung tâm
  thương mại.
- Suất ăn 35.000đ: dựng theo mức phí nền tảng phổ biến hiện nay.

Không dùng số liệu của một quán, thương hiệu hay nền tảng cụ thể nào. Trung điểm các khoảng của
mỗi món cộng lại đúng 100% (có test kiểm tra), nên nếu sửa một khoảng thì phải sửa các khoảng còn
lại cho khớp.

Nếu sau này thay bằng số thật: phải ghi nguồn ngay tại món đó và bỏ nhãn "ước lượng minh hoạ" ở
trang chủ, mục "Con số lấy từ đâu".

## 3. Điều sản phẩm cố ý không làm

- **Không chấm điểm cách chia.** Không có điểm, không xếp hạng, không có trường `isCorrect`
  (có test chặn chữ "đáp án đúng" trong nội dung).
- **Không dùng ảnh.** Toàn bộ là chữ, số và đường kẻ, nên không có vấn đề bản quyền hình ảnh.
- **Không dựng số liệu theo doanh nghiệp thật**, để tránh tranh luận về một tổ chức cụ thể.

## 4. Nguồn thiết kế

- **MengToFrontend audit** (Kappaemme-git/MengToFrontend): kiểm giãn chữ, dùng tư liệu thật thay ảnh
  AI, kiểm cả viewport desktop và mobile, báo cáo theo dạng "launch readiness / top fixes".
- **Anthropic `frontend-design` skill**: thiết kế bắt nguồn từ đối tượng (hoá đơn), lập kế hoạch
  token trước khi viết CSS, tránh các dấu hiệu giao diện mặc định của AI, dành độ mạnh cho một chỗ,
  giữ sàn chất lượng (mobile, focus rõ, reduced motion).

## 5. Giấy phép

- Phông chữ: **Barlow Condensed**, **Be Vietnam Pro** — SIL Open Font License 1.1, cài qua
  `@fontsource`, tự lưu trữ, không gọi Google Fonts.
- Mã nguồn: chưa gắn giấy phép; nhóm quyết định trước khi công khai.

## 6. Những gì chưa kiểm chứng

- Chưa có giảng viên MLN122 đọc và duyệt nội dung, đặc biệt phần trích dẫn.
- Chưa đối chiếu số trang của tám trích dẫn.
- Chưa thử với sinh viên ngoài nhóm: chưa có số liệu về thời gian thực tế (ước lượng 4 phút/món là
  ước lượng thiết kế).
- Chưa kiểm tra giao diện trên máy thật ở 375 px; mới kiểm bằng CSS và HTML server.
- Chưa kiểm thử với trình đọc màn hình; đã có skip link, `aria-live`, nhãn nút đầy đủ
  ("Tăng 5 phần trăm cho Nguyên liệu, hàng nhập"), nhưng chưa audit bằng axe hay screen reader thật.

## 7. Danh sách kiểm trước khi công bố

- [ ] Ghi số trang cho tám trích dẫn, cập nhật `page` trong `concepts.js`.
- [ ] Giảng viên đọc và duyệt toàn bộ nội dung, nhất là phần "Đúc kết" và "Ứng dụng".
- [ ] Rà lại ba bảng tham chiếu: trung điểm vẫn cộng 100%, khoảng vẫn hợp lý.
- [ ] Thử với 5 sinh viên, ghi thời gian từng bước, sửa chỗ gây bỏ dở.
- [ ] Kiểm 375 px và 1440 px trên máy thật.
- [ ] Kiểm bàn phím: Tab qua bảy hàng, bốn nút mỗi hàng, nút mở kết quả.
- [ ] Kiểm lại toàn bộ liên kết nội bộ và tiêu đề trang.
