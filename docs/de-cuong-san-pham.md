# Đề cương sản phẩm — Chọn đường

Tài liệu dùng để nộp thuyết minh và chia việc. Sản phẩm đã chạy được: xem `README.md`.

## 1. Tên và định vị

**Chọn đường — một quyết định, nhiều góc nhìn.** Kết hợp tuần tự hai ý tưởng ban đầu:

- **DẤU ẤN** thu gọn thành **hai mốc lịch sử kinh tế** (1986, 2007) ở phần mở đầu.
- **CHỌN ĐƯỜNG** là phần chính: hai kịch bản quyết định, mỗi kịch bản năm bước.

Lý do chọn cách kết hợp này thay vì làm song song hai sản phẩm: một mạch trải nghiệm duy nhất
(hiểu bối cảnh → quyết định → nhìn nhiều phía → lập luận) thuyết phục hơn trong 7 phút demo, và
phạm vi nội dung vẫn kiểm soát được (2 mốc + 2 kịch bản).

## 2. Tính cần thiết

1. **Học khái niệm nhưng không vận dụng được.** Sinh viên thường đọc được định nghĩa giá trị thặng
   dư, quan hệ sản xuất, độc quyền nhưng không nói được khái niệm nào đang giải thích một tình
   huống cụ thể.
2. **Bài kiểm tra khuyến khích nhớ, không khuyến khích lập luận.** Câu hỏi trắc nghiệm có một đáp
   án; vấn đề kinh tế thật thì không.
3. **Lịch sử kinh tế bị dạy như danh sách mốc.** 1986 và 2007 là hai tình huống đánh đổi có thật:
   ai chịu chi phí của thay đổi, chịu trong bao lâu.

## 3. Tính sáng tạo

- **Không có đáp án đúng, có kiểm chứng.** Mỗi phương án bắt buộc phải có người được lợi và người
  trả giá; phần phân tích chỉ nêu phạm trù, không kết luận. Test tự động chặn trường `isCorrect`.
- **Ba trục hệ quả thay cho điểm số.** Kinh tế / an sinh / bền vững, ghi bằng lời, không biểu đồ,
  không tổng điểm.
- **Một quyết định, ba góc nhìn.** Đây là cơ chế trung tâm: cùng một phương án được chiếu lại từ
  người lao động, người quản lý và địa phương (hoặc quán nhỏ, tài xế, sinh viên).
- **Hồ sơ thay cho bảng điểm.** Kết quả cuối là một hồ sơ in được, ghi phương án, hệ quả ba trục và
  phản biện của người học.

## 4. Đối tượng và phạm vi

- Sinh viên FPT học MLN122; giảng viên cần một hoạt động thảo luận không phải trắc nghiệm.
- Phạm vi khoá cứng: **2 mốc + 2 kịch bản + 3 phương án/kịch bản**. Thêm kịch bản là thêm chi phí
  kiểm chứng nội dung, không phải chỉ thêm nội dung.
- Nội dung map với chương 1–6 của giáo trình; hai kịch bản phủ chương 2, 3, 4, 5, 6.

## 5. Cấu trúc và luồng

| Bước | Màn hình | Việc người học làm | Điều kiện để tính hoàn thành |
| --- | --- | --- | --- |
| 0 | `/lich-su` | Đọc hai mốc, tuỳ chọn đánh dấu | không bắt buộc |
| 1 | `/kich-ban/[id]` bước 1 | Đọc vai, 4 dữ kiện, mâu thuẫn | bấm "đã hiểu bối cảnh" |
| 2 | bước 2 | Mở hệ quả ba phương án, chọn một | đã ghi phương án |
| 3 | bước 3 | Mở đủ ba góc nhìn | 3/3 góc nhìn |
| 4 | bước 4 | Đọc hai phạm trù + câu hỏi phản biện | bấm "đọc xong" |
| 5 | bước 5 | Viết phản biện | ≥ 80 ký tự |
| 6 | `/ho-so` | Xem/in hồ sơ | — |

