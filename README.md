# Bóc giá — một món hàng, ai lấy phần nào?

Sản phẩm web cho môn **MLN122 – Kinh tế chính trị Mác – Lênin** (Đại học FPT). Người học chia giá
bán của một món quen thành bảy khoản (nguyên liệu, máy móc, mặt bằng, công lao động, thương hiệu,
lợi nhuận, thuế phí), rồi mới mở phần đối chiếu, gộp thành **c – v – m** và tự tính **m′** theo đúng
cách chia của mình.

Điểm cốt lõi: **không có cách chia đúng**. Sản phẩm chỉ đặt cách chia của người học cạnh một khoảng
tham chiếu minh hoạ, rồi hỏi ai chịu chi phí.

## Chạy thử

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # 66 test
npm run build
```

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Giới thiệu, ba bước, ba món, phần "con số lấy từ đâu" |
| `/boc/tra-sua` | Ly trà sữa 45.000đ |
| `/boc/ao-thun` | Áo thun có thương hiệu 250.000đ |
| `/boc/suat-an` | Suất ăn đặt qua ứng dụng 35.000đ |
| `/kien-thuc` | Tám phạm trù: trích dẫn, nói lại, đúc kết, ứng dụng vào cả ba món; mục nguồn và giới hạn |
| `/luyen` | Ba chế độ luyện: thẻ ghi nhớ, ghép cặp, trắc nghiệm |

Tất cả là trang tĩnh, không backend, không tài khoản.

## Một lần bóc gồm những gì

1. **Chia giá bán** — bảy khoản, cộng đủ 100%, mỗi khoản có bốn nút −5 / −1 / +1 / +5 và hiện cả
   phần trăm lẫn số tiền.
2. **Mở phần thật** — bảng lệch so với khoảng tham chiếu, bốn nhóm `c`, `v`, `m`, khoản ngoài, và
   `m′ = m / v × 100%` tính từ chính cách chia của người học (nếu `v = 0` thì báo rõ là không tính được).
3. **Ai lấy phần thặng dư** — bốn người trong cùng một món, mỗi người nhận một phần và chịu một
   loại rủi ro; kèm câu hỏi "nếu phải cắt 5% để giữ giá, bạn cắt ở đâu?" và hệ quả cho người chịu.
4. **Một dòng của bạn** — trả lời ngắn ≥ 80 ký tự.
5. **Kiến thức dùng ở đây** — bốn phạm trù liên quan, mỗi phạm trù có trích dẫn kèm nguồn, phần nói
   lại bằng lời thường, đúc kết và ứng dụng vào chính món đó.

**Điều kiện hoàn thành:** đủ 100% + đã mở phần thật + đã xem chuỗi giá trị + đã chọn chỗ cắt 5% +
đã viết ≥ 80 ký tự. Tiến độ lưu ở `localStorage` với khoá `boc-gia:v1`.


## Phần luyện (`/luyen`)

Ba chế độ, tất cả đều lấy nội dung từ chính tám phạm trù và số liệu ba món — không có ngân hàng câu
hỏi riêng, nên không có gì để học thuộc lòng:

- **Thẻ ghi nhớ** — 8 thẻ, mỗi thẻ một phạm trù. Mặt trước chỉ có tên phạm trù; mặt sau mở ra trích
  dẫn, phần nói lại, đúc kết và ứng dụng vào một món. Tự đánh giá bốn mức (Quên / Mơ hồ / Nhớ /
  Chắc), lịch ôn giãn theo kiểu SM-2 rút gọn: khoảng nghỉ nhân với hệ số dễ, "Quên" đưa thẻ về ngay
  hôm nay và giảm hệ số, "Chắc" giãn ra và tăng hệ số.
- **Ghép cặp** — 6 cặp mỗi lượt, ghép tên phạm trù với một dòng ứng dụng cụ thể trong một món; bốn
  lượt phủ hết 24 cặp. Chọn sai thì đếm lần sai, không phạt điểm.
- **Trắc nghiệm** — 12 câu sinh trực tiếp từ dữ liệu: khoản nào là `v`, khoản nào là `c`, khoản nào
  lớn nhất theo khoảng tham chiếu, `m′` của khoảng tham chiếu xấp xỉ bao nhiêu. Mỗi phương án có một
  dòng giải thích vì sao đúng hoặc sai.

Điểm kinh nghiệm (10đ/câu đúng, 5đ/thẻ, 3đ/cặp, 20đ/kết thúc lượt), cấp (mỗi 100đ), chuỗi ngày học
và kỷ lục cá nhân lưu ở `localStorage` với khoá `boc-gia:game:v1`. Không tài khoản, không gửi dữ
liệu đi đâu, không quy đổi thành điểm môn học.

## Kiến thức

Tám phạm trù: hàng hoá và hai thuộc tính; giá trị hàng hoá; chi phí sản xuất `c + v`; tư bản bất
biến và khả biến; giá trị thặng dư; tỷ suất giá trị thặng dư; cạnh tranh và độc quyền; quan hệ lợi
ích kinh tế.

Nội dung **không đánh số chương** (theo yêu cầu): mỗi phạm trù đứng độc lập, xếp theo mạch lập luận.
Mỗi mục có bốn phần: trích dẫn, nói lại bằng lời thường, đúc kết, ứng dụng vào ba món. Số trang của
trích dẫn chưa đối chiếu bản in nên giao diện ghi rõ "số trang cần đối chiếu bản in".

## Hướng thiết kế

Ngôn ngữ **hoá đơn**: mặt bàn kraft `#e6e2d8`, tờ giấy `#fffdf7`, mực `#1a1a17`, mực xanh cho sức
lao động `#1f4f8b`, mực đỏ cho phần thặng dư `#a8382c`. Đường kẻ nét đứt chia các khối như một tờ
hoá đơn in nhiệt; chữ số dùng Barlow Condensed với `tabular-nums`, nội dung dùng Be Vietnam Pro.

