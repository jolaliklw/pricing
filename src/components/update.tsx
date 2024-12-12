import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { InitialState, ListHarga } from '../types';

import Separator from './ui/separator';
import loading from '../assets/throbber_small.svg';
import crIcon from '../assets/cr-icon.svg';
import { getLocalData, setLocalData } from '../lib/utils';

async function getData() {
  const { data } = await fetch(
    'https://script.google.com/macros/s/AKfycbzcrgMErtSG1KeJvIMNx7YJ1klxWy1Fti4qeLInrmDXejRrAGj1Dcsrkazrb9xbYI5a/exec'
  ).then((res) => res.json());

  return data as ListHarga;
}

interface Props {
  pricingDetails: InitialState;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ceckUpdate = (x: ListHarga, y: ListHarga) => {
  const hargaAtasLocal = x[0]?.pen;
  const hargaBawahLocal = x[0]?.harga;
  const hargaAtasServer = y[0]?.pen;
  const hargaBawahServer = y[0]?.harga;
  const verLocal = x[0]?.status;
  const verServer = y[0]?.status;

  return (
    hargaAtasLocal !== hargaAtasServer ||
    hargaBawahLocal !== hargaBawahServer ||
    verLocal !== verServer
  );
};

export default function Update({ pricingDetails, setIsUpdate }: Props) {
  const [update, setUpdate] = useState(true);
  const [isNewData, setIsNewData] = useState(false);

  const reload = useRef(crypto.randomUUID());
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['list-harga', reload],
    queryFn: getData,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      const localData = getLocalData();
      const isUptoDate = ceckUpdate(localData.listHarga, data);

      if (isUptoDate) {
        setLocalData({
          ...pricingDetails,
          listHarga: data,
          berat: '',
          hpr: '',
        });
      }
      setIsUpdate((prev) => !prev);
      setIsNewData(isUptoDate);
    }
  }, [data]);

  if (update)
    return (
      <div>
        <button
          onClick={() => {
            refetch();
            setUpdate(!update);
            setIsUpdate((prev) => !prev);
          }}
          className="text-blue-500 border-b border-blue-500 font-extralight"
        >
          Update harga
        </button>
      </div>
    );

  if (isPending)
    return (
      <div className="flex gap-x-4 font-extralight">
        <div className="w-4 h-fit place-self-center">
          <img src={loading} alt="throbber small" width={24} />
        </div>
        <p>Sedang update harga</p>
      </div>
    );

  if (error)
    return (
      <div className="flex gap-x-2 font-extralight">
        <p>Gagal update harga,</p>
        <button
          onClick={() => refetch()}
          className="text-blue-500 border-b border-blue-500"
        >
          Coba lagi
        </button>
      </div>
    );

  return (
    <div className="flex items-center gap-x-4 font-extralight">
      {isNewData ? (
        <>
          <p>Sudah di update ke harga terbaru</p>
          <Separator height="h-8" />
          <button
            onClick={() => location.reload()}
            className="border border-blue-500 text-blue-500 py-2 px-6 rounded-3xl"
          >
            Reload
          </button>
        </>
      ) : (
        <>
          <img src={crIcon} alt="cr-icon" width={20} height={20} />
          <p>Harga sudah up to date</p>
        </>
      )}
    </div>
  );
}
