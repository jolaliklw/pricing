interface Props {
  // children?: React.ReactNode;
  id?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  step?: number;
}

export default function InputOut({ ...props }: Props) {
  return (
    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
      <input
        {...props}
        min={0}
        autoComplete="off"
        inputMode="numeric"
        className="block min-w-0 grow py-2.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 font-mono font-medium leading-4"
      />
    </div>
  );
}
