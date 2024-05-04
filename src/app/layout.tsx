import { Inter } from 'next/font/google';

import Footer from '@/components/layout/footer';
import NavigationBar from '@/components/layout/navigation-bar';

import './globals.css';

import { PreprSdk } from '@/server/prepr';

import getMetadata from './metadata';

const inter = Inter({ subsets: ['latin'] });

let navItems = null;
let footerItems = null;
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!navItems && !footerItems) {
    const { Navigations } = await PreprSdk.Navigation();
    Navigations.items.forEach((item) =>
      item?.title === 'Header' ? (navItems = item.items) : (footerItems = item.items),
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <NavigationBar items={navItems} />

          {children}
        </div>

        <Footer items={footerItems} />
      </body>
    </html>
  );
}

export function generateMetadata() {
  return getMetadata();
}
