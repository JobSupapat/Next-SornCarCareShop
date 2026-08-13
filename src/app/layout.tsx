// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SornCarCareShop | ศูนย์จำหน่ายเคมีภัณฑ์ดูแลรถยนต์ระดับพรีเมียม (MR.SORN CAR WASH)',
  description: 'จำหน่าย Crystal Wax Spray เคลือบแก้วแท้ โฟมล้างรถสูตรเงาฉ่ำ และน้ำยาทายางดำ พัฒนาและทดสอบจริง ณ ศูนย์บริการ MR.SORN CAR WASH',
  keywords: [
    'SornCarCareShop',
    'MR.SORN CAR WASH',
    'สเปรย์เคลือบแก้ว',
    'Crystal Wax Spray',
    'น้ำยาล้างรถ',
    'เคลือบเงารถยนต์',
    'น้ำยาทายางดำ',
    'AEO Car Care',
  ],
  authors: [{ name: 'PsyberLink : Agentic AI Ecosystem', url: 'https://sorncarcareshop.com' }],
  icons: {
    icon: '/images/ui/SornCarCareShop_NewLogo.png?v=2',
    shortcut: '/images/ui/SornCarCareShop_NewLogo.png?v=2',
    apple: '/images/ui/SornCarCareShop_NewLogo.png?v=2',
  },
  openGraph: {
    title: 'SornCarCareShop | ศูนย์จำหน่ายเคมีภัณฑ์ดูแลรถยนต์ระดับพรีเมียม',
    description: 'จำหน่าย Crystal Wax Spray เคลือบแก้วแท้ พัฒนาและทดสอบจริง ณ ศูนย์บริการ MR.SORN CAR WASH',
    url: 'https://sorncarcareshop.com',
    siteName: 'SornCarCareShop',
    images: [
      {
        url: '/images/ui/SornCarCareShop_NewLogo.png',
        width: 1200,
        height: 630,
        alt: 'SornCarCareShop Logo',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}