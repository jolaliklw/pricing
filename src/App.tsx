import { useEffect, useRef, useState } from 'react';
import {
  addDot,
  totalHarga,
  copyToCLipboard,
  useShowToast,
  getLocalData,
} from './lib/constans';
import Form from './components/form';

interface Data {
  harga: string;
  berat: string;
  ppn: string;
  extra: string;
}

const dataSchema: Data = {
  harga: '',
  berat: '',
  ppn: '0',
  extra: '0',
};

function App() {
  const [data, setData] = useState<Data>(dataSchema);
  const [show, setShow] = useState(false);

  const initial = useRef(true);
  useEffect(() => {
    if (initial.current && !localStorage.getItem('dataLocal')) {
      localStorage.setItem('dataLocal', JSON.stringify({ ...dataSchema }));
      initial.current = false;
      return;
    }

    // localStorage.clear();
    const localData = getLocalData();
    setData({ ...localData });
  }, []);

  useShowToast(show, setShow);

  const handleChange = (e: { target: HTMLInputElement }) => {
    const v = e.target.value;

    if (e.target.id === 'berat') {
      setData({ ...data, berat: v });
      return;
    }

    // addDot, show titik every 3 digit pada input view
    setData({ ...data, harga: addDot(v) });
  };

  const handleFocus = (e: { target: HTMLInputElement }) => e.target.select();

  const total = totalHarga({ ...data });

  function handleSave(e: React.MouseEvent<HTMLElement>) {
    const filterId = (e.target as HTMLElement).id;
    const ids = ['harga', 'berat', 'show-total'];
    if (ids.some((id) => filterId.includes(id))) return;

    const dataLocal = getLocalData();
    if (dataLocal.harga === data.harga) return;

    localStorage.setItem('dataLocal', JSON.stringify({ ...data }));
  }

  return (
    <main
      className="max-w-prose mx-auto min-h-svh px-4 py-8"
      onClick={handleSave}
    >
      <div className="flex justify-center w-10/12 mx-auto relative">
        {show && (
          <div className="absolute -top-6">
            <div className="relative">
              <span className="font-mono text-xs font-semibold text-white border border-sky-300 p-1 rounded-md bg-sky-300">
                Copied
              </span>
              <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-0 w-0 border-x-4 border-x-transparent border-b-[4px] border-b-sky-300 rotate-180"></div>
            </div>
          </div>
        )}

        <h1 className="select-none font-semibold break-all relative">
          <span className="text-base text-gray-400 absolute bottom-0 -left-6">
            Rp
          </span>
          <span
            className={`cursor-pointer text-5xl max-[500px]:text-4xl ${
              total === '0' ? 'text-gray-400' : ''
            }`}
            onClick={() => copyToCLipboard(show, total, setShow)}
            id="show-total"
          >
            {total}
          </span>
        </h1>
      </div>

      <Form
        harga={data.harga}
        berat={data.berat}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    </main>
  );
}

export default App;
