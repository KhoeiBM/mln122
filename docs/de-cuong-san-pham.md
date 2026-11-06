# Đề cương sản phẩm — Bóc giá

Tài liệu để nộp thuyết minh và chia việc. Sản phẩm đã chạy được: xem `README.md`.

## 1. Tên và một câu mô tả

**Bóc giá — một món hàng, ai lấy phần nào?**

Người học chia giá bán của một món quen (ly trà sữa 45.000đ, áo thun 250.000đ, suất ăn 35.000đ)
thành bảy khoản, gộp lại thành `c`, `v`, `m`, tự tính `m′` theo cách chia của mình, rồi xem ai nhận
phần thặng dư trong chuỗi.

## 2. Tính cần thiết

1. **Giá là dữ kiện quen nhất mà ít ai bóc được.** Sinh viên biết một ly trà sữa giá bao nhiêu,
   gần như không biết trong đó có bao nhiêu là công lao động.
2. **Khái niệm học thuộc nhưng không gắn được với số.** `c + v + m` và `m′` thường được học như
   công thức phải nhớ, không phải như hệ quả của một cách chia.
3. **Bài tập hiện có thường là tính toán cho sẵn số.** Ở đây người học phải *tự tạo ra* số liệu
   phân phối trước, rồi mới đối chiếu — nên chỗ lệch là chỗ cần giải thích.

## 3. Tính sáng tạo

- **Không có đáp án.** Không phương án A/B/C, không điểm, không xếp hạng. Chỉ có khoảng tham chiếu
  để đặt cạnh cách chia của người học.
- **Một cơ chế duy nhất, dùng ba lần.** Cùng một thao tác chia tiền, ba món cho ba kết luận khác
  nhau: quán nhỏ (m′ 150%), áo thun thương hiệu (m′ rất cao vì phần lớn `m` thuộc thương hiệu), suất
  ăn qua ứng dụng (phần lớn giá trị nằm ở phí kênh bán).
- **`m′` do người học tạo ra.** Con số xuất hiện sau khi họ chia, nên nó là hệ quả của một quyết định
  phân phối, không phải một công thức trang trí.
- **Phần kiến thức đứng cùng chỗ với ví dụ.** Mỗi phạm trù có trích dẫn, nói lại bằng lời thường,
  đúc kết và ba dòng ứng dụng — đúng ba món đang làm.

## 4. Đối tượng và phạm vi

- Sinh viên FPT học MLN122; giảng viên cần một hoạt động mở đầu buổi học.
- Khoá cứng phạm vi: **3 món × 7 khoản × 3 lựa chọn cắt 5%**, 8 phạm trù. Thêm món là thêm chi phí
  dựng bảng tham chiếu, không chỉ thêm nội dung.

## 5. Luồng sử dụng

| Bước | Việc người học làm | Điều kiện |
| --- | --- | --- |
| 1 | Chia bảy khoản cho đủ 100% | bắt buộc để mở bước 2 |
| 2 | Mở phần thật: lệch so với tham chiếu, gộp `c/v/m`, đọc `m′` | đã chia đủ 100% |
| 3 | Xem bốn mắt chuỗi giá trị, chọn chỗ cắt 5%, đọc ai chịu | đã mở phần thật |
| 4 | Viết 2–4 câu: phần dư ra đến từ đâu | đã chọn chỗ cắt |
| 5 | Đọc phần kiến thức của món | luôn mở |
| 6 | Luyện: thẻ ghi nhớ, ghép cặp, trắc nghiệm | luôn mở, không bắt buộc |

Hoàn thành = đủ năm điều kiện trên. Tiến độ lưu trên máy người học.

## 5b. Phần luyện

Ba chế độ luyện sinh thẳng từ dữ liệu đã có: 8 thẻ ghi nhớ (tự đánh giá bốn mức, lịch ôn giãn kiểu
SM-2 rút gọn), ghép 6 cặp phạm trù × ứng dụng mỗi lượt (bốn lượt phủ 24 cặp), 12 câu trắc nghiệm có
giải thích từng phương án. Điểm kinh nghiệm, cấp, chuỗi ngày và kỷ lục chỉ để duy trì nhịp quay lại —
không quy đổi thành điểm môn học, không có bảng xếp hạng, không gửi dữ liệu lên máy chủ.

