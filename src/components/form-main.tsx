import Input from './ui/input';
import Select from './ui/select';
import { InitialState, ListHarga } from '../types';
import { useState } from 'react';
import { addDot } from '../lib/utils';

interface Props {
  pricingDetails: InitialState;
  setPricingDetails: React.Dispatch<React.SetStateAction<InitialState>>;
}

function OptionGroup({
  label,
  dataList,
}: {
  label: string;
  dataList: ListHarga;
}) {
  const icon = (x: string) => {
    let icon;

    switch (x) {
      case 'atas':
        icon = '\u2191';
        break;
      case 'bawah':
        icon = '\u2193';
        break;
      case 'promo':
        icon = '\u2117';
        break;
      default:
        icon = x;
    }

    return icon;
  };

  return (
    <optgroup label={label}>
      {dataList?.map(({ status, pen, harga }) => (
        <option key={status + pen} value={harga * 1000}>
          {icon(status)} {pen} - @{harga}
        </option>
      ))}
    </optgroup>
  );
}

export default function FormMain({ setPricingDetails, pricingDetails }: Props) {
  const [selectHarga, setSelectHarga] = useState('');

  const { listHarga } = pricingDetails;
  const hargaAtas = listHarga?.filter((ls) => ls.status === 'atas');
  const hargaBawah = listHarga?.filter((ls) => ls.status === 'bawah');
  const hargaPromo = listHarga?.filter((ls) => ls.status === 'promo');
  const hargaOnline = listHarga?.filter((ls) => ls.status === 'online');

  const handleFocus = (e: { target: HTMLInputElement }) => e.target.select();

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
          <OptionGroup label="HARGA ATAS" dataList={hargaAtas} />
          <OptionGroup label="HARGA BAWAH" dataList={hargaBawah} />
          {hargaPromo.length && (
            <OptionGroup label="PROMO" dataList={hargaPromo} />
          )}
          {hargaOnline.length && (
            <OptionGroup label="ONLINE" dataList={hargaOnline} />
          )}
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
