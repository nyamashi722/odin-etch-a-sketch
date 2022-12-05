const gridContainer = document.querySelector(".grid-container");
let mouseDown = false;

window.addEventListener("mousedown", () => {
    mouseDown = true;
})

window.addEventListener("mouseup", () => {
    mouseDown = false;
})


for (i = 0; i < 625; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridContainer.appendChild(gridCell);
}

const grid = document.querySelectorAll(".grid-cell");

grid.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
        mouseDown = true;
        cell.style.backgroundColor = "black";
    })
})

grid.forEach((cell) => {
    cell.addEventListener("mouseup", () => {
        mouseDown = false;
        if (cell.style.backgroundColor == "black") {
            cell.style.backgroundColor == "black";
        } else if (cell.style.backgroundColor == "white") {
            cell.style.backgroundColor == "white"
        }
        
        
    })
})

grid.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
        if (mouseDown) {
            cell.style.backgroundColor = "black"
        } else if (mouseDown == false && cell.style.backgroundColor == "black") {
            cell.style.backgroundColor = "black"
        }
        
    })
})

grid.forEach((cell) => {
    cell.addEventListener("mouseleave", () => {
        if (mouseDown) {
            cell.style.backgroundColor = "black"
        } else if (mouseDown == false && cell.style.backgroundColor == "black") {
            cell.style.backgroundColor = "black"
        }
    })
})

const button = document.querySelector(".erase-board");
button.addEventListener("click", eraseBoard)

function eraseBoard() {
    grid.forEach(cell => {
        cell.style.backgroundColor = "white"
    })
};