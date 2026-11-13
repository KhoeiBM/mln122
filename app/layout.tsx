import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Kinh Tế Quá Độ | Học MLN122 theo cách khác', description: 'Không gian học và ôn tập Chương 5 Kinh tế chính trị Mác – Lênin.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="vi"><body>{children}</body></html>; }
