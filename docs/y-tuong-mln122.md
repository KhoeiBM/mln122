# Sạp 122 — web app truyền bá môn MLN122 (Đại học FPT)

Tài liệu này ghi lại hai skill đã đọc, chẩn đoán vấn đề, năm ý tưởng, hướng thiết kế được chọn, kiến
trúc kỹ thuật và lộ trình. Bản chạy thử nằm trong repo: `/` (trang chủ) và `/studio` (phòng học).

---

## 0. Ghi chú về mã môn

Trong chương trình FPT, **MLN122 là Kinh tế chính trị Mác – Lênin (3 tín chỉ)**. Tư tưởng Hồ Chí Minh
là HCM202, Triết học là MLN111, CNXH khoa học là MLN131. Toàn bộ nội dung ở đây bám theo sáu chương
của giáo trình Kinh tế chính trị Mác – Lênin.

---

## 1. Hai skill đã đọc

### 1.1. MengToFrontend — bộ lọc chất lượng trước khi launch

Repo `Kappaemme-git/MengToFrontend` là một **skill cho agent**, không phải thư viện UI: checklist audit
landing page trước khi công khai.

| Nhóm kiểm tra | Điều đáng chú ý |
| --- | --- |
| Typography | Kiểm `letter-spacing` ở tiêu đề, nhãn, nút, chữ in hoa; không kéo âm tracking cho body; thử hai hướng font; ít weight nhưng phân cấp rõ |
| Real references | Ưu tiên ảnh sản phẩm, địa điểm, người thật; ảnh AI chỉ là bản nháp, không thay thế bằng chứng |
| Image refinement | Soi tay, mặt, chữ trong ảnh, hướng sáng, bóng đổ; cắt ảnh có chủ đích; giữ một phong cách ảnh |
| Prompt quality | Prompt phải nêu chủ thể thật, người xem, chất liệu, ánh sáng, vai trò của ảnh trong trang |
| Human touch | Một hai chi tiết gắn với sản phẩm; micro-interaction chỉ để làm rõ trạng thái |
| Mobile | Kiểm riêng ở cỡ nhỏ, vì đó là nơi trang hay "sập" |

Điểm dùng nhiều nhất: **AI tạo được bản nháp, nhưng trang dùng được thì cần phán đoán typography,
tham chiếu thật và một hai chi tiết do người làm.**

### 1.2. Claude frontend-design — vai trò design lead

`anthropics/skills → skills/frontend-design` (Apache-2.0) là skill thiết kế frontend chính thức của
Anthropic. Nó không cung cấp component; nó đặt ra cách ra quyết định:

- **Bám vào chủ thể**: chất liệu, ngành, tiếng nói của chủ thể mới sinh ra lựa chọn đặc thù. Một trang
  cho trẻ 8–11 tuổi phải khác hẳn dashboard cho nhà phân tích tài chính.
- **Một chữ ký**: "spend your boldness in one place" — để một thứ đáng nhớ, xung quanh giữ im lặng.
  Nhắc lại lời Chanel: soi gương và bỏ đi một phụ kiện.
- **Tránh các mặc định về typography**: không nhấn một từ trong tiêu đề bằng italic/màu, không dùng
  in hoa cho nhãn, không thêm nhãn nhỏ vô nghĩa phía trên nội dung.
- **Cấu trúc là thông tin**: đánh số 01/02/03 chỉ dùng khi nội dung thật sự là một trình tự.
- **Motion**: chỉ dùng khi trả lời hành động của người dùng; hiệu ứng fade-and-slide cho mọi section
  là dấu hiệu của trang do AI dựng.
- **Năm "look" AI hay rơi vào**, trong đó có: nền kem ấm + serif tương phản cao + điểm nhấn đất nung;
  nền gần đen + một điểm axit; layout báo giấy với đường kẻ tóc; bộ thẻ SaaS giống nhau; và **bộ khung
  template** gồm nhãn in hoa giãn chữ, chuỗi meta nối bằng dấu chấm giữa, nhãn "WORD — fragment", chữ
  mono cho số liệu nhỏ, mũi tên "→" dán sau nút.
