const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;


// canvas 기본 동작들

// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();


// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();
// setTimeout(() => {ctx.fill();}, 5000);

// -----------------------------------------

// 단축하지 않은 rectangle 그리기

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50); // x, y 좌표 까지 라인을 긋는다. 
// ctx.fill();

// ----------------------------

// drawing house

// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 2;
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

//----------------------------------

//drawing a person 

ctx.fillRect(210 - 40, 200 - 40, 15, 100);
ctx.fillRect(350 - 40, 200 - 40, 15, 100);
ctx.fillRect(260 - 40, 200 - 40, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260 + 10, 80, 8, 1 * Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80, 8, 1 * Math.PI, 2 * Math.PI);
ctx.fill();