import { useEffect } from 'react';

const addDot = (x: string) => {
  x = x.replace(/[^\d]/g, '').toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');

  return x;
};

const toRupiah = (x: number) => {
  // remove dot
  // x = x.replace(/\./g, '');
  // let toNumber: number = 0;
  // if (typeof x === 'string') toNumber = Number(x);

  return new Intl.NumberFormat('id-ID', {
    // style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(x);
};

type TotalHarga = {
  berat: string;
  harga: string;
  ppn: string;
  extra: string;
};

const totalHarga = ({ berat, harga, ppn, extra }: TotalHarga) => {
  if (berat.length === 0 || harga.length === 0) return toRupiah(0);

  const total =
    Number(harga.replace(/\,/g, '')) * Number(berat) * (Number(ppn) / 100 + 1) +
    Number(extra);

  return toRupiah(total);
};

const copyToCLipboard = (
  x: boolean,
  totalView: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (x || totalView === '0') return;
  let txt = totalView;
  if (txt.includes(',')) {
    txt = txt.split(',')[0];
  }

  navigator.clipboard.writeText(txt.replace(/\./g, ''));
  setShow(true);
};

function useShowToast(
  x: boolean,
  setX: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (x) {
      timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setX(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [x]);
}

function getLocalData() {
  const dataLocal = JSON.parse(localStorage.getItem('dataLocal') as string);
  if (!dataLocal) return console.error('ra enek local data');
  return dataLocal;
}
export { addDot, totalHarga, copyToCLipboard, useShowToast, getLocalData };