- **Quy trình hai lượt**: lập kế hoạch token (màu, chữ, layout, nguyên tắc) → tự phản biện xem kế hoạch
  có phải mặc định không → mới viết code.

### 1.3. Về chữ "cloud design"

Bản đầu mình hiểu "cloud design" là **Cloudscape Design System của AWS** và đã dựng `/studio` bằng bộ
component đó. Sau khi bạn nói rõ là **skill thiết kế của Claude**, mình đã bỏ Cloudscape: giao diện
console của AWS xung đột với ngôn ngữ thị giác của trang và kéo theo hơn 100 KB component không cần
thiết. Phòng học hiện dùng component tự viết, cùng hệ token với trang chủ.

---

## 2. Chẩn đoán: vì sao môn này khó "truyền bá"?

1. **Học để qua môn, không học để hiểu.** Tài liệu trôi nổi chủ yếu là đề cương và trắc nghiệm không
   giải thích, nên học thuộc rồi quên.
2. **Phạm trù trừu tượng, ví dụ trong giáo trình xa đời sống.** "Giá trị thặng dư", "tư bản bất biến"
   không có điểm bám vào trải nghiệm hằng ngày.
3. **Không có trạng thái học.** Sinh viên không biết mình đang ở đâu trong sáu chương.
4. **Nội dung lý luận, nhạy cảm.** Trang phải nói rõ đây là bản tóm tắt tự học, không phát ngôn thay
   giảng viên.

Tiêu chí cho ý tưởng: **một vật thật để bám vào, một trạng thái nhìn thấy được, một lý do để quay lại.**

---

## 3. Năm ý tưởng

### A. Sạp 122 — lớp ghi chú bấm được, có bảng điều khiển

Sáu chương gắn với hoá đơn, xe shipper, phiên livestream. Có bảng tính giá trị thặng dư, thẻ ghi nhớ,
trắc nghiệm có giải thích, tiến độ lưu trên máy.

- Mạnh: đúng "vật thật để bám vào", có trạng thái, làm được nhanh.
- Yếu: nội dung phải chuẩn; nếu chỉ có một chương thì không đủ để gọi là truyền bá.

### B. Chợ tư tưởng — game mô phỏng thị trường

Sinh viên mở quán, chọn giá, chọn lương, thuê người; hệ thống hỏi vì sao lợi nhuận tăng mà thặng dư
không tăng.

- Mạnh: dạy quan hệ nhân quả, engagement cao.
- Yếu: cần cân bằng số liệu, dễ trượt thành game quản lý quán; công sức gấp ba bốn lần.

### C. Hộ chiếu sáu chương — micro-learning 5 phút mỗi ngày

Mỗi ngày một thẻ: một phạm trù, một ví dụ, một câu hỏi, có đóng dấu theo chương.

- Mạnh: hợp điện thoại, dễ lan trong lớp.
- Yếu: cần 30+ ngày nội dung; dễ tạo cảm giác học mà không hiểu.

### D. 60 giây MLN122 — thư viện video ngắn

Kịch bản 60 giây mỗi phạm trù, phát trên TikTok/Reels, web là nơi tra cứu và tải transcript.

- Mạnh: đúng kênh sinh viên đang dùng.
- Yếu: cần quay dựng và giảng viên duyệt; web dễ thành phụ lục.

### E. Bản đồ khái niệm — knowledge graph kéo thả

Nối các phạm trù thành mạng, sai thì giải thích.

- Mạnh: dạy được cấu trúc, khác đề cương.
- Yếu: dễ đẹp mà khó dùng.

| Ý tưởng | Tác động | Công sức | Rủi ro nội dung | Làm được ngay |
| --- | --- | --- | --- | --- |
| A. Sạp 122 | Cao | Vừa | Vừa | Có |
| B. Chợ tư tưởng | Cao | Cao | Cao | Không |
| C. Hộ chiếu sáu chương | Vừa | Thấp | Thấp | Có |
| D. Video 60 giây | Cao | Cao | Cao | Không |
| E. Bản đồ khái niệm | Vừa | Vừa | Vừa | Một phần |

**Chọn A làm xương sống**, lấy một phần E (bảng khái niệm, liên kết chương) và một phần C (gợi ý việc
tiếp theo). B và D để giai đoạn sau.

---

