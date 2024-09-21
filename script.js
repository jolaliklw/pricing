// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// ====================
//
// ====================
// get data from local storage
// const saveHargaBaru = window.localStorage;
// saveHargaBaru.setItem('hargaBaru', 123);
// console.log(window.localStorage.getItem('hargaBaru'));
// const data = { asdf: 123, qwer: 900 };
// data.asdf = 'ganti';
// console.log(data);

const ppn = 7;
const tambahanHarga = 15000;

if (false) {
  document.querySelector('input#harga').setAttribute('value', '2.000');
}

const hargaBaru = document.querySelector('input#harga');
const berat = document.querySelector('input#berat');
const inputs = document.querySelectorAll('input');
const showHarga = document.querySelector('#show-harga .nominal');

// add 2 digit angka di belakang
// const tesNomer = 2.18;
// console.log(tesNomer.toFixed(2));
// console.log(Number(Math.round(tesNomer + "e2") + "e-2"));

function numberWithDot(x) {
  x = x.replace(/[^,\d]/g, '').toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1.$2');

  return x;
}

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    // style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

const totalHarga = () => {
  // replace . to emty
  const hargaPerGram = hargaBaru.value.replace(/[\s.]/g, '');
  // pembulatan angka
  const hargaAkhir = Math.round(
    hargaPerGram * berat.value * (ppn / 100 + 1) + tambahanHarga
  );

  const convertToRp = rupiah(hargaAkhir);
  showHarga.innerHTML = convertToRp;
};

inputs.forEach((input) => {
  // SELECT ALL VALUE
  input.addEventListener(`focus`, () => input.select());

  input.oninput = (e) => {
    if (e.target.id === 'harga') {
      e.target.value = numberWithDot(e.target.value);
    }

    totalHarga();
  };

  // click enter to save
  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      if (event.target.id == 'berat') {
        const addDecimals = Number(event.target.value);
        event.target.value = addDecimals.toFixed(2);
      }

      event.target.blur();
    }
  });
});

// click anywhere to save
window.addEventListener('click', (e) => {
  // e.preventDefault();

  // click anywhere kecuali ini
  if (e.target.id === 'berat' || e.target.id === 'harga') {
    e.target.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  if (berat.value >= 0.01) {
    const addDecimals = Number(berat.value);
    berat.value = addDecimals.toFixed(2);
  }
});
