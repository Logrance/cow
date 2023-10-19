// script.js
const image = document.getElementById('image');
const canvas = document.getElementById('drawingCanvas');
canvas.width = image.width;
canvas.height = image.height;
const ctx = canvas.getContext('2d');

let drawing = false;
let erasing = false;

canvas.addEventListener('mousedown', (e) => {
    if (erasing) {
        erase(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    } else {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }
});

canvas.addEventListener('mouseup', () => {
    if (drawing) {
        drawing = false;
        ctx.closePath();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing && !erasing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    if (erasing) {
        erase(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    } else {
        ctx.strokeStyle = 'black';
        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }
});

function erase(x, y) {
    ctx.clearRect(x - 5, y - 5, 10, 10); // Adjust for erasing width and height
}

// Toggle between drawing and erasing modes
document.getElementById('toggleErase').addEventListener('click', () => {
    erasing = !erasing;

    // Change the cursor style based on the mode
    canvas.style.cursor = erasing ? 'crosshair' : 'auto';
});

// cow.js
const normalSrc = image.getAttribute('src');
const hoverSrc = image.getAttribute('data-hover-src');

image.addEventListener('mouseenter', () => {
    image.setAttribute('src', hoverSrc);
});

image.addEventListener('mouseleave', () => {
    image.setAttribute('src', normalSrc);
});

// The rest of your JavaScript code for the canvas and button can go here
