import Link from 'next/link';

import { PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem } from '@/server/prepr/generated/preprAPI.schema';

import { ImageWithSkeleton } from './image-with-skeleton';

export default function NavigationBar({
  items,
}: Readonly<{
  items: PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem[];
}>) {
  return (
    <nav className="flex h-[80px] items-center justify-between bg-[#020365] bg-gradient-to-r from-[#01041F] px-3 text-lg text-white md:px-14 md:px-[166px]">
      <ImageWithSkeleton
        src="/logo-tagline.svg"
        alt="tagline Logo"
        // className="dark:invert"
        width={210}
        height={32}
        priority
        className="w-[170px] md:w-auto"
      />
      <ul className="flex gap-[30px]">
        {items.map((item, i) => (
          <li key={i}>
            <Link href={`/${item.link_to_page[0]._slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
