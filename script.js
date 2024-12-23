const grid = document.getElementById("container");
const createGrid = document.getElementById("create-grid");
const penColorPicker = document.getElementById("pen-color-picker");
const canvasColorPicker = document.getElementById("canvas-color-picker");
const rainbowPen = document.getElementById("rainbow-pen");
const eraser = document.getElementById("eraser");

createGrid.addEventListener('click', function () {
    if (grid.firstChild) { // if grid already has divs, remove them
        grid.innerHTML = "";
    };
    let gridNumSide = prompt("Number of boxes per side (should be less than 100).");
    while (gridNumSide > 100) {
        gridNumSide = prompt("Number of boxes per side (should be less than 100).");
    };
    for (i = 0; i < gridNumSide * gridNumSide; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        div.style.width = `${500 / gridNumSide}px`; // Grid Container is 500 * 500 px
        div.style.height = `${500 / gridNumSide}px`;
        grid.appendChild(div)
    };
});

function randomColor() {
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);
    return rgbValue = `rgb(${red}, ${green}, ${blue})`;
};

let colormode = 'default'; 
function findColorMode() {
    if (colormode == "default") {
        return "black"
    } if (colormode == "erase") {
        return "";
    }
    if (colormode == "rainbow") {
        return randomColor();
    }
    if (colormode == "colorPicker") {
        return penColorPicker.value;
    }
};

function colorCurrentBox() {
    target = event.target;
    target.style.backgroundColor = findColorMode();
};

// on the first click, start hovering/coloring, on the next click, stop hovering.
let mouseover = "off";
grid.addEventListener('click', function () {
    if (!event.target.classList.contains('box')) return;
    if (mouseover === "on") {
        grid.removeEventListener('mouseover', colorCurrentBox)
        mouseover = "off";
        return;
    } else {
        colorCurrentBox(); // color the box that triggered the event
        grid.addEventListener('mouseover', colorCurrentBox)
        mouseover = "on";
    };
});

canvasColorPicker.addEventListener('input', function () {
    grid.style.backgroundColor = canvasColorPicker.value;
});

eraser.addEventListener('click', function () {
    colormode = "erase";
});

rainbowPen.addEventListener('click', function () {
    colormode = "rainbow"
});

penColorPicker.addEventListener('click', function () {
    colormode = "colorPicker";
});




