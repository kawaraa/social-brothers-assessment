import { Suspense } from 'react';

import Image, { ImageProps } from 'next/image';

import { skeletonCls } from './tailwindcss-class';

export function ImageWithSkeleton(props: ImageProps) {
  return (
    <Suspense fallback={<div className={`aspect-video w-full ${skeletonCls}`}></div>}>
      <Image {...props} />
    </Suspense>
  );
}

export function VideoWithSkeleton({ src, type, ...props }) {
  return (
    <Suspense fallback={<div className={`aspect-video w-full ${skeletonCls}`}></div>}>
      <video {...props}>
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </Suspense>
  );
}
