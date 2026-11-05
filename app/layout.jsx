import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import './globals.css';
import SiteHeader from '../src/components/site/SiteHeader';
import SiteFooter from '../src/components/site/SiteFooter';

export const metadata = {
  title: 'Bóc giá — một món hàng, ai lấy phần nào? | MLN122',
  description:
    'Chia giá bán của một ly trà sữa, một chiếc áo thun, một suất ăn thành bảy khoản; gộp lại thành c, v, m; tự tính m′ và xem ai nhận phần thặng dư.',
  keywords: ['MLN122', 'kinh tế chính trị', 'giá trị thặng dư', 'Đại học FPT'],
  openGraph: {
    title: 'Bóc giá — một món hàng, ai lấy phần nào?',
    description:
      'Từ 45.000 đồng của một ly trà sữa đến c, v, m: người học tự chia tiền rồi mới đối chiếu.',
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
