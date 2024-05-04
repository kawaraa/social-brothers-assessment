import { Suspense } from 'react';

import Image, { ImageProps } from 'next/image';

import { skeletonCls } from './tailwindcss-class';

export function ImageWithSkeleton(props: Readonly<ImageProps>) {
  return (
    <Suspense fallback={<div className={`aspect-video w-full ${skeletonCls}`}></div>}>
      <Image {...props} />
    </Suspense>
  );
}

export function VideoWithSkeleton({ src, type, ...props }: Readonly<VideoProps>) {
  return (
    <Suspense fallback={<div className={`aspect-video w-full ${skeletonCls}`}></div>}>
      <video {...props}>
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </Suspense>
  );
}
interface VideoProps {
  src: string;
  type: string;
  controls: boolean;
  width: string;
  height: string;
}
