const gridContainer = document.querySelector(".grid-container");

for (i = 0; i < 625; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridContainer.appendChild(gridCell);
}

const button = document.querySelector("button")
const clearBoard = document.querySelector(".erase-board");
const erase = document.querySelector(".eraser");
const size = document.querySelector(".size-selector");
const rainbow = document.querySelector(".rainbow")

function draw() {
    
    const grid = document.querySelectorAll(".grid-cell");
    grid.forEach((cell) => {
        cell.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (erase.value == "off") {
                if (rainbow.value == "off") {
                cell.style.backgroundColor = "black"
                } else {
                cell.style.backgroundColor = `#${randomColour()}`
                }
            } else if (erase.value == "on") {       
                cell.style.backgroundColor = "white"}
        })
    })
    
    grid.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            if (erase.value == "off") {
                if (e.buttons > 0) {
                    if (rainbow.value == "off") {
                        cell.style.backgroundColor = "black"
                        } else {
                        cell.style.backgroundColor = `#${randomColour()}`
                    }
                } 
            } else if (erase.value == "on") {
                if (e.buttons > 0) {
                cell.style.backgroundColor = "white"
                }
            }
        })
    })
};

draw();

function selectSize() {
    removeGrid (gridContainer);
    let userInput = prompt("Please enter the size of the sketchpad (max size = 100")
    while (userInput > 100 || userInput == 0 || userInput < 0 || userInput === null) {
        userInput = prompt("Please enter another number that is less than 100")
    }
    for (i = 0; i < (userInput**2); i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridContainer.appendChild(gridCell);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${userInput}, 1fr)`;
    draw();
}

function removeGrid (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

size.addEventListener("click", selectSize)

window.addEventListener("mousedown", () => {
    mouseDown = true;
})

window.addEventListener("mouseup", () => {
    mouseDown = false;
})

clearBoard.addEventListener("click", eraseBoard);

function eraseBoard() {
    const grid = document.querySelectorAll(".grid-cell");
    grid.forEach(cell => {
        cell.style.backgroundColor = "white"
    })
};

function eraseBtnOn () {
    erase.style.color = "white";
    erase.style.backgroundColor = "black";
}

function eraseBtnOff () {
    erase.style.color = "black";
    erase.style.backgroundColor = "";
}

function rainbowBtnOn () {
    rainbow.style.color = "white";
    rainbow.style.backgroundColor = "black"
}

function rainbowBtnOff () {
    rainbow.style.color = "black";
    rainbow.style.backgroundColor = ""
}

//changing toggle eraser button background color.
erase.addEventListener("click", () => {
    if (erase.value == "off") {
        erase.value = "on";
        eraseBtnOn();
    } else {
        erase.value = "off";
        eraseBtnOff();
    }
})


rainbow.addEventListener("click", () => {
    if (rainbow.value == "off") {
        rainbow.value = "on";
        rainbowBtnOn();
    } else {
        rainbow.value ="off"
        rainbowBtnOff();
    }
})


function randomColour() {
    let randomColour = Math.floor(Math.random() * 16777215).toString(16);
    return randomColour;
  }