# Sạp 122 — web app học MLN122 (Đại học FPT)

Landing page + phòng học tương tác cho môn **Kinh tế chính trị Mác – Lênin (MLN122, 3 tín chỉ)**.
Ý tưởng, chẩn đoán và lộ trình nằm trong [`docs/y-tuong-mln122.md`](docs/y-tuong-mln122.md).

## Hai bề mặt

| Route | Nội dung | Cách dựng |
| --- | --- | --- |
| `/` | Landing: hoá đơn trà sữa chia thành `c`, `v`, `m`; sáu chương; máy tính kéo tay; FAQ | CSS tự viết, Lora + Be Vietnam Pro + IBM Plex Mono |
| `/studio` | Phòng học: bảng điều khiển, sáu chương, flashcard, 14 câu trắc nghiệm, máy tính giá trị thặng dư | [Cloudscape Design System](https://cloudscape.design) (AWS), đổi theme bằng design token |

## Đã học từ đâu

- [MengToFrontend](https://github.com/Kappaemme-git/MengToFrontend) — checklist chống "AI slop" cho landing page:
  typography và letter-spacing, tham chiếu ảnh thật, tinh chỉnh ảnh, độ đặc thù của thiết kế, chi tiết do
  người làm, chất lượng mobile.
- [Cloudscape Design System](https://cloudscape.design) — bộ component React của AWS, dùng cho phần ứng dụng
  (bảng, trạng thái, form, slider), không dùng cho phần marketing.

## Tính năng

- Sáu chương theo giáo trình: tóm tắt, 27 khái niệm kèm ví dụ Việt Nam, 12 flashcard, 14 câu hỏi có giải thích.
- Máy tính giá trị thặng dư: kéo giá bán, nguyên liệu, khấu hao, tiền công → `c`, `v`, `m`, `m′` và cảnh báo khi lỗ.
- Đánh dấu chương đã học, lưu điểm luyện cao nhất trong `localStorage` (khóa `sap122:progress:v1`).
- Không đăng nhập, không backend, không biến môi trường. Đổi máy hoặc xóa dữ liệu trình duyệt thì mất tiến độ.

## Nội dung và giới hạn

Nội dung là bản tóm tắt – diễn giải phục vụ tự học, **không thay thế** giáo trình, bài giảng hay hướng dẫn ôn
thi của giảng viên. Số liệu trong hoá đơn và máy tính là ví dụ minh hoạ, không phải khảo sát. Ảnh sạp hàng là
ảnh tư liệu, cần kiểm tra lại giấy phép trước khi dùng công khai.

## Cấu trúc

```
app/
  layout.jsx            font, metadata
  page.jsx              landing
  globals.css           thiết kế giấy–mực–đồng cho landing
  studio/page.jsx       phòng học (import Cloudscape + global styles)
  studio/studio.css     lớp phủ nhỏ: thanh c, v, m
src/
  content/course.js     nguồn nội dung duy nhất: chương, khái niệm, flashcard, quiz, FAQ
  lib/metrics.js        computeSurplus, chapterStatus + test
  components/site/      LandingPage
  components/studio/    StudioApp, theme.js (applyTheme token)
```

## Chạy

Cần Node.js 22.12 trở lên (hoặc 24 trở lên) để chạy cả bộ test.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest: công thức, dữ liệu, render landing
npm run build && npm start
```

## Deploy

Import repo vào Vercel, Framework Preset **Next.js**, Root Directory `./`, không cần biến môi trường.
