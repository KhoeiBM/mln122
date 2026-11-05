# Sạp 122 — web app học MLN122 (Đại học FPT)

Trang chủ và phòng học tương tác cho môn **Kinh tế chính trị Mác – Lênin (MLN122, 3 tín chỉ)**.
Ý tưởng, hướng thiết kế và lộ trình nằm trong [`docs/y-tuong-mln122.md`](docs/y-tuong-mln122.md).

## Hai bề mặt, một ngôn ngữ

| Route | Nội dung |
| --- | --- |
| `/` | Bảng giá một ly trà sữa chia `c`, `v`, `m`; sáu chương; ảnh tư liệu; bảng tính kéo được; hỏi nhanh |
| `/studio` | Bảng điều khiển, sáu chương với bảng khái niệm và thẻ ghi nhớ, 14 câu trắc nghiệm, bảng tính `c, v, m, m′` |

Hướng thiết kế: **"bảng giá"** — nền giấy lạnh, chữ condensed có số tabular, đường kẻ đỏ của sổ sách,
nhãn vàng cho phần giá trị thặng dư. Một chữ ký duy nhất, phần còn lại giữ im.

## Đã học từ đâu

- [MengToFrontend](https://github.com/Kappaemme-git/MengToFrontend) — checklist audit landing page:
  typography và letter-spacing, ảnh thật, tinh chỉnh ảnh, chi tiết do người làm, chất lượng mobile.
- [Claude frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) —
  skill thiết kế của Anthropic: bám vào chủ thể, một chữ ký, bỏ bớt một phụ kiện, tránh các mặc định
  typography và năm "look" mà thiết kế do AI hay rơi vào.

## Tính năng

- Sáu chương theo giáo trình: tóm tắt, 27 khái niệm kèm ví dụ Việt Nam, 12 thẻ ghi nhớ, 14 câu hỏi có giải thích.
- Bảng tính giá trị thặng dư: kéo giá bán, nguyên liệu, khấu hao, tiền công → `c`, `v`, `m`, `m′`, cảnh báo khi lỗ.
- Đánh dấu chương đã học, lưu điểm luyện cao nhất trong `localStorage` (khóa `sap122:progress:v1`).
- Không đăng nhập, không backend, không biến môi trường. Đổi máy hoặc xoá dữ liệu trình duyệt thì mất tiến độ.

## Nội dung và giới hạn

Nội dung là bản tóm tắt – diễn giải phục vụ tự học, **không thay thế** giáo trình, bài giảng hay hướng dẫn ôn
thi của giảng viên. Số liệu trong bảng giá và bảng tính là ví dụ minh hoạ, không phải khảo sát. Ảnh sạp hàng là
ảnh tư liệu, cần kiểm tra lại giấy phép trước khi dùng công khai.

## Cấu trúc

```
app/
  layout.jsx            font Barlow Condensed + Be Vietnam Pro, metadata
  page.jsx              trang chủ
  globals.css           token và toàn bộ CSS dùng chung
  studio/page.jsx       phòng học
  studio/studio.css     CSS riêng của phòng học
src/
  content/course.js     nguồn nội dung duy nhất: chương, khái niệm, thẻ, quiz, FAQ
  lib/metrics.js        computeSurplus, chapterStatus, readCount + test
  components/site/      LandingPage
  components/studio/    StudioApp
```

Không dùng thư viện UI ngoài: component tự viết để giữ đúng ngôn ngữ thị giác và bundle nhẹ.

## Chạy

Cần Node.js 22.12 trở lên (hoặc 24 trở lên) để chạy cả bộ test.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest: công thức, dữ liệu, render trang chủ
npm run build && npm start
```

## Deploy

Import repo vào Vercel, Framework Preset **Next.js**, Root Directory `./`, không cần biến môi trường.