## 4. Hướng thiết kế: "bảng giá"

### 4.1. Chủ thể và người xem

- **Chủ thể**: Kinh tế chính trị Mác – Lênin, môn đại cương 3 tín chỉ ở FPT. Chất liệu của môn này là
  bảng biểu, công thức c/v/m, hoá đơn, sổ sách, giá cả ngoài chợ.
- **Người xem**: sinh viên 18–21 tuổi, mở trang trên điện thoại giữa hai tiết học.
- **Việc chính của trang**: biến phạm trù thành thứ nhìn thấy được, và cho họ một chỗ để ôn.

### 4.2. Kế hoạch token

**Màu** (nền giấy lạnh, không kem; điểm nhấn đỏ của bảng giá và vàng của nhãn):

| Tên | Hex | Vai trò |
| --- | --- | --- |
| field | `#EFF2EE` | nền trang |
| paper | `#FFFFFF` | mặt bảng, thẻ |
| ink | `#0F1512` | chữ, đường kẻ chính |
| red | `#C41E2A` | số chương, hành động chính, đường kẻ nhấn |
| yellow | `#F7CE45` | nhãn giá cho `m`, vùng thặng dư |
| board | `#0E2B23` | dải kết, phần "bảng" tối |

**Chữ**: hai family, khác nhau rõ rệt.

- `Barlow Condensed` 600/700 — tiêu đề, số liệu, giá. Condensed vì bảng giá ngoài chợ luôn chật chữ và
  số phải thẳng cột; font có tabular numerals.
- `Be Vietnam Pro` 400/500/600 — nội dung, nhãn, nút. Đây là font của một foundry Việt Nam, dấu tiếng
  Việt đúng ở cỡ nhỏ.

Không dùng quá ba weight cho mỗi family, không dùng serif, không dùng mono.

**Layout**: lệch trái, lưới 12 cột, mật độ dày ở phần dữ liệu và thoáng ở phần đọc.

```
┌───────────────────────────────────────────────────────────┐
│ SẠP 122            Sáu chương  Cách học  Bảng tính  [vào] │
├───────────────────────────────────────────────────────────┤
│ Một ly trà sữa cũng          ┌──────────────────────────┐ │
│ có giá trị thặng dư.         │ BẢNG GIÁ MỘT LY TRÀ SỮA  │ │
│                              ├──────────────────────────┤ │
│ Sạp 122 viết lại sáu         │ Trà sữa size L   45.000  │ │
│ chương quanh những thứ       ├──────────────────────────┤ │
│ bạn gặp mỗi ngày...          │ c  Nguyên liệu   18.000  │ │
│                              │ v  Tiền công      9.000  │ │
│ [Vào phòng học] [Sáu chương] │ m  Thặng dư      18.000  │ │
│                              │            m′    200%    │ │
│ 6 chương  3 tín chỉ  14 câu  └──────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

Studio: thanh dọc 236px bên trái (danh sách sáu chương như mục lục sổ), phần nội dung rộng, các khối
được đóng khung 1px như bảng kê.

**Nguyên tắc**

1. Một chữ ký duy nhất: **bảng giá**. Mọi thứ khác phải im.
2. Số liệu luôn tabular và luôn thẳng cột — đó là chất liệu của môn học.
3. Cấu trúc chỉ xuất hiện khi nó mang thông tin: đánh số chương vì chương là trình tự.
4. Không dùng chuyển động tự chạy; chỉ chuyển động khi người dùng kéo, chọn, mở.
5. Chữ là nội dung thiết kế: nút ghi việc nó làm, lỗi nói rõ chuyện gì xảy ra.

### 4.3. Tự phản biện: bản nháp đầu đã mắc gì

Bản đầu (nền kem, serif Lora, điểm nhấn đồng, nhãn in hoa, meta nối bằng dấu chấm giữa, mono cho số
nhỏ, mũi tên sau nút) rơi đúng vào look số 1 và bộ khung template mà skill liệt kê. Bảng dưới là những
gì đã sửa và vì sao:

| Dấu hiệu mặc định | Đã xử lý |
| --- | --- |
| Nền kem `#F7F4EC` + serif tương phản cao + điểm nhấn đồng `#9C6F16` | Đổi sang nền giấy lạnh `#EFF2EE`, bỏ serif, điểm nhấn là đỏ bảng giá `#C41E2A` và vàng nhãn `#F7CE45` |
| Nhãn in hoa giãn chữ trên mọi tiêu đề | Bỏ; chỉ còn ở đầu bảng giá và đầu khối dữ liệu, nơi nó thuộc về chất liệu |
| Chuỗi meta nối bằng dấu chấm giữa ("6 chương · 3 tín chỉ") | Tách thành các mục riêng, hoặc dùng dấu phẩy và câu đầy đủ |
| Mono cho số liệu nhỏ | Bỏ mono, dùng condensed có tabular numerals |
| Mũi tên "→" sau nút | Bỏ; nút chỉ còn động từ |
| Nhấn một từ trong tiêu đề bằng italic + màu | Bỏ; tiêu đề là một câu nói bình thường |
| Đánh số 01/02/03 cho ba tính năng (không phải trình tự) | Bỏ số; ba tính năng thành ba đoạn văn có tiêu đề |
| Hai hệ giao diện (landing tự viết, app Cloudscape) | Bỏ Cloudscape, viết lại phòng học bằng cùng token |

