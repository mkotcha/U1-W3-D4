let ambo = false;

const createTombola = () => {
  const container = document.querySelector("main > section");
  for (let i = 1; i <= 76; i++) {
    container.innerHTML += `<div id="num-${i}">${i}</div>`;
  }
};

const isExtracted = number => {
  if (document.querySelector(`#num-${number}.extracted`)) return true;
  else return false;
};

const canIGo = () => {
  const elements = document.querySelectorAll(".extracted");
  if (elements.length < 76) return true;
  else return false;
};

const estrai = () => {
  const max = 76;
  let found = false;
  while (!found && canIGo()) {
    let number = Math.floor(Math.random() * max) + 1;
    if (!isExtracted(number)) {
      const numberBox = document.querySelector(`#num-${number}`);
      numberBox.classList.add("extracted");
      const cartelNumber = document.querySelectorAll(".cel");
      cartelNumber.forEach(element => {
        if (parseInt(element.innerText) === number) {
          element.classList.add("extracted");
        }
      });
      const numberExtracted = document.querySelector("header h2");
      numberExtracted.innerText = number;
      found = true;
    }
  }
  isAmbo();
};

const reset = () => {
  const elements = document.querySelectorAll(".extracted");
  elements.forEach(element => element.classList.remove("extracted"));
  const numberExtracted = document.querySelector("header h2");
  numberExtracted.innerText = "";
  document.querySelectorAll(".cartel").forEach(element => element.remove());
};

function numSort(ar) {
  let i = 0,
    j;
  while (i < ar.length) {
    j = i + 1;
    while (j < ar.length) {
      if (ar[j] < ar[i]) {
        let temp = ar[i];
        ar[i] = ar[j];
        ar[j] = temp;
      }
      j++;
    }
    i++;
  }
}

const randomize = () => {
  const numbers = [];

  for (let i = 0; i < 3; i++) {
    const number5 = [];
    for (let j = 0; j < 5; j++) {
      let num = Math.floor(Math.random() * 76) + 1;
      number5.push(num);
    }
    console.log(number5);
    numSort(number5);
    numbers.push(number5);
  }
  return numbers;
};

const randomize2 = () => {
  const numbers = [];

  for (let i = 0; i < 3; i++) {
    const number5 = [];
    const est = [];

    for (let j = 0; j < 5; j++) {
      let notEst = true;
      let num = 0;
      while (notEst) {
        let numR = Math.floor(Math.random() * 8);

        if (numR !== est[0] && numR !== est[1] && numR !== est[2] && numR !== est[3] && numR !== est[4]) {
          let numR2 = Math.floor(Math.random() * 9);
          num = numR * 10 + numR2;
          if (num <= 76) {
            notEst = false;
            est.push(numR);
          }
        }
      }
      number5.push(num);
    }
    console.log(number5);
    numSort(number5);
    numbers.push(number5);
  }
  return numbers;
};

const isAmbo = () => {
  const row = document.querySelectorAll(".row");
  let est = 0;
  row.forEach(element => {
    console.log(element.querySelectorAll(".extracted"));
    if (element.querySelectorAll(".extracted").length === 2 && ambo === false) {
      alert("AMBO!");
      ambo = true;
    }
  });
};

function creaCartelle(event) {
  event.preventDefault();
  reset();

  const numCart = event.target.elements[0].value;
  //   console.log(numbers);
  for (let i = 0; i < numCart; i++) {
    const numbers = randomize2();
    const cartel = document.createElement("div");
    cartel.classList.add("cartel");
    for (let j = 0; j < 3; j++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let k = 0; k < 5; k++) {
        const cel = document.createElement("div");
        cel.classList.add("cel");
        cel.innerText = numbers[j][k];
        row.appendChild(cel);
      }
      cartel.appendChild(row);
    }
    document.querySelector("main").appendChild(cartel);
  }
}

createTombola();

document.querySelector("header button").addEventListener("click", estrai);
document.querySelector("main > button").addEventListener("click", reset);
document.querySelector("form").addEventListener("submit", creaCartelle);
