import Separator from './ui/separator';
import { InitialState } from '../App';
import { formatToK } from '../lib/utils';

interface Props {
  pricingDetails: InitialState;
}

export default function Footer({ pricingDetails }: Props) {
  let { ppn, extra, listHarga } = pricingDetails;

  const hargaAtas = listHarga[0]?.pen ?? '-';
  const hargaBawah = listHarga[0]?.harga ?? '-';

  ppn = Number(ppn) > 0 ? ppn : '-';
  extra = Number(extra) > 0 ? formatToK(Number(extra)) : '-';

  return (
    <footer>
      <div className="flex items-center text-xs text-gray-400 font-mono">
        <div>{hargaAtas}</div>
        <Separator />
        <div>{hargaBawah}</div>
        <Separator />
        <div>{ppn}</div>
        <Separator />
        <div>{extra}</div>
        <div className="font-sans ml-4">&copy; {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