Giữ lại: bảng giá làm chữ ký, ảnh tư liệu thật (có chú thích nguồn), bảng tính kéo được, thẻ ghi nhớ,
câu hỏi có giải thích ngay.

### 4.4. Chữ ký và copy

- Chữ ký: **bảng giá**. Ở trang chủ là hoá đơn một ly trà sữa chia `c`, `v`, `m`; ở phòng học là bảng
  tính bốn thanh trượt trả về `c`, `v`, `m`, `m′`.
- Tiêu đề trang chủ: "Một ly trà sữa cũng có giá trị thặng dư." Câu này làm đúng một việc: nói vì sao
  phải đọc tiếp.
- Nút ghi việc nó làm: "Vào phòng học", "Xem sáu chương", "Mở chương 03", "Đánh dấu đã học".
- Lỗi và trạng thái rỗng nói rõ chuyện gì xảy ra: "Chưa có câu nào", "Giá bán thấp hơn chi phí nên
  không có phần dôi ra. Quán đang lỗ."

### 4.5. Kiến trúc thông tin

```
/                     Trang chủ (bảng giá, sáu chương, cách học, bảng tính, hỏi nhanh)
/de-cuong             Bản in một trang A4: công thức, ý chính, khái niệm của sáu chương
/studio               Phòng học
  ├─ Bảng điều khiển  tiến độ, việc tiếp theo, bản đồ sáu chương
  ├─ Chương 01…06     lộ trình ba bước: hiểu ý chính → xem ví dụ → tự kiểm tra
  ├─ Trắc nghiệm      14 câu, giải thích ngay, lưu điểm cao nhất
  ├─ Sổ tay           12 thẻ, lọc theo chương
  └─ Bảng tính        bốn thanh trượt → c, v, m, m′
```

---

## 5. Kiến trúc kỹ thuật

- **Next.js 16 App Router, React 19, JavaScript (JSX)**. Không TypeScript để giữ tốc độ.
- **Không thư viện UI**: toàn bộ component tự viết, khoảng 1.200 dòng JSX và 1.100 dòng CSS, dùng chung
  một bộ token trong `app/globals.css`.
- **Hai font, tải qua npm** (`@fontsource`): Barlow Condensed và Be Vietnam Pro, có subset tiếng Việt.
- **Nội dung tách khỏi UI**: `src/content/course.js` là nguồn duy nhất (6 chương, 27 khái niệm, 12 thẻ,
  14 câu hỏi, 4 FAQ). Thêm chương chỉ cần sửa một file.
- **Tính toán tách khỏi UI**: `src/lib/metrics.js` (`computeSurplus`, `chapterStatus`, `readCount`).
- **Tiến độ**: `localStorage` khóa `sap122:progress:v1`, không backend, không tài khoản. Mô hình dữ
  liệu tách ba bước của từng chương (`hieu`, `vi-du`, `tu-kiem-tra`) và điểm luyện tổng; **chỉ tính
  hoàn thành khi đã qua đủ ba bước và đã xem kết quả tự kiểm tra** — mở trang không tính là học xong.
  Dữ liệu cũ chỉ có `read` được chuyển tự động sang bước một.
