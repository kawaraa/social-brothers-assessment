'use client';

import { useRouter } from 'next/navigation';

import { CategoryRadioButton } from './category-radio-button';
import { pageContainerCls } from './layout/tailwindcss-class';

export default function SearchForm({ categories, category, search = '' }) {
  const router = useRouter();

  const updateUrl = (c, s) => router.push(`/blog?category=${c}&search=${s}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUrl(e.target.category.value, e.target.search.value);
  };

  return (
    <form onSubmit={handleSubmit} className={pageContainerCls + ' mt-2 py-3 md:mt-8 md:!p-0'}>
      <h6 className="mb-3 font-semibold">Search for blogs</h6>
      <div className="flex w-full items-center ">
        <input
          type="search"
          name="search"
          className="mr-3 flex-auto px-3 py-2 md:mr-8"
          placeholder=" Search"
        />
        <button type="submit" className="h-11 w-24 rounded bg-[#371172] text-sm text-[#FFFFFF]">
          Search
        </button>
      </div>

      <h6 className="mb-3 mt-16 font-semibold">Topics</h6>

      <div className="flex items-center gap-2">
        <CategoryRadioButton
          onChange={(e) => updateUrl(e.target.value, search)}
          checked={category == ''}
          id={'some-id-for-all-blog'}
          slug=""
          text="All blogs"
        />
        {categories.map(({ _id, slug, body }) => {
          return (
            <CategoryRadioButton
              onChange={(e) => updateUrl(e.target.value, search)}
              checked={category == slug}
              id={_id}
              slug={slug}
              text={body}
              key={_id}
            />
          );
        })}
      </div>
    </form>
  );
}
