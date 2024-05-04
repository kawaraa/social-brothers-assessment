
import { IoChevronBackOutline, IoChevronForward } from 'react-icons/io5';

export default function PaginationButtons({
  url,
  totalPages = 1,
  currentPage = 1,
}: Readonly<PaginationProps>) {
  const buttons = [];
  const limit = 3;
  const start = totalPages <= currentPage + limit ? totalPages - limit : currentPage;
  const offset = start + limit;

  for (let i = start; i <= offset; i++) {
    buttons.push(
      <PageBtn href={url + i} active={currentPage == i} key={i}>
        {i}
      </PageBtn>,
    );
  }

  return (
    <nav
      className="mx-auto mb-16 flex w-min space-x-3 rounded-md shadow-sm"
      aria-label="Pagination">
      <MoveBtn href={url + (currentPage - 1)} title="Previous">
        <IoChevronBackOutline className="text-2xl text-[#141414] opacity-30" />
      </MoveBtn>

      {totalPages <= offset && (
        <span className="flex items-center rounded px-3 py-0 text-xs ring-[1px] ring-inset ring-gray-200">
          ...
        </span>
      )}

      {buttons}

      {totalPages <= offset ? (
        ''
      ) : (
        <>
          <span className="flex items-center rounded px-3 py-0 text-xs ring-[1px] ring-inset ring-gray-200">
            ...
          </span>

          <PageBtn href={url + (offset + 1)} active={currentPage == offset + 1}>
            {offset + 1}
          </PageBtn>
        </>
      )}

      <MoveBtn href={url + (currentPage + 1)} title="Next">
        <IoChevronForward className="text-2xl text-[#141414] opacity-30" />
      </MoveBtn>
    </nav>
  );
}

function PageBtn({ href, active, children }: Readonly<PageBtnProps>) {
  return (
    <a
      href={href}
      className={`flex items-center rounded px-3 py-0 text-xs ring-[1px] ring-inset ring-gray-200 ${!active ? '' : 'bg-[#371172] text-white'}`}>
      {children}
    </a>
  );
}
function MoveBtn({ href, title, children }: Readonly<MoveBtnProps>) {
  return (
    <a href={href} className="flex items-center px-2 py-1">
      <span className="sr-only">{title}</span>
      {children}
    </a>
  );
}

interface PaginationProps {
  url: string;
  totalPages: number;
  currentPage: number;
}
interface PageBtnProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}
interface MoveBtnProps {
  href: string;
  title: string;
  children: React.ReactNode;
}
