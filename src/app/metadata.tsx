import { Metadata } from 'next';

const desc =
  'At 2DIGITS, we work with clients who want to renew their business model, innovate their process or develop innovative digital products.';

export default function getMetadata(title?: string, description: string = desc): Metadata {
  return {
    title: title || { default: 'Welcome to the 2DIGITS case!', template: `%s - 2DIGITS` },
    description,
    icons: {
      shortcut: { type: 'image/ico', sizes: '48x48', url: '/favicon.ico' },
    },
  };
}
