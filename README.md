# Sổ cái MLN122 — sáu chương, 120 câu, một cuốn sổ

Sản phẩm học tập cho môn **MLN122 – Kinh tế chính trị Mác – Lênin** (Đại học FPT). Người học chọn
chương, làm trắc nghiệm có giải thích **từng phương án**, ôn lại bằng thẻ phạm trù giãn lịch, ghép
thuật ngữ với câu đúc kết, và tra cứu Knowledge Hub. Toàn bộ chạy tĩnh trên Next.js: không backend,
không tài khoản, tiến độ nằm trong trình duyệt.

Sản phẩm này thay thế bản trước (BÓC GIÁ — chia giá bán thành `c`, `v`, `m`). Công cụ chia giá, các
trang `/boc/[id]`, `/luyen`, `/kien-thuc` và toàn bộ mã liên quan đã được gỡ. Ba ví dụ trà sữa
45.000đ, áo thun 250.000đ, suất ăn 35.000đ được giữ lại làm **ví dụ bằng chữ** xuyên suốt sáu chương.

## Chạy thử

```bash
npm ci
npm run dev     # http://localhost:3000
npm test        # 40 test
npm run build
```

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Giới thiệu, dải tiến độ, bốn lối vào, sáu chương, ba ví dụ, ghi chú nguồn |
| `/learn` | Danh sách sáu chương: tóm tắt, mục tiêu, số câu |
| `/learn/[slug]` | Một chương: mục tiêu, phạm trù trọng tâm (trích dẫn, ví dụ), nút làm quiz chương đó |
| `/quiz` | Trắc nghiệm theo chương, có giải thích bốn phương án và mẹo loại trừ |
| `/review` | Thẻ phạm trù, tự đánh giá bốn mức, lịch ôn giãn kiểu SM-2 rút gọn |
| `/match` | Ghép sáu cặp phạm trù ↔ câu đúc kết mỗi lượt |
| `/knowledge` | Knowledge Hub: lọc theo chương, tìm kiếm, kèm mục nguồn và giới hạn |

Tất cả là trang tĩnh (6 chương được SSG theo `slug`), không có API route.

## Ngân hàng câu hỏi

120 câu, **20 câu mỗi chương**, viết trong `src/content/questions/chapter-1..6.js`. Mỗi câu có:

- 4 phương án khác nhau, đúng **một** đáp án (`answer`);
- 4 dòng `why` giải thích theo đúng thứ tự phương án — dòng của đáp án bắt đầu bằng "Đúng", ba dòng
  còn lại bắt đầu bằng "Sai";
- một dòng `tip` chỉ cách loại trừ.

Câu chữ do nhóm biên soạn theo sáu chương của giáo trình, **không phải đề thi chính thức** và chưa
được giảng viên thẩm định. Các câu tính toán (m′, M, p′) dùng số liệu tự đặt, đủ đơn giản để kiểm
tra bằng giấy nháp.

## Sáu chương

1. Khái quát về kinh tế chính trị Mác – Lênin
2. Hàng hoá và thị trường
3. Giá trị thặng dư và tích luỹ tư bản
4. Cạnh tranh và độc quyền
5. Kinh tế thị trường định hướng XHCN ở Việt Nam
6. Công nghiệp hoá, hiện đại hoá và hội nhập kinh tế quốc tế

Mỗi chương có `summary`, ba `aims` (mục tiêu), và danh sách `terms` trỏ sang Knowledge Hub.

## Knowledge Hub

22 phạm trù, mỗi mục bốn phần: **trích dẫn**, **nói lại bằng lời thường**, **đúc kết**, **ví dụ**.
Mục ghi "Trích giáo trình" là câu chữ theo cách diễn đạt phổ biến trong giáo trình; mục ghi "Diễn đạt
theo giáo trình" là phần viết của nhóm, không phải nguyên văn. Số trang chưa đối chiếu bản in nên
giao diện luôn hiện dòng nhắc.

## Tiến độ và dữ liệu

- Một khoá duy nhất: `localStorage` → `so-cai:v1`.
- Nội dung: `xp`, `streak {count,last}`, `answered {questionId: 'correct'|'wrong'}`, `cards {hubId:
  {ease, interval, reps, due}}`, `best {quiz, match}`, `rounds`.
- Điểm kinh nghiệm: +10 câu đúng, +2 câu sai (sai vẫn có điểm để khuyến khích làm), +5 mỗi thẻ tự
  đánh giá, +3 mỗi cặp ghép, +20 khi hết lượt ghép.
- Không gửi dữ liệu đi đâu, không có bảng xếp hạng, không quy đổi thành điểm môn học.
- Dữ liệu hỏng hoặc lạc hậu được lọc lại trong `migrateGame`; xoá dữ liệu trình duyệt là mất tiến độ.

