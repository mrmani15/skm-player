// Fetching Elements
const canvas = document.getElementById("canvas");
const audio = document.querySelector('audio');
const btn = document.getElementById('btn');

// context
const ctx = canvas.getContext("2d");

// variables
const color1 = "rgb(253, 252, 252)";
const color2 = "grey";
const color3 = "red";
const numberOfBars = 300;
const move = []
const line = []
let reps = 0
let isPaused = true
let percentage = 0
const thickness = 900 / numberOfBars;

// functions
function randomNo (min, max){
  return Math.random() * (max - min) + min
}

function randomvalue(){
  const val = randomNo(100, 180)
  move.push(val)
  const l = randomNo(200, 280)
  line.push(l)
}

function tag(bgColor, text, tx, ty, rx, ry, rw, rh) {
  // rectangle
  ctx.fillStyle = bgColor;
  ctx.fillRect(rx, ry, rw, rh);
  
  // text
  ctx.fillStyle = "white";
  ctx.font = "16pt sans-serif";
  ctx.fillText(text, tx, ty);
}

function drawLine (color, m1, m2, l1, l2){
  ctx.beginPath();
  ctx.strokeStyle = color
  ctx.lineWidth = '2'
  ctx.moveTo(m1, m2)
  ctx.lineTo(l1, l2)
  ctx.stroke();
}

function drawCircle(x,y,s, color) {
  ctx.beginPath();
  ctx.arc(x, y, s, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function fillColor(time) {
  if (time === 250) {
    clearInterval(timer)
  }
  for (let i = 0; i < numberOfBars; i++) {
    ctx.beginPath();
    randomvalue()
    ctx.strokeStyle = i % 2 ? color1 : color2;
    ctx.lineWidth = thickness;
    ctx.moveTo(i * thickness + thickness / 2, move[i]);
    ctx.lineTo(i * thickness + thickness / 2, line[i]);

    ctx.stroke();
  }
  for (let i = 0; i < time; i++) {
    ctx.beginPath();
    ctx.strokeStyle = i % 2 ? color1 : color3;
    ctx.lineWidth = thickness;
    ctx.moveTo(i * thickness + thickness / 2, move[i]);
    ctx.lineTo(i * thickness + thickness / 2, line[i]);
    ctx.stroke()
  }
}

const timer = setInterval(() => {
  if (!isPaused) {
    reps = reps + 1
    fillColor(reps)
  }
}, 500)

function playPause() {
  if (btn.classList.contains('fa-play')) {
    audio.play()
    isPaused = false
    btn.classList.remove('fa-play')
    btn.classList.add('fa-pause')
  } else {
    btn.classList.remove('fa-pause')
    btn.classList.add('fa-play')
    audio.pause()
    isPaused = true
  }
}

function clicking(event) {
  const x = event.clientX
  const y = event.clientY
  const w = canvas.width
  const h = canvas.height
  const pix = (window.innerWidth - w) / 2
  if (x < (x > pix && pix + w) && y < h) {
    const xax = x - pix
    let cw = xax / thickness
    percentage = (xax * 100) / w
    reps = cw
    fillColor(reps)
    audio.currentTime = (audio.duration * percentage) / 100
  }
}



for (let i = 0; i < numberOfBars; i++) {
  ctx.beginPath();
  randomvalue()
  ctx.strokeStyle = i % 2 ? color1 : color2;
  ctx.lineWidth = thickness;
  ctx.moveTo(i * thickness + thickness / 2, move[i]);
  ctx.lineTo(i * thickness + thickness / 2, line[i]);
  ctx.stroke();
}

document.addEventListener('click', clicking)
btn.addEventListener('click', playPause)

tag("black", "energy", 65, 50, 50, 25, 100, 40 );
tag("violet", "energy", 190, 50, 175, 25, 100, 40);
tag("blue", "energy", 450, 50, 435, 25, 100, 40)
tag("green", "rockk", 630, 80, 610, 53, 90, 40)
tag("teal", "energy", 750, 40, 730, 18, 100, 35)


drawLine('black', 100, 65, 100, 200)
drawLine('violet', 225, 65, 225, 200)
drawLine('blue', 485, 65, 485, 200)
drawLine('green', 655, 93, 655, 200)
drawLine('teal', 780, 53, 780, 200)

drawCircle(100,200,5, 'black')
drawCircle(225, 200, 5, 'violet')
drawCircle(485, 200, 5, 'blue')
drawCircle(655, 200, 5, 'green')
drawCircle(780, 200, 5, 'teal')

