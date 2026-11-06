# Nguồn và giới hạn

Tài liệu này ghi rõ phần nào của Sổ cái MLN122 lấy từ đâu, phần nào do nhóm viết, và những gì **chưa**
được kiểm chứng trước khi công bố.

## 1. Nguồn của phần lý thuyết

- **Giáo trình:** *Giáo trình Kinh tế chính trị Mác – Lênin (dành cho bậc đại học, không chuyên lý
  luận chính trị)*, NXB Chính trị quốc gia Sự thật, 2021 — sáu chương, dùng làm khung cho toàn bộ
  sản phẩm.
- **Trích dẫn trong Knowledge Hub (22 phạm trù):** mỗi mục có trường `verbatim`.
  - `verbatim: true` (10 mục) — câu chữ theo cách diễn đạt phổ biến trong giáo trình. Giao diện hiện
    "Trích giáo trình".
  - `verbatim: false` (12 mục) — phần viết lại của nhóm. Giao diện hiện "Diễn đạt theo giáo trình" để
    không ai trích lại như nguyên văn.
- **Số trang:** tất cả đang để trống, giao diện hiện "số trang cần đối chiếu bản in". **Chưa đối
  chiếu bản in lần nào.**

## 2. Nguồn của ngân hàng câu hỏi (120 câu)

- Do nhóm biên soạn theo sáu chương; **không phải đề thi chính thức** của Đại học FPT và chưa được
  giảng viên MLN122 thẩm định.
- Mỗi câu gồm: đề, 4 phương án, chỉ số đáp án, 4 lời giải (một "Đúng", ba "Sai"), một dòng mẹo loại
  trừ. Kiểm thử `src/content/questions.test.js` bắt buộc:
  - 20 câu/chương, id duy nhất, đúng tiền tố chương;
  - 4 phương án khác nhau, đúng một đáp án;
  - **lời giải khớp vị trí phương án**: dòng ở `answer` bắt đầu bằng "Đúng", ba dòng còn lại "Sai";
  - mọi câu có `tip`; đề không chứa chữ "đáp án đúng".
- Câu tính toán dùng số liệu tự đặt (`c = 60, v = 20, m = 30` → `m′ = 150%`), không mô phỏng số liệu
  của doanh nghiệp nào.

## 3. Nội dung không lấy từ nguồn ngoài

- Ba ví dụ trà sữa 45.000đ, áo thun 250.000đ, suất ăn 35.000đ: **ví dụ minh hoạ**. Không phải giá
  công bố của thương hiệu hay nền tảng nào. Ở bản trước, các con số này từng dùng cho công cụ chia
  giá; công cụ đó đã bị gỡ và con số chỉ còn xuất hiện trong câu ví dụ.
- Toàn bộ giao diện, hệ thống thiết kế "sổ cái", mã nguồn: do nhóm viết.

## 4. Dữ liệu người học

- Một khoá `localStorage`: `so-cai:v1`, gồm điểm, chuỗi ngày, danh sách câu đã làm, lịch ôn thẻ, kỷ
  lục. Không có cookie, không có API, không gửi dữ liệu đi đâu.
- Xoá dữ liệu trình duyệt là mất toàn bộ tiến độ. Không có chức năng khôi phục.

## 5. Kiểm thử hiện có

`npm test` → 40 test / 7 tệp (nội dung câu hỏi, chọn câu và tiến độ, XP và lịch ôn, luồng quiz, luồng
thẻ, luồng ghép, canh gác tên lớp CSS). `npm run build` → 14 trang tĩnh, gồm 6 trang chương SSG.

## 6. Việc phải làm trước khi công bố

1. Đối chiếu số trang của 10 trích dẫn `verbatim` với bản in; nếu không khớp thì chuyển sang
   `verbatim: false`.
2. Nhờ giảng viên đọc 120 câu: ưu tiên chương 3 (giá trị thặng dư) và chương 5 (đặc trưng kinh tế thị
   trường định hướng XHCN) vì đây là hai chương dễ sai câu chữ nhất.
3. Thử với ít nhất 5 sinh viên: ghi tỷ lệ đúng từng chương, câu nào dưới 30% đúng thì viết lại đề.
4. Kiểm giao diện trên máy thật ở 375 px và 1440 px: trang chủ, một trang chương, một lượt quiz có
   giải thích, một lượt ghép, Knowledge Hub khi lọc theo chương.
5. Kiểm bàn phím: tab qua các chip chọn chương, chọn phương án, lật thẻ, chọn mức tự đánh giá.
6. Rà lại câu chữ chính trị ở chương 5 theo văn kiện hiện hành; không dùng số liệu thống kê chưa dẫn
   nguồn.

## 7. Điều đã biết là chưa hoàn hảo

- Bộ 120 câu do một nhóm sinh viên viết trong thời gian ngắn, chắc chắn còn câu chưa thật sắc.
- Lịch ôn là SM-2 rút gọn (một hệ số `ease`, bốn mức), không phải bản đầy đủ.
- Chưa có ảnh, bảng biểu hay sơ đồ; các câu về chuỗi giá trị phải diễn đạt bằng chữ.
- Chưa có chế độ thi thử có đồng hồ; chưa có xuất kết quả.
