import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import './globals.css';

export const metadata = {
  title: 'Sạp 122 — học Kinh tế chính trị Mác – Lênin từ một sạp hàng',
  description:
    'Sáu chương MLN122 dưới dạng bảng giá, bảng tính giá trị thặng dư, thẻ ghi nhớ và câu hỏi có giải thích. Dành cho sinh viên Đại học FPT.',
  keywords: ['MLN122', 'kinh tế chính trị', 'FPT', 'giá trị thặng dư', 'học tập'],
  openGraph: {
    title: 'Sạp 122 — MLN122, học từ một sạp hàng',
    description: 'Sáu chương Kinh tế chính trị Mác – Lênin, học bằng cách kéo và bấm.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export const viewport = { themeColor: '#eff2ee' };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
