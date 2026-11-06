# Đề cương sản phẩm — Sổ cái MLN122

## 1. Tên và một câu mô tả

**Sổ cái MLN122 — sáu chương, 120 câu, một cuốn sổ.** Web ôn thi cho môn Kinh tế chính trị Mác –
Lênin (Đại học FPT): trắc nghiệm có giải thích từng phương án, thẻ phạm trù giãn lịch, ghép thuật
ngữ, và một Knowledge Hub tra theo chương.

## 2. Tính cần thiết

Sinh viên MLN122 thường có ba vấn đề: (1) đề cương dài, không biết chỗ nào là trọng tâm; (2) làm
trắc nghiệm chỉ biết đúng/sai mà không biết **vì sao phương án kia sai**; (3) học xong một lần rồi
quên vì không có nhịp ôn lại. Sản phẩm xử lý cả ba: chia nội dung theo đúng sáu chương, giải thích
cả bốn phương án, và giãn lịch ôn theo mức tự đánh giá.

## 3. Tính sáng tạo

- **Giải thích bằng cả bốn phương án**, kèm một dòng "cách loại trừ" cho mỗi câu — biến câu sai thành
  tài liệu học, không chỉ là điểm trừ.
- **Câu hỏi sinh từ chính dữ liệu chương** (phạm trù, ví dụ, số liệu), không có ngân hàng câu hỏi
  ngoài giáo trình để học thuộc máy móc.
- **Ngôn ngữ thiết kế "sổ cái"**: giấy, đường kẻ nét đứt, số kiểu bảng — khác hẳn giao diện thẻ bo
  tròn quen thuộc, nhưng vẫn đọc nhanh trên điện thoại.
- **Trung thực về nguồn**: mỗi phạm trù ghi rõ "trích giáo trình" hay "diễn đạt theo giáo trình".

## 4. Đối tượng và phạm vi

- Sinh viên FPT đang học MLN122, ôn thi giữa kỳ/cuối kỳ.
- Phạm vi: 6 chương, 120 câu, 22 phạm trù, 3 ví dụ đời thường (trà sữa 45.000đ, áo thun 250.000đ,
  suất ăn 35.000đ).
- Không làm: đề thi thử có tính giờ như thi thật, bảng xếp hạng, tài khoản, dữ liệu máy chủ.

## 5. Luồng sử dụng

| Bước | Việc người học làm | Điều kiện |
| --- | --- | --- |
| 1 | Mở `/quiz`, chọn chương (hoặc cả 6 chương), chọn 10/20/tất cả câu | luôn mở |
| 2 | Trả lời từng câu; xem giải thích 4 phương án và mẹo loại trừ | sau khi chọn |
| 3 | Xem kết quả lượt, đọc gợi ý theo mức đúng | hết lượt |
| 4 | Sang `/review` ôn thẻ phạm trù, tự đánh giá 4 mức | luôn mở |
| 5 | Ghép 6 cặp ở `/match` để kiểm tra ranh giới giữa các phạm trù | luôn mở |
| 6 | Tra `/knowledge` khi cần đọc lại lý thuyết hoặc tìm phạm trù | luôn mở |

## 6. Thiết kế ngân hàng câu hỏi

- 20 câu/chương, đúng 4 phương án, một đáp án.
- Mỗi phương án có một dòng giải thích riêng, bắt đầu bằng "Đúng" hoặc "Sai" — kiểm thử tự động xác
  nhận dòng "Đúng" nằm đúng vị trí `answer`.
- Mỗi câu có `tip` mô tả cách loại trừ (từ khoá, cặp phạm trù dễ lẫn, công thức cần nhớ).
- Câu tính toán chỉ dùng số liệu tự đặt (ví dụ `c = 60, v = 20, m = 30` → `m′ = 150%`), không giả lập
  số liệu doanh nghiệp.
- Cấm chữ "đáp án đúng" trong đề — sản phẩm dạy cách lập luận, không dạy mẹo chọn đáp án.

## 7. Đánh giá

Sản phẩm không chấm điểm môn học. Người học tự đánh giá qua: số câu đã làm, số câu đúng, chương yếu
nhất (hàm `weakestChapter`), số thẻ đến hạn, và số lần chọn sai khi ghép. Điểm kinh nghiệm chỉ để
giữ nhịp quay lại.

## 8. Phân việc (1 tuần, 3–4 người)

| Ngày | Việc | Ai |
| --- | --- | --- |
| 1 | Chốt 6 chương, viết tóm tắt và mục tiêu từng chương | Biên tập nội dung |
| 2 | Viết 120 câu theo chương, mỗi câu kèm 4 lời giải và 1 mẹo | Biên tập + nhóm |
| 3 | Đối chiếu trích dẫn, tách rõ nguyên văn và phần diễn đạt | Biên tập + giảng viên hướng dẫn |
| 4 | Kiểm giao diện trên máy thật (375 px, 1440 px), bàn phím, focus | Thiết kế + front-end |
| 5 | Thử với 5 sinh viên, ghi tỷ lệ đúng từng chương, sửa câu gây nhiễu | QA |

## 9. Kịch bản demo 4 phút

1. **0:00–0:50** — Mở trang chủ, chỉ dải tiến độ, giải thích: dữ liệu chỉ nằm trong máy người học.
2. **0:50–2:10** — Vào `/quiz`, chọn Ch.3, làm 3 câu: cho giảng viên thấy phần giải thích bốn phương
   án và dòng "cách loại trừ".
3. **2:10–3:00** — Sang `/review`: lật một thẻ, tự đánh giá "Mơ hồ", giải thích lịch ôn giãn.
4. **3:00–3:30** — Sang `/match`: ghép sai một cặp để thấy nhịp rung và cách đếm lần sai.
5. **3:30–4:00** — Mở `/knowledge#nguon`: nói rõ phần nào là trích giáo trình, phần nào do nhóm viết,
   và những gì chưa được thẩm định.

## 10. Rủi ro và cách chặn

| Rủi ro | Cách chặn hiện có |
| --- | --- |
| Câu hỏi sai kiến thức | Mỗi câu có 4 lời giải giải thích lý do; kiểm thử bắt buộc lời giải khớp vị trí đáp án; danh sách rà soát trong `docs/NGUON-VA-GIOI-HAN.md` |
| Trích dẫn bị hiểu là nguyên văn | Ghi rõ "Trích giáo trình" / "Diễn đạt theo giáo trình" ngay trên từng phạm trù |
| Người học chỉ bấm cho hết | Sai vẫn có điểm nhưng thấp hơn; hiện giải thích cả 4 phương án; gợi ý theo mức đúng |
| Học thuộc đáp án | Câu sinh theo chương, thứ tự xáo theo seed, thẻ và ghép dùng nội dung khác (đúc kết, ví dụ) |
| Lỗi bố cục do trùng tên lớp CSS | Test canh gác lớp kích thước cố định và bộ chọn trùng |
| Dữ liệu cũ gây lỗi | `migrateGame` lọc lại từng trường; đổi khoá sang `so-cai:v1` |

## 11. Hướng phát triển

- Thêm chế độ "đề thi thử" 40 câu trộn sáu chương, có đồng hồ, không giới hạn lượt.
- Xuất phiếu kết quả theo chương để sinh viên nộp kèm phần tự học.
- Bổ sung hình ảnh/bảng số cho câu tính toán `m′`, `M`, `p′`.
- Cho giảng viên nhập câu hỏi qua một tệp JSON có kiểm tra schema.
