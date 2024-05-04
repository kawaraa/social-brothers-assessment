import { InputHTMLAttributes } from 'react';

export function CategoryRadioButton({ id, slug, text, ...props }: Readonly<Props>) {
  return (
    <span className="relative flex overflow-hidden rounded">
      <input
        type="radio"
        name="category"
        value={slug}
        id={id}
        {...props}
        className="peer absolute inset-0 h-full w-full appearance-none bg-[transparent]"
      />
      <label
        htmlFor={id}
        className="relative cursor-pointer border-[1px] border-[rgb(0,0,0,0.1)] bg-white px-2 py-1 text-xs uppercase peer-checked:bg-[#371172] peer-checked:text-white md:px-4 md:py-2">
        {text}
      </label>
    </span>
  );
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  slug: string;
  text: string;
}
