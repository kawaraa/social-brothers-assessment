import React from 'react';

import parse from 'html-react-parser';

import { pageContainerCls } from '@/components/layout/tailwindcss-class';
import PageHeader from '@/components/page-header';
import { PreprSdk } from '@/server/prepr';

export default async function PageBySlug({ params: { pageSlug } }: Readonly<Props>) {
  const { Page } = await PreprSdk.Page({ slug: pageSlug });
  const filteredElement: filteredElement[] = [];

  function inspectElement(element: any) {
    const text = element?.props?.children;
    const className = element?.props?.className || '';
    if (typeof text === 'string' && !/script|iframe|object/gim.test(element.type)) {
      filteredElement.push({ Tag: element.type, text: escapeHtml(text), className });
    } else {
      React.Children.forEach(element, (child) => {
        inspectElement(child);
      });
    }
  }

  inspectElement(parse(Page?.html || ''));

  return (
    <>
      <PageHeader
        imageUrl={Page?.page_header?.image.url || ''}
        title={Page?.page_header?.title}
        cls="h-[250px]"
        imgCls="md:!top-[-30%] !h-[initial]"
        overlayCls="bg-[rgba(0,0,0,0.3)]"
      />
      <main className={pageContainerCls}>
        {filteredElement.map(({ Tag, text, className }) => (
          <Tag className={className + ' mb-5'}>{text}</Tag>
        ))}
      </main>
    </>
  );
}

export async function generateMetadata({ params: { pageSlug } }: Readonly<Props>) {
  const { Page } = await PreprSdk.Page({ slug: pageSlug });
  return { title: Page?.title || '' };
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (match: string) => {
    return (
      {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[match] || match
    );
  });
}

interface filteredElement {
  Tag: keyof JSX.IntrinsicElements;
  text: string;
  className: string;
}

interface Props {
  params: { pageSlug: string };
}
