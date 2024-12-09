interface Props {
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
}

export default function Select({ children, ...props }: Props) {
  return (
    <>
      <div className="relative">
        <select
          {...props}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 appearance-none bg-no-repeat leading-4 font-medium"
        >
          {children}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="w-6 mr-4 absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </>
  );
}
