const gridContainer = document.querySelector(".grid-container");

for (i = 0; i < 625; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridContainer.appendChild(gridCell);
}

const clearBoard = document.querySelector(".erase-board");
const erase = document.querySelector(".eraser");
const size = document.querySelector(".size-selector");
let mouseDown = false;

function draw() {
    
    const grid = document.querySelectorAll(".grid-cell");
    grid.forEach((cell) => {
        cell.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (erase.value == "off") {        
                mouseDown = true;
                cell.style.backgroundColor = "black"}
            else {       
                mouseDown = true;
                cell.style.backgroundColor = "white"}
        })
    })
    
    grid.forEach((cell) => {
        cell.addEventListener("mouseup", (e) => {
            e.preventDefault();
            if (erase.value =="off") {mouseDown = false;
                if (cell.style.backgroundColor == "black") {
                    cell.style.backgroundColor == "black";
                } else if (cell.style.backgroundColor == "white") {
                    cell.style.backgroundColor == "white"
                }} else {mousedown = false;
                    if (cell.style.backgroundColor == "white") {
                    cell.style.backgroundColor == "white";
                } else if (cell.style.backgroundColor == "black") {
                    cell.style.backgroundColor == "black"
                }}
        })
    })
    
    grid.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            if (erase.value == "off") {if (mouseDown) {
                cell.style.backgroundColor = "black"
            } else if (mouseDown == false && cell.style.backgroundColor == "black") {
                cell.style.backgroundColor = "black"
            }} else {if (mouseDown) {
                cell.style.backgroundColor = "white"
            } else if (mouseDown == false && cell.style.backgroundColor == "white") {
                cell.style.backgroundColor = "white"
            }}
            
            
        })
    })
    
    grid.forEach((cell) => {
        cell.addEventListener("mouseleave", (e) => {
            e.preventDefault();
            if (erase.value == "off") {if (mouseDown) {
                cell.style.backgroundColor = "black"
            } else if (mouseDown == false && cell.style.backgroundColor == "black") {
                cell.style.backgroundColor = "black"
            }} else {if (mouseDown) {
                cell.style.backgroundColor = "white"
            } else if (mouseDown == false && cell.style.backgroundColor == "white") {
                cell.style.backgroundColor = "white"
            }}
            
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

//changing toggle eraser button background color.
erase.addEventListener("click", () => {
    if (erase.value == "off") {
        erase.value = "on";
        erase.style.color = "white"
        erase.style.backgroundColor = "black"
    } else if (erase.value == "on") {
        erase.value = "off";
        erase.style.color = "black"
        erase.style.backgroundColor = ""
    }
})