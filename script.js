// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// ====================
//
// ====================
// get data from local storage
const dataStored = JSON.parse(window.localStorage.getItem("data"));

if (!dataStored) {
  const data = { platform: ".", hpr: "", ppn: 0, extra: 0 };
  window.localStorage.setItem("data", JSON.stringify(data));
  location.reload();
}
// localStorage.clear();

if (dataStored) {
  document
    .querySelector("input#harga")
    .setAttribute("value", numberWithDot(dataStored.hpr.toString()));

  document.querySelector("#set-ppn").setAttribute("value", dataStored.ppn);

  document.querySelector("#set-extra").setAttribute("value", dataStored.extra);
}

const hargaBaru = document.querySelector("input#harga");
const berat = document.querySelector("input#berat");
const inputs = document.querySelectorAll("input");
const showHarga = document.querySelector("#show-harga .nominal");
const shortInfo = document.querySelector(".short-info p");

function numberWithDot(x) {
  x = x.replace(/[^,\d]/g, "").toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");

  return x;
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    // style: 'currency',
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const totalHarga = () => {
  // replace . to emty
  const hargaPerGram = hargaBaru.value.replace(/[\s.]/g, "");
  // pembulatan angka
  const hargaAkhir = Math.round(
    hargaPerGram * berat.value * (dataStored.ppn / 100 + 1) +
      Number(dataStored.extra)
  );

  const convertToRp = rupiah(hargaAkhir);

  if (Number(berat.value) > 0) {
    return (showHarga.innerHTML = convertToRp);
  }

  return (showHarga.innerHTML = 0);
};

inputs.forEach((input) => {
  // SELECT ALL VALUE
  input.addEventListener(`focus`, () => input.select());

  input.oninput = (e) => {
    if (e.target.id === "harga") {
      e.target.value = numberWithDot(e.target.value);
    }

    totalHarga();
  };

  // click enter to save
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      if (event.target.id == "berat") {
        const addDecimals = Number(event.target.value);
        event.target.value = addDecimals.toFixed(2);

        // save input harga baru when enter
        if (numberWithDot(dataStored.hpr.toString()) !== hargaBaru.value) {
          dataStored.hpr = hargaBaru.value;
          window.localStorage.setItem("data", JSON.stringify(dataStored));
        }
      }

      event.target.blur();
    }
  });
});

// click anywhere to save
window.addEventListener("click", (e) => {
  e.preventDefault();

  // click anywhere kecuali ini
  if (e.target.id === "berat" || e.target.id === "harga") {
    e.target.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  if (berat.value >= 0.01) {
    const addDecimals = Number(berat.value);
    berat.value = addDecimals.toFixed(2);
  }

  // save harga baru when tap anywhere
  if (dataStored) {
    if (numberWithDot(dataStored.hpr.toString()) !== hargaBaru.value) {
      dataStored.hpr = hargaBaru.value;
      window.localStorage.setItem("data", JSON.stringify(dataStored));
    }
  }
});

// format 1000 to 1k
const formatNumber = (number) => {
  number = number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  });

  return number;
};

if (!dataStored) {
  shortInfo.innerHTML = "data not found.";
} else {
  shortInfo.innerHTML = `${dataStored.platform} / ${formatNumber(
    dataStored.ppn == 0 ? "-" : dataStored.ppn
  )} / ${
    dataStored.extra == 0 ? "-" : formatNumber(Number(dataStored.extra))
  } ${"\u00A9" + new Date().getFullYear()}`;
}

// modal
const modal = document.querySelector(".setting-modal");
const btnOpenModal = document.querySelector(".btn-open-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const btnSave = document.querySelector(".btn-save");
const setPpn = document.querySelector("#set-ppn");
const setExtra = document.querySelector("#set-extra");

btnOpenModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

btnCloseModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

btnSave.addEventListener("click", (e) => {
  e.preventDefault();

  if (setPpn.value.length == 0) {
    dataStored.ppn = 0;
  }
  if (setExtra.value.length == 0) {
    dataStored.extra = 0;
  }
  dataStored.platform = "-";
  dataStored.ppn = setPpn.value;
  dataStored.extra = setExtra.value;
  window.localStorage.setItem("data", JSON.stringify(dataStored));
  location.reload();
  modal.style.display = "none";
});
