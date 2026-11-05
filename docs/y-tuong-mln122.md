# Sạp 122 — ý tưởng web app truyền bá môn MLN122 (Đại học FPT)

Tài liệu này ghi lại: hai thư viện đã đọc, chẩn đoán vấn đề, năm ý tưởng, ý tưởng được chọn, cách ghép
Cloudscape với tiêu chuẩn thiết kế của Meng To, kiến trúc kỹ thuật và lộ trình.

Bản chạy thử nằm ngay trong repo: `/` (landing page) và `/studio` (phòng học dựng bằng Cloudscape).

---

## 0. Ghi chú về mã môn

Trong chương trình FPT, **MLN122 là Kinh tế chính trị Mác – Lênin (3 tín chỉ)**. Tư tưởng Hồ Chí Minh là
**HCM202**, còn Triết học là MLN111, CNXH khoa học là MLN131. Vì vậy toàn bộ nội dung ở đây bám theo
sáu chương của giáo trình Kinh tế chính trị Mác – Lênin, không phải Tư tưởng Hồ Chí Minh.

---

## 1. Hai thư viện đã đọc

### 1.1. MengToFrontend — bộ lọc "AI slop" cho landing page

Repo `Kappaemme-git/MengToFrontend` là một **Codex skill** (không phải thư viện UI): một checklist để
audit landing page trước khi launch. Nội dung cốt lõi:

| Nhóm kiểm tra | Điều đáng chú ý |
| --- | --- |
| Typography | Kiểm tra `letter-spacing` ở tiêu đề, nhãn, nút, chữ in hoa; không kéo âm tracking cho body; thử ít nhất hai hướng font; giữ ít weight nhưng phân cấp rõ |
| Real references | Ưu tiên ảnh sản phẩm/địa điểm/người thật; ảnh AI chỉ là bản nháp và không được thay thế "bằng chứng" |
| Image refinement | Soi tay, mặt, chữ trong ảnh, hướng sáng, bóng đổ; cắt ảnh có chủ đích; giữ một phong cách ảnh thống nhất |
| Prompt quality | Prompt phải nêu brand, người xem, chất liệu, góc máy, ánh sáng, vai trò của ảnh trong trang; thêm ràng buộc âm |
| Human touch | Một hai chi tiết gắn với sản phẩm, micro-interaction chỉ dùng khi làm rõ trạng thái, copy cụ thể thay vì sáo rỗng |
| Mobile | Kiểm tra riêng ở cỡ chữ nhỏ vì đó là nơi trang AI hay "sập" |

Điểm mình dùng nhiều nhất: **"AI có thể tạo bản nháp, nhưng trang chuyên nghiệp cần phán đoán
typography, tham chiếu thật và một hai chi tiết do người làm."** Nó biến việc "làm đẹp" thành việc
kiểm tra được, có tiêu chí pass/fail.

### 1.2. Cloudscape Design System — thư viện component của AWS

`@cloudscape-design/components` (Apache-2.0) là design system mã nguồn mở mà AWS dùng cho console:
khoảng 70 component React (AppLayout, Table, Tabs, Cards, SideNavigation, Form, Slider, Flashbar,
ProgressBar, StatusIndicator, Modal, Select...), có sẵn hành vi bàn phím, ARIA, responsive và
**design token** để đổi theme (`applyTheme` từ `@cloudscape-design/components/theming`).

Hai điều quyết định cách mình dùng nó:

1. **Nó không phải thư viện để làm landing page.** Nó là bộ khung cho *ứng dụng*: dày đặc thông tin,
   ưu tiên bảng, trạng thái, form. Đem nó làm hero marketing sẽ ra giao diện "AWS console" rất lệch.
2. **Nhưng nó cực hợp với phần "phòng học"**: sáu chương như sáu mục công việc, trạng thái học, điểm
   luyện, bảng khái niệm, bộ lọc flashcard.

Vì vậy hướng ghép là: **landing page tự viết theo checklist Meng To, phần app dùng Cloudscape, nối hai
bên bằng cùng một hệ màu và cùng một font.**

---

## 2. Chẩn đoán: vì sao môn này khó "truyền bá"?

1. **Sinh viên học để qua môn, không học để hiểu.** Tài liệu trôi nổi trên mạng chủ yếu là đề cương và
   câu hỏi trắc nghiệm không giải thích → học thuộc, thi xong quên.
