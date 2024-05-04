import BlogCard, { CategoryTag } from '@/components/blog-card';
import { ImageWithSkeleton, VideoWithSkeleton } from '@/components/layout/image-with-skeleton';
import { pageContainerCls } from '@/components/layout/tailwindcss-class';
import PageHeader from '@/components/page-header';
import { PreprSdk } from '@/server/prepr';

export default async function Blog({ params: { slug } }) {
  const { Blog } = await PreprSdk.Blog({ slug });
  const allElements = [];

  Blog.content.forEach((item) => {
    if (Array.isArray(item['items'])) {
      item['items'].forEach((media) => {
        if (/photo|image/gim.test(media._type)) {
          allElements.push(
            <ImageWithSkeleton
              src={media.url}
              alt={media.name}
              width={media.width}
              height={media.height}
              className="w-full"
            />,
          );
        } else if (/video/gim.test(media._type)) {
          allElements.push(
            <VideoWithSkeleton
              controls
              src={media.url}
              type="video/mp4"
              width={media.width}
              height={media.height}
            />,
          );
        }
      });
    }

    allElements.push(
      <BlogElement tagname={item['format']} key={item['_id']}>
        {item['text']}
      </BlogElement>,
    );
  });

  return (
    <>
      <PageHeader imageUrl={Blog.banner_image.url} alt={Blog.title} cls="h-[350px] md:h-[452px] " />

      <div className={pageContainerCls}>
        <main className="max-w-3xl">
          <CategoryTag cls="">{Blog.categories[0]['body']}</CategoryTag>

          {/* <h1 className="mb-8 mt-4 text-5xl">{Blog.title}</h1> */}
          <h1 className="mb-8 mt-4 text-4xl md:text-5xl ">{Blog.title}</h1>

          {allElements}
        </main>
      </div>
      {Blog.related_blogs && Blog.related_blogs[0] && (
        <aside className="bg-[#EFEFF8]">
          <div className={pageContainerCls}>
            <BlogElement tagname="H5" className="mb-5 text-3xl">
              Gerelateerde blogs
            </BlogElement>

            <ul className="flex flex-col gap-[31px] md:flex-row">
              {Blog.related_blogs.map((blog) => (
                <li className="w-1/3" key={blog._id}>
                  <BlogCard post={blog} />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export async function generateMetadata({ params: { slug } }) {
  const { Blog } = await PreprSdk.Blog({ slug });
  return { title: Blog.title };
}

function BlogElement({ tagname, children, ...props }) {
  let Tag = (!tagname ? 'p' : htmlTags[tagname]?.name) || 'P';

  return (
    <Tag className={htmlTags[tagname]?.class || 'my-3'} {...props}>
      {children}
    </Tag>
  );
}

const htmlTags = {
  H2: { name: 'h2', class: 'text-4xl mt-5 mb-4' },
  H3: { name: 'h3', class: 'text-3xl mt-5 mb-4' },
  H4: { name: 'h4', class: 'text-2xl mt-4 mb-3' },
  H5: { name: 'h5', class: 'text-2xl mt-3 mb-2' },
  H6: { name: 'h6', class: 'my-lg' },
};
