import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import './globals.css';
import SiteHeader from '../src/components/site/SiteHeader';
import SiteFooter from '../src/components/site/SiteFooter';

export const metadata = {
  title: 'Sổ cái MLN122 — sáu chương, 120 câu hỏi',
  description:
    'Ôn MLN122 bằng 120 câu trắc nghiệm có giải thích từng phương án, thẻ phạm trù giãn lịch, ghép thuật ngữ và Knowledge Hub tra theo sáu chương.',
  keywords: ['MLN122', 'kinh tế chính trị Mác – Lênin', 'trắc nghiệm', 'Đại học FPT'],
  openGraph: {
    title: 'Sổ cái MLN122 — sáu chương, 120 câu hỏi',
    description:
      'Quiz theo chương, ôn thẻ phạm trù và Knowledge Hub: học MLN122 bằng cách tự trả lời trước, đọc giải thích sau.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export const viewport = { themeColor: '#e6e2d8' };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <a className="skip" href="#main">
          Tới nội dung chính
        </a>
        <SiteHeader />
        <main id="main" className="shell">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