2. **Phạm trù trừu tượng, ví dụ trong giáo trình xa đời sống.** "Giá trị thặng dư", "tư bản bất biến"
   không có điểm bám vào trải nghiệm hằng ngày.
3. **Không có "trạng thái học".** Sinh viên không biết mình đang ở đâu trong sáu chương, chương nào
   còn yếu.
4. **Nội dung nhạy cảm về mặt chính trị – lý luận.** Bất kỳ trang nào cũng phải nói rõ: đây là bản tóm
   tắt để tự học, không thay giáo trình và không phát ngôn thay giảng viên.

Từ đó, tiêu chí cho ý tưởng: **một vật thật để bám vào + một trạng thái nhìn thấy được + một lý do để
quay lại.**

---

## 3. Năm ý tưởng

### Ý tưởng A — "Sạp 122": lớp ghi chú bấm được + phòng học kiểu bảng điều khiển

Biến sáu chương thành sáu "quầy" trong một sạp hàng: mỗi phạm trù gắn với hoá đơn, xe shipper, phiên
livestream. Có bảng điều khiển tiến độ, máy tính giá trị thặng dư, flashcard, trắc nghiệm có giải thích.

- Người dùng: sinh viên FPT đang học MLN122, học trước giờ lên lớp và ôn trước thi.
- Điểm mạnh: đúng "vật thật để bám vào", có trạng thái, có lý do quay lại; làm được trong 1–2 tuần.
- Rủi ro: nội dung phải chuẩn; nếu chỉ có chương 5 thì không đủ "truyền bá".

### Ý tưởng B — "Chợ tư tưởng": game mô phỏng thị trường

Sinh viên mở một quán, chọn giá, chọn lương, thuê người, rồi thấy `c`, `v`, `m` và `m′` biến động.
Cuối mỗi vòng, hệ thống hỏi: "vì sao lợi nhuận tăng mà thặng dư không tăng?"

- Điểm mạnh: engagement cao, dạy được quan hệ nhân quả.
- Rủi ro: cần cân bằng số liệu, dễ thành game "quản lý quán" hơn là môn lý luận; công sức lớn gấp 3–4 lần.

### Ý tưởng C — "Hộ chiếu 6 chương": micro-learning 5 phút/ngày

Mỗi ngày một thẻ: một phạm trù, một ví dụ, một câu hỏi. Có streak, thông báo, "hộ chiếu" đóng dấu theo
chương.

- Điểm mạnh: lan truyền tốt, hợp điện thoại, dễ làm viral trong lớp.
- Rủi ro: cần nội dung đủ dày cho 30+ ngày; streak dễ tạo cảm giác học mà không hiểu.

### Ý tưởng D — "60 giây MLN122": thư viện video ngắn

Kịch bản 60 giây + phụ đề cho từng phạm trù, đăng kèm TikTok/Reels, web chỉ là nơi tra cứu và tải
transcript.

- Điểm mạnh: đúng kênh sinh viên đang dùng, lan truyền mạnh.
- Rủi ro: cần quay dựng, giảng viên duyệt nội dung; web dễ thành phụ lục của video.

### Ý tưởng E — "Bản đồ khái niệm": knowledge graph kéo–thả

Vẽ mạng lưới phạm trù (hàng hóa → tiền tệ → sức lao động → thặng dư → tích lũy → độc quyền), cho phép
kéo–thả để nối quan hệ, sai thì giải thích.

- Điểm mạnh: dạy được cấu trúc, rất khác đề cương.
- Rủi ro: dễ đẹp mà khó dùng; nội dung đồ thị phải do người hiểu môn thiết kế.

### So sánh nhanh

| Ý tưởng | Tác động | Công sức | Rủi ro nội dung | Làm được ngay |
| --- | --- | --- | --- | --- |
| A. Sạp 122 | Cao | Vừa | Vừa | Có |
| B. Chợ tư tưởng | Cao | Cao | Cao | Không |
| C. Hộ chiếu 6 chương | Vừa | Thấp | Thấp | Có |
| D. Video 60 giây | Cao | Cao (quay dựng) | Cao | Không |
| E. Bản đồ khái niệm | Vừa | Vừa | Vừa | Một phần |

**Chọn A làm xương sống**, đưa một phần E vào (bảng khái niệm + liên kết chương) và một phần C vào
(gợi ý "việc tiếp theo" trên bảng điều khiển). B và D để giai đoạn sau.

---

## 4. Ý tưởng được chọn: Sạp 122

### 4.1. Câu định vị