Một chuyển động duy nhất: khối "Phần thật" trượt ra khi mở khoá (260 ms, tắt khi
`prefers-reduced-motion`). Thanh tiền đổi màu theo nhóm **chỉ sau khi** mở kết quả — trước đó mọi
đoạn cùng một màu để không lộ đáp án.

## Kiểm thử

`npm test` chạy 66 test trong 7 tệp:

- `src/lib/split.test.js` — cộng dồn không vượt 100%, gộp `c/v/m`, `m′` (kể cả trường hợp `v = 0`),
  khoảng tham chiếu, điều kiện hoàn thành, đọc lại dữ liệu cũ/hỏng, định dạng tiền.
- `src/content/items.test.js` — ba món × bảy khoản, trung điểm tham chiếu cộng đúng 100%, chuỗi bốn
  mắt, ba lựa chọn cắt 5%; tám phạm trù có trích dẫn và ứng dụng đủ ba món; **chặn số chương và
  chặn chữ "đáp án đúng"** trong nội dung.
- `src/components/receipt/receipt.test.jsx` — luồng thật: tăng phần trăm, chặn ở 100%, nút mở phần
  thật bị khoá khi chưa đủ, mở ra thấy `m′`, lưu localStorage, phần kiến thức có trích dẫn.
- `src/lib/game.test.js` — chuỗi ngày (nối tiếp / đứt / cùng ngày), khoảng nghỉ thẻ theo bốn mức tự
  đánh giá, danh sách thẻ đến hạn, đọc lại dữ liệu cũ và dữ liệu hỏng, kỷ lục.
- `src/lib/quiz.test.js` — mỗi câu đúng một đáp án trong bốn phương án, câu về `v`/`c`/khoản lớn
  nhất/`m′` khớp số liệu, sinh câu hỏi tất định, bốn lượt ghép phủ hết 24 cặp.
- `src/lib/classnames.test.js` — **canh gác tên lớp CSS**: lớp đặt kích thước cố định (`width` +
  `height` px) không được dùng ở hai tệp khác nhau, ba giai đoạn trang chủ dùng hệ tên `stage*` riêng,
  nút tăng/giảm chỉ dùng `bump`. Thêm sau lỗi bản deploy: `.step` từng vừa là nút 40×40 px vừa là thẻ
  giai đoạn, làm thẻ bị bóp còn 40 px và chữ chồng lên nhau.

## Cấu trúc

```
app/
  page.jsx                     trang chủ
  layout.jsx                   khung, chữ, metadata
  globals.css                  toàn bộ hệ thống thiết kế
  boc/[id]/page.jsx            trang một món (SSG theo id)
  kien-thuc/page.jsx           phần kiến thức và nguồn
  luyen/page.jsx               ba chế độ luyện
src/
  content/items.js             ba món: khoản, tham chiếu, chuỗi, lựa chọn cắt 5%
  content/concepts.js          tám phạm trù: trích dẫn, đúc kết, ứng dụng
  lib/split.js                 mô hình cách chia (hàm thuần)
  lib/useSplit.js              đọc/ghi localStorage
  lib/game.js                  điểm kinh nghiệm, chuỗi ngày, lịch ôn thẻ (hàm thuần)
  lib/useGame.js               đọc/ghi tiến độ luyện trong localStorage
  lib/quiz.js                  sinh câu hỏi và lượt ghép từ dữ liệu ba món
  components/receipt/…         tờ hoá đơn, thanh tiền, từng khoản, danh sách món
  components/practice/…        dải tiến độ, thẻ ghi nhớ, ghép cặp, trắc nghiệm
docs/
  de-cuong-san-pham.md         thuyết minh, phân việc, kịch bản demo
  NGUON-VA-GIOI-HAN.md         nguồn từng phần và những gì chưa kiểm chứng
```

## Dùng lại từ bản trước

Giữ: cấu hình Next.js và vitest, hai họ chữ OFL qua `@fontsource`, cách đặt tài liệu trong `docs/`,
và nguyên tắc "không bấm là xong" (ở đây là năm điều kiện hoàn thành). Bỏ toàn bộ nội dung sản phẩm
cũ (kịch bản quyết định, hai mốc lịch sử, hồ sơ in ấn) vì sản phẩm này không dùng.

## Giới hạn

Khoảng tham chiếu là ước lượng minh hoạ; trích dẫn giáo trình chưa đối chiếu số trang; nội dung chưa
được giảng viên thẩm định; chưa kiểm thử với người dùng thật. Bố cục màn hẹp được soát bằng quy tắc
CSS và canh gác tên lớp chứ chưa chụp ảnh trên máy thật; lịch ôn thẻ và điểm kinh nghiệm nằm trên máy
người học nên xoá dữ liệu trình duyệt là mất.
Chi tiết ở [`docs/NGUON-VA-GIOI-HAN.md`](docs/NGUON-VA-GIOI-HAN.md).
