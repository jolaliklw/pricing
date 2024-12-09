import { InitialState } from '../App';

const localStorageName = 'v1';

function addDot(x: string) {
  x = x.replace(/[^\d]/g, '').toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');

  return x;
}

function toRupiah(x: number) {
  // remove dot
  // x = x.replace(/\./g, '');
  // let toNumber: number = 0;
  // if (typeof x === 'string') toNumber = Number(x);

  return new Intl.NumberFormat('en-US', {
    // style: 'currency',
    // currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(x);
}

function formatToK(x: number) {
  return x.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  });
}

function hitungHarga({ hpr, berat, extra = '0', ppn = '0' }: InitialState) {
  if (!hpr || !berat || hpr.length === 0 || berat.length === 0)
    return toRupiah(0);

  hpr = hpr.replace(/,/g, '');

  const total =
    Number(hpr) * Number(berat) * (Number(ppn) / 100 + 1) + Number(extra);

  return toRupiah(total);
}

function getLocalData(): any {
  const dataLocal = JSON.parse(
    localStorage.getItem(localStorageName) as string
  );
  if (!dataLocal) return console.error('ra enek local data');
  return dataLocal;
}

function setLocalData(data: InitialState) {
  return localStorage.setItem(localStorageName, JSON.stringify({ ...data }));
}

export { addDot, toRupiah, formatToK, hitungHarga, getLocalData, setLocalData };