## Hướng thiết kế

Ngôn ngữ **sổ cái**: mặt bàn kraft `#e6e2d8`, giấy `#fffdf7`, mực `#1a1a17`, mực xanh cho phần đúng
`#1f4f8b`, mực đỏ cho phần sai `#a8382c`. Đường kẻ nét đứt phân khối như một trang sổ kế toán; số
dùng Barlow Condensed với `tabular-nums`, nội dung dùng Be Vietnam Pro. Không gradient, không thẻ bo
tròn, không bóng đổ. Chuyển động duy nhất: nhịp rung 320 ms khi chọn sai trong phần ghép (tắt khi
`prefers-reduced-motion`).

## Kiểm thử

`npm test` chạy **40 test trong 7 tệp**:

- `src/content/questions.test.js` — 120 câu, 20 câu/chương, id không trùng và đúng tiền tố chương,
  4 phương án khác nhau, đúng một đáp án, **lời giải khớp thứ tự phương án** ("Đúng" đúng chỗ),
  câu nào cũng có `tip`; mỗi chương có ≥3 phạm trù và mọi `terms` đều tồn tại.
- `src/lib/questions.test.js` — chọn câu tất định theo seed, lọc theo chương, chấm điểm, tiến độ
  tổng và theo chương, chương yếu nhất, câu chưa làm đầu tiên.
- `src/lib/game.test.js` — chuỗi ngày (nối tiếp/đứt/cùng ngày), khoảng nghỉ thẻ theo bốn mức, thẻ đến
  hạn, đọc lại dữ liệu cũ/hỏng, kỷ lục, điểm kinh nghiệm.
- `src/components/quiz/quiz.test.jsx` — chạy hết 10 câu: mỗi câu hiện 4 dòng giải thích, chọn đúng
  ghi `correct` + 10 XP, chọn sai ghi `wrong` + 2 XP, kết quả cuối lượt; chọn chương 3 thì cả 20 câu
  thuộc chương 3.
- `src/components/review/review.test.jsx` — lật thẻ, tự đánh giá, ghi lịch ôn; "Quên" đưa thẻ về hôm
  nay.
- `src/components/match/match.test.jsx` — khớp hết 6 cặp thì báo xong và cộng thưởng lượt.
- `src/lib/classnames.test.js` — **canh gác tên lớp CSS**: lớp đặt `width` + `height` cố định không
  được dùng ở hai tệp khác nhau, không định nghĩa trùng bộ chọn ở cấp ngoài cùng, `quiz-option` và
  `match-card` thuộc đúng một tệp. Giữ lại sau lỗi bản deploy trước: một tên lớp dùng chung làm thẻ
  bố cục bị bóp còn 40 px và chữ chồng lên nhau.

## Cấu trúc

```
app/
  page.jsx                     trang chủ
  layout.jsx                   khung, chữ, metadata
  globals.css                  toàn bộ hệ thống thiết kế
  learn/page.jsx               danh sách sáu chương
  learn/[slug]/page.jsx        một chương (SSG)
  quiz/page.jsx                trắc nghiệm
  review/page.jsx              thẻ phạm trù
  match/page.jsx               ghép cặp
  knowledge/page.jsx           Knowledge Hub + nguồn
src/
  content/chapters.js          sáu chương: tóm tắt, mục tiêu, phạm trù trọng tâm
  content/questions/           ngân hàng 120 câu, chia theo chương
  content/hub.js               22 phạm trù + nguồn giáo trình
  content/examples.js          ba ví dụ đời thường
  lib/questions.js             chọn câu, chấm điểm, tiến độ theo chương (hàm thuần)
  lib/game.js                  XP, chuỗi ngày, lịch ôn thẻ (hàm thuần)
  lib/useGame.js               đọc/ghi tiến độ trong localStorage
  components/dash/…            dải thống kê, lưới sáu chương
  components/quiz/…            lượt trắc nghiệm
  components/review/…          thẻ phạm trù
  components/match/…           ghép cặp
  components/hub/…             tra cứu phạm trù
  components/site/…            đầu trang, chân trang
docs/
  de-cuong-san-pham.md         thuyết minh, phân việc, kịch bản demo
  NGUON-VA-GIOI-HAN.md         nguồn từng phần và những gì chưa kiểm chứng
```

## Giới hạn

Chưa có giảng viên MLN122 thẩm định nội dung; trích dẫn chưa đối chiếu số trang bản in; các câu hỏi
tính toán dùng số liệu tự đặt; chưa thử với sinh viên ngoài nhóm. Bố cục màn hẹp soát bằng quy tắc
CSS và test tên lớp, chưa chụp ảnh trên máy thật. Chi tiết ở
[`docs/NGUON-VA-GIOI-HAN.md`](docs/NGUON-VA-GIOI-HAN.md).
