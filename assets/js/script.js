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
  console.log(elements.length);
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
      const numberExtracted = document.querySelector("header h2");
      numberExtracted.innerText = number;
      found = true;
    }
  }
};

const reset = () => {
  const elements = document.querySelectorAll(".extracted");
  elements.forEach(element => element.classList.remove("extracted"));
  const numberExtracted = document.querySelector("header h2");
  numberExtracted.innerText = "";
};

createTombola();

document.querySelector("header button").addEventListener("click", estrai);
