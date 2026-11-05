import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import './globals.css';
import SiteHeader from '../src/components/site/SiteHeader';
import SiteFooter from '../src/components/site/SiteFooter';

export const metadata = {
  title: 'Chọn đường — một quyết định, nhiều góc nhìn | MLN122',
  description:
    'Hai mốc lịch sử kinh tế Việt Nam và hai kịch bản quyết định: chọn phương án, xem hệ quả trên ba trục, nhìn từ ba phía và viết phản biện bằng lý luận MLN122.',
  keywords: ['MLN122', 'kinh tế chính trị', 'Đại học FPT', 'học tập', 'kịch bản quyết định'],
  openGraph: {
    title: 'Chọn đường — một quyết định, nhiều góc nhìn',
    description:
      'Từ bao cấp 1986 đến một quyết định hôm nay: học MLN122 bằng cách tự chọn và tự lập luận.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export const viewport = { themeColor: '#e9ece6' };

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