> MLN122 không phải môn để học thuộc. Nó là môn dạy bạn nhìn một tờ hoá đơn, một chuyến xe, một phiên
> livestream và thấy quan hệ sản xuất ở trong đó.

Tên "Sạp" vì: nhỏ, cụ thể, Việt Nam, và đúng ẩn dụ của môn học (hàng hoá – tiền – thị trường).

### 4.2. Kiến trúc thông tin

```
/                     Landing page (thuyết phục + dẫn vào phòng học)
/studio               Phòng học
  ├─ Bảng điều khiển  tiến độ 6 chương, gợi ý tiếp theo, bảng bản đồ môn học
  ├─ Chương 01…06     tóm tắt, bảng khái niệm, ví dụ Việt Nam, flashcard, đánh dấu đã học
  ├─ Trắc nghiệm      14 câu có giải thích ngay, lưu điểm cao nhất
  ├─ Sổ tay           12 flashcard, lọc theo chương
  └─ Máy tính         kéo giá bán / nguyên liệu / khấu hao / tiền công → c, v, m, m′
```

### 4.3. Ba chi tiết "do người làm" (human touch)

1. **Hoá đơn trà sữa ở hero** — không phải ảnh minh hoạ AI, mà một tờ hoá đơn in số: 45.000đ chia thành
   c = 18.000, v = 9.000, m = 18.000, m′ = 200%. Có ghi chú rõ "số liệu minh hoạ".
2. **Con dấu tròn** dán lệch bên cạnh hoá đơn: "6 chương · 3 tín chỉ · MLN122" — chi tiết giấy tờ, không
   phải gradient trang trí.
3. **Máy tính giá trị thặng dư** kéo được ngay trên landing, kèm câu cảnh báo khi m < 0: "quán đang lỗ,
   đây là lúc phạm trù trở nên rất cụ thể".

### 4.4. Ghép Cloudscape với checklist Meng To

| Bề mặt | Công nghệ | Lý do |
| --- | --- | --- |
| Landing | CSS tự viết, Lora + Be Vietnam Pro + IBM Plex Mono | Cần giọng biên tập, không được giống console |
| Phòng học | Cloudscape (AppLayout, Table, Tabs, Cards, Form, Slider…) | Cần hành vi chuẩn: bàn phím, ARIA, responsive, trạng thái |
| Nối hai bên | `applyTheme` đổi token: font, nền giấy `#f7f4ec`, nút chính `#12352a`, viền `#e2dbcb`, bo góc | Một hệ màu, hai mật độ thông tin |

Áp checklist Meng To vào bản này:

- **Typography**: tiêu đề Lora với tracking −0.015em (chỉ ở cỡ lớn); nhãn in hoa tracking +0.16em; body
  Be Vietnam Pro tracking thường; số liệu dùng IBM Plex Mono để tạo cảm giác "hoá đơn".
- **Real references**: ảnh sạp hàng thật (ảnh tư liệu, có ghi nguồn), không dùng ảnh AI. Số liệu trong
  hoá đơn được ghi rõ là ví dụ, không giả làm khảo sát.
- **Human detail**: hoá đơn, con dấu, đường kẻ đứt, mép răng cưa của tờ bill.
- **Micro-interaction**: hover ở danh sách chương (thụt lề + mũi tên), thanh trượt đổi số tức thì,
  flashcard mở đáp án, `details` cho FAQ, `focus-visible` rõ ràng.
- **Mobile**: danh sách chương bỏ cột phụ, hoá đơn bỏ xoay, hero về một cột.

---

## 5. Kiến trúc kỹ thuật

- **Next.js 16 App Router, React 19, JavaScript (JSX)** — giống chuẩn repo hiện tại, không thêm TypeScript
  để giữ tốc độ.
- **Cloudscape v3 + global-styles**, theme qua token, không fork CSS.
- **Không backend, không tài khoản**: tiến độ trong `localStorage` (khóa `sap122:progress:v1`); nói rõ
  giới hạn này trong UI thay vì hứa đồng bộ.
- **Nội dung tách khỏi UI**: `src/content/course.js` là nguồn duy nhất (6 chương, 27 khái niệm, 12
  flashcard, 14 câu hỏi, 4 FAQ). Muốn thêm chương chỉ sửa một file.
- **Tính toán tách khỏi UI**: `src/lib/metrics.js` (`computeSurplus`, `chapterStatus`) có test riêng.
- **Test**: Vitest + Testing Library (dữ liệu, công thức, render landing). `npm test` chạy 8 test.
- **Deploy**: Vercel, không cần biến môi trường.

