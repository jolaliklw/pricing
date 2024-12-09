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
  const hargaAtas = listHarga?.filter((harga) => harga.pen === 'atas');
  const hargaBawah = listHarga?.filter((harga) => harga.pen === 'bawah');
  const promo = listHarga?.filter((harga) => harga.pen === 'promo');
  const online = listHarga?.filter((harga) => harga.pen === 'online');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    const v = e.target.value;
    if (id === 'harga') {
      setPricingDetails({ ...pricingDetails, hpr: v });
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
            {hargaAtas?.map(({ pen, kadar, harga }) => (
              <option key={pen + kadar} value={harga * 1000}>
                &uarr; {kadar}
              </option>
            ))}
          </optgroup>
          <optgroup label="HARGA BAWAH">
            {hargaBawah?.map(({ pen, kadar, harga }) => (
              <option key={pen + kadar} value={harga * 1000}>
                &darr; {kadar}
              </option>
            ))}
          </optgroup>
          <optgroup label="PROMO">
            {promo?.map(({ pen, kadar, harga }) => (
              <option key={pen + kadar} value={harga * 1000}>
                {pen} {kadar}
              </option>
            ))}
          </optgroup>
          <optgroup label="ONLINE">
            {online?.map(({ pen, kadar, harga }) => (
              <option key={pen + kadar} value={harga * 1000}>
                {pen} {kadar}
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
