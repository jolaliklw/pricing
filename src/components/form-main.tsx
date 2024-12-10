import Input from './ui/input';
import Select from './ui/select';
import { InitialState } from '../App';
import { useState } from 'react';
import { addDot } from '../lib/utils';

interface Props {
  pricingDetails: InitialState;
  setPricingDetails: React.Dispatch<React.SetStateAction<InitialState>>;
}

const handleFocus = (e: { target: HTMLInputElement }) => e.target.select();

export default function FormMain({ setPricingDetails, pricingDetails }: Props) {
  const [selectHarga, setSelectHarga] = useState('');

  const { listHarga } = pricingDetails;
  const hargaAtas = listHarga?.filter((ls) => ls.status === 'atas');
  const hargaBawah = listHarga?.filter((ls) => ls.status === 'bawah');
  const promo = listHarga?.filter((ls) => ls.status === 'promo');
  const online = listHarga?.filter((ls) => ls.status === 'online');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    const v = e.target.value;

    if (id === 'harga') {
      setPricingDetails({ ...pricingDetails, hpr: v.replace(/^0/, '') });
      return;
    }

    if (id === 'berat') {
      setPricingDetails({ ...pricingDetails, berat: v });
    }
  }

  const hargaPerGram = addDot(pricingDetails.hpr);

  return (
    <>
      <form
        tabIndex={-1}
        className="w-full sm:w-4/5 sm:mx-auto [&>:not(:last-child)]:mb-3"
      >
        <Select
          id="list-harga"
          value={selectHarga}
          onChange={(e) => {
            const v = e.target.value;
            setPricingDetails({ ...pricingDetails, hpr: v });
            setSelectHarga(v);
          }}
        >
          <option value="">-- Custom Harga --</option>
          <optgroup label="HARGA ATAS">
            {hargaAtas?.map(({ status, pen, harga }) => (
              <option key={status + pen} value={harga * 1000}>
                &uarr; {pen} __ @{harga}
              </option>
            ))}
          </optgroup>
          <optgroup label="HARGA BAWAH">
            {hargaBawah?.map(({ pen, status, harga }) => (
              <option key={status + pen} value={harga * 1000}>
                &darr; {pen} __ @{harga}
              </option>
            ))}
          </optgroup>
          <optgroup label="PROMO">
            {promo?.map(({ pen, status, harga }) => (
              <option key={status + pen} value={harga * 1000}>
                {status} {pen}
              </option>
            ))}
          </optgroup>
          <optgroup label="ONLINE">
            {online?.map(({ pen, status, harga }) => (
              <option key={status + pen} value={harga * 1000}>
                {status} {pen}
              </option>
            ))}
          </optgroup>
        </Select>

        <Input
          label="Harga/gr"
          id="harga"
          placeholder="Rp"
          type="text"
          maxLength={13}
          value={hargaPerGram}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={selectHarga !== ''}
        />

        <Input
          label="Berat"
          id="berat"
          placeholder="gr"
          type="number"
          min="0.00"
          step="0.01"
          value={pricingDetails.berat}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </form>
    </>
  );
}