Hiệu năng cần để ý: Cloudscape khá nặng. Cách xử lý ở giai đoạn sau: `dynamic import` phòng học, hoặc
chỉ tải phòng học khi người dùng bấm "Vào sạp học". Landing hiện tại vẫn nhẹ vì không import Cloudscape.

---

## 6. Lộ trình

**Giai đoạn 1 (đã có trong repo)** — Landing + phòng học 6 chương + máy tính + luyện tập + sổ tay, lưu
tiến độ trên máy.

**Giai đoạn 2 — mở rộng chiều sâu nội dung**
- Thêm dạng câu hỏi tình huống (case ngắn, chọn hướng xử lý) cho chương 3 và 5.
- Trang "đề cương ngược": nhập danh sách chương sẽ thi → hệ thống xếp lịch ôn 7 ngày.
- Xuất bản ghi chú PDF/Notion để sinh viên mang đi học nhóm.

**Giai đoạn 3 — lớp cộng đồng**
- Đăng nhập Google (Firebase) để đồng bộ tiến độ và bảng xếp hạng theo lớp.
- "Sạp của lớp": giảng viên ghim câu hỏi, sinh viên gửi câu hỏi hay, chọn lọc thành bộ luyện.
- Kênh video 60 giây (ý tưởng D) nhúng vào từng chương, phụ đề tải được.

### Chỉ số nên đo

- Tỉ lệ hoàn thành 6 chương / tỉ lệ quay lại trong 7 ngày.
- Số câu luyện trung bình mỗi lượt và tỉ lệ đúng theo chương (chương nào khó nhất).
- Số lần dùng máy tính giá trị thặng dư (chỉ số "hiểu" thay cho "đọc").

---

## 7. Rủi ro và cách xử lý

| Rủi ro | Cách xử lý |
| --- | --- |
| Sai nội dung lý luận | Mỗi chương ghi rõ là bản tóm tắt; cần một giảng viên duyệt trước khi công khai; không thêm quan điểm ngoài giáo trình |
| Nhạy cảm chính trị | Chỉ diễn giải nội dung giáo trình, không bình luận thời sự, không dùng hình ảnh lãnh đạo làm trang trí |
| Bản quyền ảnh | Ảnh tư liệu hiện tại chỉ dùng cho demo; trước khi public cần thay bằng ảnh có giấy phép rõ ràng hoặc ảnh do nhóm tự chụp |
| Cloudscape làm landing mất cá tính | Tách bề mặt: landing không dùng Cloudscape; chỉ chia sẻ token màu/font |
| Bundle nặng | Dynamic import phòng học; đo bằng Lighthouse trước khi launch |
| "Học cho có streak" | Không dùng streak ở giai đoạn 1; thay bằng "việc tiếp theo" và giải thích ngay sau mỗi câu |

---

## 8. Tự audit theo đúng format của MengToFrontend

```text
Launch readiness: Needs polish (nội dung cần giảng viên duyệt trước khi public)

Top fixes:
1. Ảnh sạp hàng hiện là ảnh tư liệu chưa rõ giấy phép - thay bằng ảnh tự chụp hoặc ảnh CC0, giữ nguyên caption nguồn.
2. Chưa có kiểm chứng hình ảnh trên trình duyệt thật ở 375px - cần chụp lại 3 màn hình mobile trước khi launch.
3. Phòng học kéo Cloudscape vào toàn bộ bundle - tách dynamic import cho route /studio.

Checklist:
- Typography and letter spacing: pass - Lora cho tiêu đề, Be Vietnam Pro cho UI, Plex Mono cho số; nhãn in hoa có tracking dương.
- Real references and imagery: needs polish - ảnh thật, có caption, nhưng giấy phép chưa xác nhận.
- Image refinement: pass - một phong cách ảnh tư liệu, không trộn minh hoạ AI.
- Prompt/design specificity: pass - hoá đơn, con dấu, máy tính đều gắn với môn học, không phải trang trí chung.
- Human touch and micro-interactions: pass - hover danh sách chương, slider, flashcard, FAQ details, focus ring.
- Mobile visual quality: needs polish - CSS đã có breakpoint 940/720px nhưng chưa kiểm tra bằng ảnh chụp.
```

---

## 9. Cách chạy

```bash
npm install
npm run dev     # http://localhost:3000 và /studio
npm test        # 8 test: công thức, dữ liệu, render landing
npm run build
```
