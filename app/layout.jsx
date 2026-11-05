import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/dm-serif-display/400.css';
import '../src/style.css';

export const metadata = {
  title: 'Thị trường & Lợi ích — Chương 05',
  description: 'Khám phá Chương 5 Kinh tế chính trị Mác – Lênin bằng sơ đồ, tình huống và câu hỏi tương tác.',
};

export const viewport = { themeColor: '#f7f8f3' };

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
