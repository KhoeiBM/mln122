# Chợ Kinh Tế — MLN122

Ứng dụng Next.js ôn tập Chương 5, gồm tổng hợp kiến thức, trò chơi tình huống và các chế độ ôn tập. Nội dung được biên soạn lại từ đề mẫu được cung cấp và các nguồn tham khảo ghi trong ứng dụng.

## Chạy cục bộ

```bash
npm install
npm run dev
```

Mở http://localhost:3000. `npm run build` kiểm tra bản production.

## Triển khai Vercel

Import repository vào Vercel, chọn framework Next.js và deploy với thiết lập mặc định (`npm run build`). Không cần biến môi trường hay cơ sở dữ liệu. Tiến độ chỉ lưu trong localStorage của trình duyệt, không đồng bộ giữa thiết bị.

Ứng dụng là tài liệu học tập độc lập, không phải sản phẩm chính thức của Đại học FPT. Trò chơi là mô phỏng, không phải hướng dẫn pháp lý.

### Nếu Vercel báo `NEXT_NO_VERSION`

Kiểm tra deployment dùng nhánh/commit có file `package.json` tại thư mục gốc. Trong Vercel, vào **Project Settings → Build and Deployment → Root Directory**, để trống hoặc chọn `.` (không chọn `app`). Framework Preset là Next.js. Sử dụng Node.js 20.9 trở lên (khuyến nghị Node.js 22), rồi tạo deployment mới từ commit đã cập nhật. Nếu Vercel đang theo dõi nhánh khác, nhánh đó cần có mã ứng dụng trước khi deploy.
