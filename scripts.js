iterations = 500;
number = 20;
thickness = 0.15;
percent = 0.05;
speed = 1;

canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
points = [];

onResize();
step();
window.addEventListener("resize", onResize);

function onResize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  generate();
}

function generate() {
  points = [];

  for (let count = 0; count < number; count++) {
    points.push({
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random(),
      vx: -speed + Math.random() * speed * 2,
      vy: -speed + Math.random() * speed * 2,
    });
  }
}

function step() {
  move();
  draw();
  window.setTimeout(() => window.requestAnimationFrame(step), 20);
}

function move() {
  points.forEach((point) => {
    if (point.x < 0) {
      point.x = 0;
      point.vx = Math.abs(point.vx);
    }
    if (point.y < 0) {
      point.y = 0;
      point.vy = Math.abs(point.vy);
    }
    if (point.x > canvas.width) {
      point.x = canvas.width;
      point.vx = -Math.abs(point.vx);
    }
    if (point.y > canvas.height) {
      point.y = canvas.height;
      point.vy = -Math.abs(point.vy);
    }
    point.x += point.vx;
    point.y += point.vy;
  });
}

function draw() {
  if (points.length !== number) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const allPoints = [...points];
  for (let count = number; count < iterations; count++) {
    const pointA = allPoints[count - number];
    const pointB = allPoints[count - number + 1];

    allPoints.push({
      x: pointA.x + (pointB.x - pointA.x) * percent,
      y: pointA.y + (pointB.y - pointA.y) * percent,
    });
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = thickness;
  ctx.beginPath();
  ctx.moveTo(allPoints[0].x, allPoints[0].y);
  for (const point of allPoints) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}
