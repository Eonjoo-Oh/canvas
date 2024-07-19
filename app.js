const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraseBtn = document.getElementById("eraser-btn");
const restartBtn = document.getElementById("restart-btn");
const modeBtn = document.getElementById("mode-btn")
const colorOptions = Array.from (document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

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

// ctx.fillRect(210 - 40, 200 - 40, 15, 100);
// ctx.fillRect(350 - 40, 200 - 40, 15, 100);
// ctx.fillRect(260 - 40, 200 - 40, 60, 200);

// ctx.arc(250, 100, 50, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, 1 * Math.PI, 2 * Math.PI);
// ctx.arc(220 + 10, 80, 8, 1 * Math.PI, 2 * Math.PI);
// ctx.fill();

//----------------------------------------

// draw with click

// ctx.lineWidth = 2;
// ctx.moveTo(0, 0);

// function onClick(event) {
// 	ctx.lineTo(event.offsetX, event.offsetY);
// 	ctx.stroke();
// }

// canvas.addEventListener("click", onClick)

//--------------------------------------

// ctx.lineWidth = 2;

// const colors = [
// 	"#ff3838",
// 	"#ffb8b8",
// 	"#c56cf0",
// 	"#ff9f1a",
// 	"#fff200",
// 	"#32ff7e",
// 	"#7efff5"
// ]
// function onClick(event) {
// 	ctx.beginPath();
// 	ctx.moveTo(0, 0);
// 	const color = colors[Math.floor(Math.random() * colors.length)];
// 	ctx.strokeStyle = color;
// 	ctx.lineTo(event.offsetX, event.offsetY);
// 	ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick)

//-------------------------------------------

ctx.lineWidth = lineWidth.value
let isPainting = false;
let isFilling = false;

function onMove (event) {
	if (isPainting) {
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		return;
	}
	ctx.beginPath();
	ctx.moveTo(event.offsetX,event.offsetY);
}

function onMouseDown() {
	isPainting = true;
}

function cancelPainting() {
	isPainting = false;
}

function onLineWidthChange(event) {
	//console.log(event.target.value);
	ctx.lineWidth = event.target.value;
	LineWidthInfoChange(event);
}

function LineWidthInfoChange(event) {
	rangeValue = document.getElementById("range-value");
	rangeValue.textContent = event.target.value
}

function onColorChange (event) {
	// console.log(event.target.value);
	ctx.strokeStyle = event.target.value;
	ctx.fillStyle = event.target.value;
}

function onColorClick (event) {
	// console.dir(event.target);
	const colorValue = event.target.dataset.color
	ctx.strokeStyle = colorValue;
	ctx.fillStyle = colorValue;colorValue;
	color.value = colorValue;
}

function onModeClick() {
	if (isFilling) {
		isFilling = false;
		modeBtn.innerText = "Fill";
	} else {
		isFilling = true;
		modeBtn.innerText = "Draw";
	}
}

function onCanvasClick() {
	if(isFilling) {
		ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
	}
}

function onRestartClick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
}

function onEraserClick() {
	ctx.strokeStyle = white;
	isFilling = false;
	modeBtn.innerText = "Fill";
}

function onFileChange(event) {
	// console.dir(event.target);
	const file = event.target.files[0];
	// const url = URL.createObjectURL(file);
	console.log(url);
	const image = new Image();
	image.src = url;
	image.onload = function() {
		onRestartClick();
		ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		// fileInput.value = null;
	}
}

function onDoubleClick(event) {
	// console.log(event.offsetX, event.offsetY);
	const text = textInput.value;
	if (text !== "") {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.font = "48px serif";
		ctx.fillText(text, event.offsetX, event.offsetY);
		ctx.restore();
	}
}

function onSaveClick() {
	// console.log(canvas.toDataURL());
	const url = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = url;
	a.download = "myDrawing.png";
	a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);
restartBtn.addEventListener("click", onRestartClick);
eraseBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);