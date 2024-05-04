import Link from 'next/link';

import { LuArrowRight } from 'react-icons/lu';

import { PreprBlogsQuery_Blogs_Blogs_items_Blog } from '@/server/prepr/generated/preprAPI.schema';

import { ImageWithSkeleton } from './layout/image-with-skeleton';

export default async function BlogCard({
  post,
}: Readonly<{ post: PreprBlogsQuery_Blogs_Blogs_items_Blog }>) {
  return (
    <Link href={`/blog/${post._slug}`} className="h-full w-full">
      <span className="relative block h-[240px] overflow-hidden rounded-md">
        <ImageWithSkeleton
          src={post.banner_image.url}
          width={post.banner_image.width}
          height={post.banner_image.height}
          alt={post.title}
          className="absolute left-[50%] top-[50%]  h-full w-auto -translate-x-1/2 -translate-y-1/2 object-cover "
        />
        <CategoryTag cls="absolute bottom-2 left-2 block">{post.categories[0]['body']}</CategoryTag>
      </span>
      <h4 className="overflow-hidden py-6 py-6 text-[21px]">
        <span className="line-clamp-2 overflow-hidden text-ellipsis">{post.title}</span>
      </h4>
      <p className="text-ellipsis text-xs">
        <span className="line-clamp-3 overflow-hidden text-ellipsis">
          {post.content[0]['text']}
        </span>
      </p>
      <span className="block flex items-center pt-6 text-[15px] ">
        Lees meer
        <LuArrowRight className="mx-4" />
      </span>
    </Link>
  );
}

export const CategoryTag = ({ children, cls = '' }) => (
  <span className={'rounded bg-[#EFEFF8] px-4 py-2 text-xs uppercase ' + cls}>{children}</span>
);
