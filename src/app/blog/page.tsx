import BlogCard from '@/components/blog-card';
import { pageContainerCls } from '@/components/layout/tailwindcss-class';
import PageHeader from '@/components/page-header';
import PaginationButtons from '@/components/pagination';
import SearchForm from '@/components/seach-form';
import { PreprSdk } from '@/server/prepr';

export default async function Blogs({ params, searchParams }) {
  const { Page } = await PreprSdk.Page({ slug: 'blog' });
  const items = (await PreprSdk.Categories()).Blogs?.items;
  const categories = normalizeCategories(items || []);

  const { Blogs } = await PreprSdk.Blogs({
    limit: 9,
    // sort: 'created_on_DESC',
    where: {
      categories_any: !searchParams.category ? null : [searchParams.category],
      _search: searchParams.search,
    },
  });

  return (
    <>
      <PageHeader
        imageUrl={Page.page_header.image.url}
        title={Page.page_header.title}
        cls="h-[30vh] md:h-[300px]"
        imgCls="md:!top-[-30%] !h-[initial]"
        overlayCls="bg-[rgba(0,0,0,0.1)]"
      />

      <div className="absolute z-[-1] h-36 w-full bg-[#EFEFF8] "></div>

      <SearchForm
        categories={categories}
        category={searchParams.category}
        search={searchParams.search}
      />

      <main
        className={pageContainerCls + ' flex min-h-screen flex-col items-center justify-between '}>
        {!Blogs.items || !Blogs.items[0] ? (
          <p>No blog posts found</p>
        ) : (
          <ul className="flex flex-col flex-wrap  gap-[31px] md:flex-row">
            {Blogs.items.map((blog) => (
              <li className="max-w-[400px] flex-[30%] md:max-w-[33%]" key={blog._id}>
                <BlogCard post={blog} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <PaginationButtons
        url={`blog?category=${searchParams.category || ''}&search=${searchParams.search || ''}&page=`}
        currentPage={+searchParams.page || 1}
        totalPages={Blogs.total}
      />
    </>
  );
}

export async function generateMetadata() {
  const { Page } = await PreprSdk.Page({ slug: 'blog' });
  return { title: Page.title };
}

function normalizeCategories(data = []) {
  const set = new Set();
  const categories = [];
  data.forEach((item) => {
    if (!set.has(item.categories[0]?.slug)) {
      set.add(item.categories[0]?.slug);
      categories.push(item.categories[0]);
    }
  });
  return categories;
}
