# Chọn đường — một quyết định, nhiều góc nhìn

Sản phẩm web cho môn **MLN122 – Kinh tế chính trị Mác – Lênin** (Đại học FPT). Người học đọc hai
mốc lịch sử kinh tế Việt Nam, rồi ngồi vào ghế người phải quyết định trong hai kịch bản thực tiễn:
mở hệ quả của ba phương án, chọn một, xem cùng quyết định đó từ ba phía và viết phản biện bằng
phạm trù của môn học.

Điểm cốt lõi: **không có phương án nào là đáp án đúng**. Sản phẩm không chấm điểm lựa chọn, chỉ
ghi lại lựa chọn và phần lập luận.

## Chạy thử

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # 34 test
npm run build
```

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Giới thiệu sản phẩm, ba chặng, hai mốc, hai kịch bản |
| `/lich-su` | Hai mốc lịch sử kinh tế (1986, 2007): 3 con số, 1 mâu thuẫn, 2 phạm trù MLN122 mỗi mốc |
| `/kich-ban` | Danh sách hai kịch bản kèm trạng thái tiến độ |
| `/kich-ban/[id]` | Năm bước: bối cảnh → phương án → ba góc nhìn → góc phân tích → phản biện |
| `/ho-so` | Hồ sơ học tập: phương án đã ghi, ba trục hệ quả, phản biện, huy hiệu, nguồn và giới hạn; in được A4 |

Tất cả là trang tĩnh, không backend, không tài khoản.

## Hai kịch bản

1. **HS-01 · AI thay đổi dây chuyền** — nhà máy may 1.200 công nhân, công nghệ kiểm lỗi thay 60%
   khâu kiểm bằng mắt. Chương 3 và 6.
2. **HS-02 · Nền tảng tăng phí hoa hồng** — ứng dụng giao đồ ăn giữ 72% thị phần muốn tăng phí từ
   20% lên 28%. Chương 4 và 5.

Mỗi phương án có: hệ quả trên ba trục (kinh tế / an sinh / bền vững), dòng thời gian, người trả chi
phí, ba góc nhìn khác nhau và hai phạm trù MLN122 kèm chương.

## Quy tắc tiến độ

Lưu trong `localStorage` với khoá `chon-duong:progress:v1`. Một kịch bản chỉ tính **hoàn thành**
khi đã: đọc bối cảnh, chọn phương án, xem đủ **ba** góc nhìn của phương án đó, đọc góc phân tích và
viết phản biện từ 80 ký tự. Đổi phương án sẽ đặt lại các góc nhìn đã xem, vì hệ quả khác nhau theo
từng phương án.

Huy hiệu trao theo hành vi, không theo lựa chọn: *Người đọc lịch sử*, *Đã xem cả ba phía*,
*Người phản biện*, *Tư duy hệ thống*.

## Hướng thiết kế

Ngôn ngữ **hồ sơ giấy**: bàn lạnh `#e9ece6`, tờ giấy `#fdfdf8`, mực `#141b17`, đường kẻ `#c9d1cb`,
dấu đỏ `#a5212a`, vàng nháp `#d8c25c`. Hai họ chữ: Barlow Condensed cho số/năm/tiêu đề, Be Vietnam
Pro cho nội dung. Con dấu đỏ là khoảnh khắc chuyển động duy nhất — nó chỉ hiện khi một quyết định
thực sự được ghi vào hồ sơ; có `prefers-reduced-motion` để tắt hiệu ứng.

Bảng hệ quả dùng chữ, không dùng điểm số và không dùng biểu đồ, để không biến quyết định thành
bài trắc nghiệm.

## Kiểm thử

`npm test` chạy 34 test trong 5 tệp:

- `src/lib/progress.test.js` — quy tắc hoàn thành, đổi phương án, huy hiệu, đọc lại dữ liệu cũ/hỏng.
- `src/content/content.test.js` — tính toàn vẹn nội dung: 2 kịch bản × 3 phương án × 3 góc nhìn,
  mọi phạm trù trỏ về chương có thật, không phương án nào bị đánh dấu đúng.
- `src/components/dossier/dossier.test.jsx` — hồ sơ trống/đã có dữ liệu, phần giới hạn.
- `src/components/scenarios/ledger.test.jsx` — bảng hệ quả và danh sách kịch bản.
- `src/components/scenarios/scenario-app.test.jsx` — luồng thật: chọn phương án, lưu localStorage,
  mở đủ ba góc nhìn mới sang được bước phân tích.

Kiểm tra bằng `curl` trên HTML server: `/` 200, `/lich-su` 200, `/kich-ban` 200, hai trang kịch bản
200, `/ho-so` 200, đường dẫn sai trả 404.

## Cấu trúc

```
app/
  page.jsx                     trang chủ
  layout.jsx                   khung, chữ, metadata
  globals.css                  toàn bộ hệ thống thiết kế
  lich-su/page.jsx             phần mở đầu
  kich-ban/page.jsx            danh sách kịch bản
  kich-ban/[id]/page.jsx       trang kịch bản (SSG theo id)
  ho-so/page.jsx               hồ sơ + bản in
src/
  content/chapters.js          sáu chương MLN122
  content/prologue.js          hai mốc lịch sử
  content/scenarios.js         hai kịch bản, ba phương án mỗi kịch bản
  lib/progress.js              mô hình tiến độ (hàm thuần)
  lib/useProgress.js           đọc/ghi localStorage
  components/…                 khung trang, con dấu, bảng hệ quả, kịch bản, hồ sơ
docs/
  de-cuong-san-pham.md         thuyết minh sản phẩm, phân việc, kịch bản demo
  NGUON-VA-GIOI-HAN.md         nguồn từng con số và những gì chưa kiểm chứng
```

## Đã dùng lại gì từ bản trước

Bản trước của repo (Sạp 122 — sáu chương dưới dạng bảng giá, phòng học tương tác) đã được thay thế.
Giữ lại: cấu hình Next.js và vitest, hai họ chữ OFL qua `@fontsource`, nút in `PrintButton`, cách
đặt tài liệu trong `docs/`, và nguyên tắc tiến độ "không bấm là xong" (trước đây là lộ trình ba
bước, nay là năm bước có điều kiện). Không giữ phần nội dung sáu chương, bảng tính giá trị thặng dư
và trang `?chuong=` vì sản phẩm mới không cần.

## Giới hạn

Số liệu hai mốc còn là bản nháp; kịch bản là hư cấu; nội dung chưa được giảng viên thẩm định; chưa
kiểm thử với người dùng thật và chưa kiểm tra trên máy thật ở 375 px. Chi tiết ở
[`docs/NGUON-VA-GIOI-HAN.md`](docs/NGUON-VA-GIOI-HAN.md).
