import { Inter } from 'next/font/google';

import Footer from '@/components/layout/footer';
import NavigationBar from '@/components/layout/navigation-bar';

import './globals.css';

import { PreprSdk } from '@/server/prepr';
import { PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem } from '@/server/prepr/generated/preprAPI.schema';

import getMetadata from './metadata';

const inter = Inter({ subsets: ['latin'] });

let navItems: MenuItems = [];
let footerItems: MenuItems = [];

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!navItems[0] && !footerItems[0]) {
    const { Navigations } = await PreprSdk.Navigation();
    Navigations &&
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

type MenuItems = PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem[];