## 6. Đánh giá (không chấm cách chia)

Bốn tiêu chí dùng cho thảo luận nhóm hoặc tự đánh giá:

1. **Nhận diện cấu trúc giá:** phân biệt được khoản nào là chi phí, khoản nào là công.
2. **Vận dụng `m′`:** giải thích được vì sao cách chia của mình cho ra con số đó.
3. **Phản biện:** chỉ ra được ít nhất một hệ quả trái chiều của lựa chọn cắt 5%.
4. **Liên hệ:** nói được vì sao cùng một chiếc áo lại có hai con số `m′` (trong xưởng và toàn chuỗi).

Sản phẩm cung cấp nguyên liệu cho bốn tiêu chí này, không tự cho điểm.

## 7. Phân việc (1 tuần, 3–4 người)

| Ngày | Việc | Ai |
| --- | --- | --- |
| 1 | Chốt bảng tham chiếu ba món; rà lại bốn mục kiến thức đầu | Biên tập nội dung |
| 2 | Rà trích dẫn, ghi số trang, kiểm "đúc kết" và "ứng dụng" | Biên tập + giảng viên hướng dẫn |
| 3 | Kiểm giao diện trên máy thật (375 px, 1440 px), bàn phím, focus | Thiết kế + front-end |
| 4 | Thử với 5 sinh viên, ghi thời gian từng bước | QA |
| 5 | Sửa theo phản hồi, tập demo 4 phút, viết phần trả lời về nguồn số | Cả nhóm |

## 8. Kịch bản demo 4 phút

1. **0:00–0:40** — Mở trang chủ, đặt câu hỏi: "45.000 đồng này chia thế nào?" rồi mời giảng viên
   tự bấm vài nút.
2. **0:40–2:00** — Mở phần thật, chỉ vào bảng lệch và giải thích: đây là khoảng, không phải đáp án.
3. **2:00–2:50** — Chuyển sang suất ăn qua ứng dụng, cho thấy cùng cơ chế nhưng kết luận khác: phần
   lớn giá trị nằm ở phí kênh bán, không ở người nấu.
4. **2:50–3:30** — Mở phần kiến thức: trích dẫn, đúc kết, ứng dụng — cho thấy nội dung lý luận không
   bị tách khỏi ví dụ.
5. **3:30–4:00** — Nói rõ giới hạn: số là ước lượng minh hoạ, chưa đối chiếu số trang, chưa thử với
   sinh viên ngoài nhóm.

## 9. Rủi ro và cách chặn

| Rủi ro | Cách chặn hiện có |
| --- | --- |
| Bị coi là bài tính có đáp án | Không điểm, không `isCorrect`, tham chiếu là khoảng, có test chặn |
| Số liệu bị hỏi nguồn | Ghi "ước lượng minh hoạ" ngay dưới kết quả và ở trang chủ; ghi rõ trong `docs/NGUON-VA-GIOI-HAN.md` |
| Trích dẫn sai | Ghi nguồn tại chỗ, hiện "số trang cần đối chiếu bản in", có danh sách kiểm |
| Người học bấm qua loa | Hoàn thành cần chuỗi + cắt 5% + viết ≥ 80 ký tự |
| Phần luyện bị hiểu là học thuộc đáp án | Câu hỏi sinh từ số liệu đang hiển thị, mỗi phương án đều có giải thích, không có ngân hàng câu hỏi cố định |
| Một tên lớp CSS làm hỏng bố cục ở thành phần khác | Tên lớp theo hệ riêng (`stage*`, `bump`, `prac-*`), có test canh gác lớp kích thước cố định |
| Nội dung quá tải | Khoá phạm vi ba món, bảy khoản |

## 10. Hướng phát triển

- Thêm món thứ tư theo hướng dịch vụ (vé xe, gói cước) để so sánh cấu trúc giá dịch vụ với hàng hoá.
- Chế độ nhóm: ba sinh viên chia cùng một món, so sánh ba cách chia và tranh luận chỗ lệch.
- Bản cho giảng viên: xem phân bố cách chia của cả lớp (không thu thập dữ liệu cá nhân).
- Mở rộng phần luyện thành đề ôn theo chương khi có ngân hàng câu hỏi đã được giảng viên duyệt.
