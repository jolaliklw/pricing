interface Props {
  harga: string;
  berat: string;
  handleChange: (e: { target: HTMLInputElement }) => void;
  handleFocus: (e: { target: HTMLInputElement }) => void;
}

const style = {
  wrapper: 'relative w-11/12 mx-auto formkit-field font-medium',
  label:
    'absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none',
  input:
    'w-full px-4 py-2 text-right border border-sky-100 rounded focus:outline-none focus:border-sky-300',
};

export default function Form({
  harga,
  berat,
  handleChange,
  handleFocus,
}: Props) {
  return (
    <form className="mt-8 flex flex-col gap-y-4">
      <div className={style.wrapper} key="harga">
        <label htmlFor="harga" className={style.label}>
          Harga/gr
        </label>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          id="harga"
          placeholder="Rp"
          maxLength={13}
          pattern="[0-9]*"
          inputMode="numeric"
          value={harga}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>

      <div className={style.wrapper} key="berat">
        <label className={style.label} htmlFor="berat">
          Berat
        </label>
        <input
          className={style.input}
          type="number"
          autoComplete="off"
          id="berat"
          placeholder="gr"
          min="0.00"
          step="0.01"
          pattern="[0-9]*"
          inputMode="numeric"
          value={berat}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </form>
  );
}