- **Tiếp cận**: radio thật, `fieldset`/`legend`, `aria-live` cho phản hồi, `role="progressbar"` cho
  thanh tiến độ, `aria-current` cho mục đang mở, focus ring đỏ 2px, tôn trọng `prefers-reduced-motion`.
- **Test**: Vitest + Testing Library, 11 test (công thức, tiến độ ba bước, migrate dữ liệu cũ, dữ liệu môn học, render trang chủ).
- **Deploy**: Vercel, không biến môi trường.

---

## 6. Lộ trình

**Giai đoạn 1 (đã có)** — trang chủ, phòng học sáu chương, bảng tính, trắc nghiệm, sổ tay, lưu tiến độ.

**Giai đoạn 2 — chiều sâu nội dung**
- Câu hỏi tình huống cho chương 3 và 5 (case ngắn, chọn hướng xử lý).
- "Đề cương ngược": nhập chương sẽ thi, hệ thống xếp lịch ôn bảy ngày.
- Xuất ghi chú PDF để mang đi học nhóm.

**Giai đoạn 3 — lớp cộng đồng**
- Đăng nhập Google, đồng bộ tiến độ, bảng xếp hạng theo lớp.
- Giảng viên ghim câu hỏi, sinh viên gửi câu hỏi hay thành bộ luyện.
- Nhúng video 60 giây (ý tưởng D) vào từng chương.

**Chỉ số nên đo**: tỉ lệ hoàn thành sáu chương, tỉ lệ quay lại trong 7 ngày, số câu luyện mỗi lượt,
tỉ lệ đúng theo chương, số lượt dùng bảng tính.

---

## 7. Rủi ro

| Rủi ro | Cách xử lý |
| --- | --- |
| Sai nội dung lý luận | Ghi rõ là bản tóm tắt; cần giảng viên duyệt trước khi công khai; không thêm quan điểm ngoài giáo trình |
| Nhạy cảm chính trị | Chỉ diễn giải nội dung giáo trình; không bình luận thời sự; không dùng hình lãnh đạo làm trang trí |
| Bản quyền ảnh | Ảnh hiện tại là ảnh tư liệu cho demo; trước khi công khai cần thay bằng ảnh có giấy phép rõ hoặc ảnh tự chụp |
| "Học cho có streak" | Không dùng streak; thay bằng "việc tiếp theo" và giải thích ngay sau mỗi câu |
| Nội dung lệch khi môn đổi giáo trình | Nội dung nằm trong một file dữ liệu, sửa một chỗ |

---

## 8. Tự audit theo format của MengToFrontend

```text
Launch readiness: Needs polish (nội dung cần giảng viên duyệt trước khi công khai)

Top fixes:
1. Ảnh sạp hàng chưa rõ giấy phép - thay bằng ảnh tự chụp hoặc CC0, giữ chú thích nguồn.
2. Chưa kiểm tra bằng ảnh chụp ở 375px - cần chụp ba màn hình mobile trước khi launch.
3. Bảng tính chưa có dạng nhập số trực tiếp - hiện chỉ kéo thanh trượt, chưa gõ được giá trị chính xác.

Checklist:
- Typography and letter spacing: pass - condensed cho số, Be Vietnam Pro cho chữ; nhãn in hoa chỉ còn ở đầu bảng dữ liệu; body không kéo âm tracking.
- Real references and imagery: needs polish - ảnh thật, có chú thích, nhưng giấy phép chưa xác nhận.
- Image refinement: pass - một phong cách ảnh tư liệu, không trộn minh hoạ AI.
- Prompt/design specificity: pass - bảng giá, thanh trượt, con số tabular đều lấy từ chất liệu của môn học.
- Human touch and micro-interactions: pass - kéo thanh trượt đổi số ngay, thẻ mở đáp án, phản hồi đúng sai, focus ring.
- Mobile visual quality: needs polish - breakpoint 980/900/720/640px đã viết nhưng chưa có ảnh chụp xác nhận.
```

---

## 9. Chạy

