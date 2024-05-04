import { ImageWithSkeleton } from './layout/image-with-skeleton';

export default async function PageHeader({
  imageUrl,
  alt,
  title,
  text,
  cls = '',
  imgCls = '',
  overlayCls = 'bg-[rgba(0,0,0,0.54)]',
  ...props
}: Readonly<Props>) {
  return (
    <header
      className={'relative flex items-center justify-center overflow-hidden ' + cls}
      {...props}>
      {/* bg-[url(/home-page-intro.png)] */}
      <ImageWithSkeleton
        src={imageUrl}
        alt={alt || title || ''}
        fill={true}
        priority
        className={`absolute z-[-1] grayscale ${imgCls}`}
      />
      <div className={'absolute inset-0 z-[-1] ' + overlayCls}></div>
      <div className="max-w-[823px] text-center text-white">
        <h1 className="text-5xl font-semibold md:text-7xl">{title}</h1>
        <p className="mt-3 font-semibold md:text-lg">{text}</p>
      </div>
    </header>
  );
}

interface Props {
  imageUrl: string;
  alt?: string;
  title?: string;
  text?: string;
  cls?: string;
  imgCls?: string;
  overlayCls?: string;
}
