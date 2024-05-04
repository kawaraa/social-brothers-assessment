import Link from 'next/link';

import { PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem } from '@/server/prepr/generated/preprAPI.schema';

export default function Footer({
  items,
}: Readonly<{
  items: PreprNavigationQuery_Navigations_Navigations_items_Navigation_items_MenuItem[];
}>) {
  return (
    <footer className="flex h-20 items-center justify-between bg-[#020365] bg-gradient-to-r from-[#01041F] px-14 text-xs text-white md:px-[166px]">
      <ul className="flex gap-[30px]">
        {items.map((item, i) => (
          <li key={i}>
            <Link href={item.link_to_page[0]._slug}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