```bash
npm install
npm run dev     # http://localhost:3000 và /studio
npm test        # 11 test
npm run build
```

---

## 10. Tham khảo `tuananh220/mln131` — đã lấy gì, đã bỏ gì

Repo tham khảo là một **bảo tàng 3D điện ảnh** cho môn MLN131 (Chủ nghĩa xã hội khoa học): bảy phòng
tương ứng bảy chương, mỗi phòng có hai trạm (nội dung và tư liệu), camera dolly giữa các phòng, hiện
vật dựng bằng Three.js, kèm bốn tài liệu nguồn và kiểm thử rất chi tiết.

### Đã lấy

| Ý tưởng | Cách áp vào Sạp 122 |
| --- | --- |
| **Lộ trình ba bước**: Hiểu ý chính → Xem ví dụ → Tự kiểm tra | Mỗi chương trong `/studio` giờ có ba bước, bấm chuyển được, có đánh dấu bước nào xong |
| **Quy tắc hoàn thành chặt**: tách `visited` khỏi `lessonStages` và `completed`; "không tính tải player là học xong"; chỉ ghi hoàn thành sau khi qua đủ ba bước và xem kết quả | Bỏ nút "đánh dấu đã học" một phát. Chương chỉ hoàn thành khi có đủ `hieu`, `vi-du` và điểm `tu-kiem-tra`; dữ liệu cũ được migrate |
| **Dock điều hướng trên mobile** thay cho thanh bên | Dưới 900px ẩn thanh bên, hiện dock bốn mục ở đáy; thêm ô "Chuyển chương" trong đầu trang |
| **Nút cao tối thiểu 44px** | `.btn` 44px, `.btn-sm` 38px và tự nâng lên 44px khi `pointer: coarse`; dock 54px |
| **Văn hoá ghi nguồn**: MEDIA-CREDITS, VIDEO-SOURCES, EXHIBITS nói rõ cái gì là mô hình minh hoạ, cái gì có nguồn | Thêm `docs/MEDIA-CREDITS.md` cho ảnh, font, số liệu và giới hạn nội dung |
| **Bản in poster A3** để mang đi học nhóm | Thêm `/de-cuong`: một trang A4 in được (công thức, ý chính, khái niệm sáu chương), có `@media print` |
| **Nói rõ giới hạn kiểm thử** ("chưa đo FPS trên máy thật", "chưa được giảng viên thẩm định") | Giữ nguyên tinh thần đó ở mục 8 và trong README |

### Đã bỏ, và vì sao

- **Không gian 3D và chuyển cảnh điện ảnh.** Repo kia là một file HTML 4,7 MB dựng cảnh bằng Three.js,
  rất ấn tượng nhưng cái giá là hiệu năng, khó dùng bằng bàn phím, không in được, và quan trọng nhất:
  môn Kinh tế chính trị cần **con số và bảng**, không cần một căn phòng. Nguyên tắc "spend your
  boldness in one place" — chữ ký của Sạp 122 là bảng giá, không phải camera.
- **Mô hình 3D tự dựng cho từng chương.** Mất nhiều tuần và dễ tạo cảm giác "chính xác" không có thật;
  thay bằng ví dụ đời thường đã có sẵn trong dữ liệu.
- **Video nhúng theo chương.** Cần kiểm quyền nhúng và nguồn; để giai đoạn 3.

### So sánh nhanh

| | mln131 | Sạp 122 |
| --- | --- | --- |
| Ẩn dụ | Bảo tàng 3D, bảy phòng | Bảng giá và sổ sách |
| Công nghệ | HTML một file + Three.js | Next.js, component tự viết, không thư viện UI |
| Đơn vị học | Chương có lộ trình ba bước | Chương có lộ trình ba bước (lấy từ đây) |
| Tiến độ | localStorage, tách visited/stages/completed | localStorage, tách ba bước + điểm luyện tổng |
| Media | 14 ảnh có nguồn, video có nguồn | Một ảnh tư liệu cho demo, có ghi chú giấy phép |
| Bản in | Poster A3 SVG | `/de-cuong` một trang A4 |
| Điểm mạnh riêng | Trải nghiệm điện ảnh, hiện vật | Dữ liệu, công thức, bảng tính, tốc độ và tính in ấn |
