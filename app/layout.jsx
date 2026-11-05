import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';
import '@fontsource/lora/500.css';
import '@fontsource/lora/500-italic.css';
import '@fontsource/lora/600.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

export const metadata = {
  title: 'Sạp 122 — Kinh tế chính trị Mác – Lênin, học từ một sạp hàng',
  description:
    'Sạp 122 biến sáu chương MLN122 thành bảng điều khiển, máy tính giá trị thặng dư, flashcard và bài luyện có giải thích. Dành cho sinh viên Đại học FPT.',
  keywords: ['MLN122', 'kinh tế chính trị', 'FPT', 'giá trị thặng dư', 'học tập'],
  openGraph: {
    title: 'Sạp 122 — MLN122, học từ một sạp hàng',
    description: 'Sáu chương Kinh tế chính trị Mác – Lênin, học bằng cách bấm và kéo.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export const viewport = { themeColor: '#f7f4ec' };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
