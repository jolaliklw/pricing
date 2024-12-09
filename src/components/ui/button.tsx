interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="py-[8px] px-[20px] rounded-lg bg-blue-700 hover:bg-blue-800 text-gray-50 text-base"
    >
      {children}
    </button>
  );
}
