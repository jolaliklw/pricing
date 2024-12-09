import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  htmlFor?: string;
}

export default function Label({ children, htmlFor }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block font-medium text-gray-800`}
    >
      {children}
    </label>
  );
}
