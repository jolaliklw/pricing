export interface DetailHarga {
  status: string;
  pen: number;
  harga: number;
}

export type ListHarga = DetailHarga[];

export interface InitialState {
  hpr: string;
  berat: string;
  ppn?: string;
  extra?: string;
  listHarga: ListHarga;
}
