import { useEffect, useRef, useState } from 'react';

import FormMain from './components/form-main';
import Footer from './components/footer';
import tripleDot from './assets/triple-dot.svg';
import Header from './components/header';
import { getLocalData, hitungHarga, setLocalData } from './lib/utils';
import Modal from './components/modal';

export interface ListHarga {
  status: string;
  pen: number;
  harga: number;
}

export interface InitialState {
  hpr: string;
  berat: string;
  ppn?: string;
  extra?: string;
  listHarga: ListHarga[];
}

/*
=======================
  APP
=======================
*/
function App() {
  const [pricingDetails, setPricingDetails] = useState<InitialState>({
    hpr: '',
    berat: '',
    ppn: '',
    extra: '',
    listHarga: [],
  });
  const [openSetting, setOpenSetting] = useState(false);

  const initialLoad = useRef(true);
  useEffect(() => {
    if (initialLoad.current && !getLocalData()) {
      localStorage.clear();
      setLocalData(pricingDetails);
      initialLoad.current = false;
      return;
    }

    // localStorage.clear();
    const localData = getLocalData();
    if (localData) {
      setPricingDetails({ ...localData });
    }
  }, []);

  const saveAnywhere = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentId = (e.target as Element).id;
    const ids = ['harga', 'berat', 'list-harga', 'button-save', 'total-harga'];
    const dataLocal: InitialState = getLocalData();

    if (ids.includes(currentId)) return;

    if (dataLocal.hpr !== pricingDetails.hpr) {
      setLocalData({ ...pricingDetails, berat: '' });
    }
  };

  const totalHarga = hitungHarga({ ...pricingDetails });

  return (
    <>
      <main
        onClick={saveAnywhere}
        className="max-w-prose mx-auto p-8 flex flex-col min-h-svh [&>:last-child]:mt-auto gap-y-8"
      >
        <div>
          <button
            id="button-save"
            onClick={() => setOpenSetting(true)}
            className="hover:bg-slate-100 inline-block p-2 rounded-full"
          >
            <img
              className="pointer-events-none"
              src={tripleDot}
              alt="button setting"
              width={24}
            />
          </button>
        </div>

        <Header totalHarga={totalHarga} />
        <FormMain
          pricingDetails={pricingDetails}
          setPricingDetails={setPricingDetails}
        />

        <Footer pricingDetails={pricingDetails} />
      </main>

      {/* MODAL SETTING */}
      {openSetting && (
        <Modal
          setOpenSetting={setOpenSetting}
          pricingDetails={pricingDetails}
        />
      )}
    </>
  );
}

export default App;
