const container = document.querySelector(".container");
const btns = document.querySelectorAll(".btn");
let currentColor = "black";
const reset = document.querySelector(".reset");
const grid = document.querySelector(".grid");

for (let i = 0; i < 256; i++) {
  const div = document.createElement("div");
  div.classList.add("square");
  container.appendChild(div);
}

const squares = document.querySelectorAll(".square");

squares.forEach(function (item) {
  item.addEventListener("mouseenter", mouseEnter);
});

function mouseEnter(x) {
  if (currentColor === "rainbow") {
    x.target.style.backgroundColor = generateRainbow();
  } else {
    x.target.style.backgroundColor = currentColor;
  }
}

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const style = e.target.classList;
    btns.forEach((b) => b.classList.remove("selected"));

    btn.classList.add("selected");
    if (style.contains("orange")) {
      currentColor = "orange";
    } else if (style.contains("rainbow")) {
      currentColor = "rainbow";
    } else if (style.contains("erase")) {
      currentColor = "white";
    } else if (style.contains("normal")) {
      currentColor = "black";
    }
  });
});

reset.addEventListener("click", resetAll);

function resetAll() {
  btns.forEach((b) => b.classList.remove("selected"));
  squares.forEach(function (square) {
    square.style.backgroundColor = "white";
  });
  currentColor = "black";
}

function generateRainbow() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue},100%,50%)`;
}

function createGrid(size) {
  container.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.addEventListener("mouseenter", mouseEnter);
    div.style.width = `${100 / size}%`;
    div.style.height = `${100 / size}%`;
    container.appendChild(div);
  }
}

grid.addEventListener("click", function () {
  let input;
  do {
    input = prompt("Enter a number between 1 to 100");
    input = Number(input);
  } while (isNaN(input) || input < 1 || input > 100);
  currentColor = "black";
  btns.forEach((b) => b.classList.remove("selected"));
  createGrid(input);
  resetAll();
});
