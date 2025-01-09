interface Props {
  // children?: React.ReactNode;
  label: string;
  id?: string;
  type?: 'text' | 'number';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  min?: string;
  step?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  inputMode?: 'decimal' | 'numeric';
}

export default function Input({ ...props }: Props) {
  return (
    <>
      <div
        className={
          'flex items-center rounded-lg pl-4 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 overflow-hidden ' +
          `${props.disabled ? 'bg-gray-100' : 'bg-white'}`
        }
      >
        <label
          htmlFor={props.id}
          className={
            'shrink-0 select-none text-base font-medium ' +
            `${
              props.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-800 cursor-text'
            }`
          }
        >
          {props.label}
        </label>
        <input
          {...props}
          autoComplete="off"
          pattern="[0-9]*"
          className="block min-w-0 grow py-2.5 pl-1 pr-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 font-medium text-right leading-4 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        />
      </div>
    </>
  );
}
