let days = document.querySelector(".day"),
  hours = document.querySelector(".hour"),
  minutes = document.querySelector(".min"),
  seconds = document.querySelector(".sec"),
  countDownDate = new Date("Dec 24, 2022 23:59:59").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();

  let dateDiff = countDownDate - dateNow;

  let day = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let second = Math.floor((dateDiff % (1000 * 60)) / 1000);

  days.innerHTML = day < 10 ? `0${day} <br /> Days` : `${day} <br /> Days`;

  hours.innerHTML =
    hour < 10 ? `0${hour} <br /> Hours` : `${hour} <br /> Hours`;
  minutes.innerHTML =
    minute < 10 ? `0${minute} <br /> Mins` : `${minute} <br /> Mins`;
  seconds.innerHTML =
    second < 10 ? `0${second} <br /> Secs` : `${second} <br /> Secs`;

  if (dateDiff == 0) {
    clearInterval(counter);
  }
}, 1000);

let snowMax = 50;

let snowColor = ["#DDD", "#EEE"];

let snowEntity = "&#x2022;";

let snowSpeed = 0.75;

let snowMinSize = 12;

let snowMaxSize = 30;

let snowRefresh = 50;

let snowStyles = "cursor: default; user-select: none;";

let snow = [],
  pos = [],
  coords = [],
  lefr = [],
  marginBottom,
  marginRight;

function randomise(range) {
  rand = Math.floor(range * Math.random());
  return rand;
}

function initSnow() {
  let snowSize = snowMaxSize - snowMinSize;
  marginBottom = document.body.scrollHeight - 5;
  marginRight = document.body.clientWidth - 15;

  for (i = 0; i <= snowMax; i++) {
    coords[i] = 0;
    lefr[i] = Math.random() * 15;
    pos[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById("flake" + i);
    snow[i].size = randomise(snowSize) + snowMinSize;
    snow[i].style.fontSize = snow[i].size + "px";
    snow[i].style.color = snowColor[randomise(snowColor.length)];
    snow[i].style.zIndex = 1000;
    snow[i].sink = (snowSpeed * snow[i].size) / 5;
    snow[i].posX = randomise(marginRight - snow[i].size);
    snow[i].posY = randomise(
      2 * marginBottom - marginBottom - 2 * snow[i].size
    );
    snow[i].style.left = snow[i].posX + "px";
    snow[i].style.top = snow[i].posY + "px";
  }

  moveSnow();
}

function resize() {
  marginBottom = document.body.scrollHeight - 5;
  marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
  for (i = 0; i <= snowMax; i++) {
    coords[i] += pos[i];
    snow[i].posY += snow[i].sink;
    snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
    snow[i].style.top = snow[i].posY + "px";

    if (
      snow[i].posY >= marginBottom - 2 * snow[i].size ||
      parseInt(snow[i].style.left) > marginRight - 3 * lefr[i]
    ) {
      snow[i].posX = randomise(marginRight - snow[i].size);
      snow[i].posY = 0;
    }
  }

  setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
  document.write(
    "<span id='flake" +
      i +
      "' style='" +
      snowStyles +
      "position:absolute;top:-" +
      snowMaxSize +
      "'>" +
      snowEntity +
      "</span>"
  );
}

window.addEventListener("resize", resize);
window.addEventListener("load", initSnow);