## 6. Đánh giá (không chấm điểm lựa chọn)

Bốn tiêu chí, dùng cho thảo luận nhóm hoặc tự đánh giá:

1. **Nhận diện vấn đề** — nói đúng mâu thuẫn, không chỉ tóm tắt bối cảnh.
2. **Vận dụng lý luận** — gọi đúng phạm trù và đúng chương.
3. **Tư duy phản biện** — chỉ ra được ít nhất một hệ quả trái chiều của phương án đã chọn.
4. **Đề xuất** — nêu được điều kiện để phương án đỡ gây tổn thất cho phía yếu.

Sản phẩm ghi lại nguyên liệu cho bốn tiêu chí này (phương án, ba góc nhìn đã xem, phản biện), không
tự cho điểm.

## 7. Phân việc 3 tuần (5 người)

| Tuần | Việc | Người phụ trách |
| --- | --- | --- |
| 1 | Chốt số liệu 2 mốc với Niên giám thống kê; rà lại toàn bộ nội dung kịch bản | Biên tập lý luận |
| 1 | Rà mapping từng phương án ↔ phạm trù ↔ chương; viết câu hỏi phản biện | Biên tập lý luận |
| 1–2 | Hoàn thiện giao diện hồ sơ (tabs, bảng hệ quả, con dấu), kiểm 375 px trên máy thật | Thiết kế + front-end |
| 2 | Kiểm tra luồng tiến độ, huy hiệu, in A4 | Front-end + QA |
| 2–3 | Tổ chức thử với 5 sinh viên, ghi thời gian thực tế từng bước | QA |
| 3 | Viết thuyết minh, tập demo 7 phút, chuẩn bị phương án trả lời câu hỏi về số liệu | Cả nhóm |

## 8. Kịch bản demo 7 phút

1. **0:00–1:00** — Nêu vấn đề: học xong khái niệm nhưng không dùng được; mời giảng viên chọn thử
   một phương án trong HS-02.
2. **1:00–3:00** — Mở hệ quả ba trục của cả ba phương án, chỉ ra mỗi phương án đều có người trả giá.
3. **3:00–4:30** — Chuyển sang ba góc nhìn của phương án vừa chọn; đây là phần khác biệt so với
   trắc nghiệm.
4. **4:30–5:30** — Mở góc phân tích: phạm trù nào, chương nào, vì sao không kết luận đúng/sai.
5. **5:30–6:30** — Mở hồ sơ, in A4, chỉ ra sản phẩm tạo ra nguyên liệu cho thảo luận nhóm.
6. **6:30–7:00** — Nói rõ giới hạn: số liệu nháp, kịch bản hư cấu, chưa kiểm thử người dùng.

## 9. Rủi ro và cách chặn

| Rủi ro | Cách chặn hiện có |
| --- | --- |
| Bị coi là trắc nghiệm trá hình | Không có điểm, không có `isCorrect`, có test chặn |
| Số liệu lịch sử sai | Ghi rõ "số nháp" ngay trên trang; danh sách nguồn trong `docs/NGUON-VA-GIOI-HAN.md` |
| Nội dung nhạy cảm (đất đai, FDI, nền tảng) | Nhân vật và doanh nghiệp hư cấu, không bình luận chính sách cụ thể |
| Nội dung quá tải | Khoá phạm vi 2 mốc + 2 kịch bản, mỗi kịch bản 3 phương án |
| Người học bấm qua loa | Hoàn thành yêu cầu 3 góc nhìn + phản biện ≥ 80 ký tự |

## 10. Hướng phát triển

- Thêm kịch bản theo chương 2 (giá – cung cầu) và chương 6 (hội nhập, chuỗi giá trị).
- Chế độ nhóm: 3 sinh viên cùng một kịch bản, mỗi người một góc nhìn, in hồ sơ nhóm.
- Bản dành cho giảng viên: xem phân bố lựa chọn của lớp (không thu thập dữ liệu cá nhân).
