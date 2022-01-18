// define default settings
const DEFAULT_COLOR = 'black'
const DEFAULT_MODE = 'black'
const DEFAULT_SIZE = 16

// assign default settings to variables
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

// function that changes the color
function changeColor(e) {
    if (currentMode === 'black') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'color') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
}

// function that builds a grid in the "grid-container"
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList = 'grid-item'
      gridElement.addEventListener('mouseover', changeColor)
      grid.appendChild(gridElement)
    }
  }


// function that clears the grid
function clearGrid(){
    grid.innerHTML = '';
}

// function that reloads the grid
function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

// BUTTONS // 
// event listener for black mode button click
const blackMode = document.querySelector('#black');
blackMode.addEventListener('click', () => {
    currentMode = 'black';
    currentColorMode.style.background = `black`
});

// event listener for color mode button click
const colorMode = document.querySelector('#color');
colorMode.addEventListener('click', () => {
    currentMode = 'color';
    currentColorMode.style.background = `-webkit-gradient(
                                            linear, left top, right top, 
                                            color-stop(0%,#ff0000), 
                                            color-stop(16.67%,#ffff00), 
                                            color-stop(33.33%,#00ff00),
                                            color-stop(50%,#00ffff), 
                                            color-stop(66.67%,#0000ff),
                                            color-stop(83.33%,#ff00ff), 
                                            color-stop(100%,#ff0000)
                                        )`;
});

// event listener for eraser button click
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
    currentMode = 'eraser';
    currentColorMode.style.background = `white`;
});

// event listener for reset button click
const reset = document.querySelector('#reset');
reset.addEventListener('click', reloadGrid);

// SLIDER //
// target slider 
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')

// function that shows the size of the updated grid elements
function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`
}

function changeSize(value) {
    reloadGrid();
    currentSize = value;
}

// event listener for slider
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
  }