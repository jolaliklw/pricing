import { useState } from 'react';
import { useShowToast } from '../lib/useToast';

const ToastCopy = () => (
  <div className="absolute -top-7">
    <div className="relative">
      <span className="font-mono text-xs font-medium text-white border border-sky-300 p-1 rounded-md bg-sky-300 -tracking-wider">
        Copied
      </span>
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-x-8 border-x-transparent border-b-[8px] border-b-sky-300 rotate-180"></div>
    </div>
  </div>
);

const copyToCLipboard = (
  harga: string,
  isCopy: boolean,
  setIsCopy: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isCopy || harga === '0') return;
  let txt = harga;
  if (txt.includes('.')) {
    txt = txt.split('.')[0];
  }

  navigator.clipboard.writeText(txt.replace(/,/g, ''));
  setIsCopy(true);
};

export default function Header({ totalHarga }: { totalHarga: string }) {
  const [isCopy, setIsCopy] = useState(false);

  useShowToast(isCopy, setIsCopy);

  return (
    <div className="flex justify-center w-10/12 sm:w-4/5 mx-auto relative text-pretty">
      {isCopy && <ToastCopy />}

      {/* TOTAL HARGA */}
      <h1 className="select-none font-semibold break-all relative">
        <span className="text-base text-gray-400 absolute bottom-0 -left-6">
          Rp
        </span>
        <span
          id="total-harga"
          onClick={() => copyToCLipboard(totalHarga, isCopy, setIsCopy)}
          className={`text-4xl sm:text-5xl text-gray-400 tracking-tighter ${
            totalHarga !== '0' ? 'cursor-pointer text-gray-700' : ''
          }`}
        >
          {totalHarga}
        </span>
      </h1>
    </div>
  );
}
