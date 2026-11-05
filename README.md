# Thị trường & lợi ích

Web học tập tương tác về Chương 5: kinh tế thị trường định hướng xã hội chủ nghĩa và các quan hệ lợi ích kinh tế ở Việt Nam. Nội dung được tóm lược từ chương tài liệu do người dùng cung cấp (trang 153–200); dự án **Đường tới biên giới** được tham khảo về trải nghiệm học tập.

## Nội dung và tính năng

- Ba phần kiến thức: mô hình kinh tế, hoàn thiện thể chế và quan hệ lợi ích.
- Các mảnh ghép đặc trưng, nhóm nhiệm vụ và mối quan hệ có thể tương tác.
- Một tình huống vận dụng có phản hồi, sáu flashcard và mười câu trắc nghiệm có giải thích.
- Đánh dấu năm phần đã học và lưu điểm tốt nhất trong `localStorage` của trình duyệt. Xóa dữ liệu trình duyệt sẽ xóa tiến độ; dữ liệu không đồng bộ giữa thiết bị.
- Thiết kế tương thích màn hình nhỏ; phông chữ và hình minh họa được phục vụ cùng ứng dụng.

Tài khoản email/Google và đồng bộ Firebase **chưa được triển khai** theo lựa chọn đưa tính năng này sang giai đoạn sau. Không sử dụng cấu hình hoặc dữ liệu Firebase của dự án tham khảo.

## Công nghệ

- Next.js 16 (App Router), React 19 và JavaScript (JSX).
- CSS thuần, Lucide React và font được cài qua npm.
- Vitest và Testing Library cho kiểm thử tương tác.
- Không cần backend hay biến môi trường cho các tính năng hiện tại.

## Chạy dự án

Sử dụng Node.js 22.12 trở lên (hoặc Node.js 24 trở lên) để chạy cả bộ kiểm thử.

```bash
npm install
npm run dev
```

Mở địa chỉ được Next.js in ra. Để kiểm tra và chạy bản production:

```bash
npm test
npm run build
npm start
```

## Deploy trên Vercel

Import repository vào Vercel và chọn nhánh muốn triển khai. Chọn **Next.js** cho Framework Preset; để mặc định Build Command, Output Directory và Install Command theo cấu hình Next.js của Vercel. Root Directory là `./`. Không cần biến môi trường cho phiên bản hiện tại.
