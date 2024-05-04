import BlogCard from '@/components/blog-card';
import { pageContainerCls } from '@/components/layout/tailwindcss-class';
import PageHeader from '@/components/page-header';
import { PreprSdk } from '@/server/prepr';

export default async function Home() {
  const { Page } = await PreprSdk.Page({ slug: '/' });
  const { Blogs } = await PreprSdk.Blogs({ limit: 3, sort: 'created_on_DESC' });

  return (
    <>
      <PageHeader
        imageUrl={Page?.page_header?.image.url || ''}
        title={Page?.page_header?.title}
        text={Page?.page_header?.text}
        cls="h-[90vh]"
      />

      <main className={pageContainerCls}>
        {!Blogs || !Blogs.items || !Blogs.items[0] ? (
          <p className="text-xl">There are no blog posts found</p>
        ) : (
          <>
            <h2 className="mb-8 text-4xl md:py-6 md:text-5xl">De nieuwste blogs</h2>

            <ul className="flex flex-col gap-[31px] md:flex-row">
              {Blogs.items.map((blog) => (
                <li
                  className="mx-auto mt-5 max-w-[400px] flex-[30%] md:mt-0 md:max-w-[33%]"
                  key={blog._id}>
                  <BlogCard post={blog} />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}

export async function generateMetadata() {
  const { Page } = await PreprSdk.Page({ slug: '/' });
  return { title: Page?.title || '' };
}
