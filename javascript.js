const gridContainer = document.querySelector(".grid-container");

for (i = 0; i < 625; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridContainer.appendChild(gridCell);
}

const buttons = document.querySelectorAll("button")
const clearBoard = document.querySelector(".erase-board");
const erase = document.querySelector(".eraser");
const size = document.querySelector(".size-selector");
const rainbow = document.querySelector(".rainbow")
const shade = document.querySelector(".shade")

function draw() {
    const grid = document.querySelectorAll(".grid-cell");
    grid.forEach((cell) => {
        cell.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (erase.value == "off") {
                if (rainbow.value == "off" && shade.value == "off") {
                    e.target.style.backgroundColor = "rgb(0, 0, 0)"
                    e.target.setAttribute("data-filled", "true")
                    e.target.removeAttribute("data-shaded")
                    e.target.removeAttribute("data-colored")
                } else if (rainbow.value == "on" && shade.value == "off") {
                    e.target.style.backgroundColor = `#${randomColor()}`
                    e.target.setAttribute("data-colored", "true")
                    e.target.removeAttribute("data-shaded")
                    e.target.removeAttribute("data-filled")
                } else if (rainbow.value == "off" && shade.value == "on") {
                    if (!e.target.dataset.shaded && !e.target.dataset.filled && !e.target.dataset.colored) {
                        e.target.style.backgroundColor = "rgb(240, 240, 240)"
                        e.target.setAttribute("data-shaded", "1")
                        e.target.removeAttribute("data-colored")
                        e.target.removeAttribute("data-filled")
                    } else if (!e.target.dataset.shaded && e.target.dataset.filled && !e.target.dataset.colored) {
                        e.target.style.backgroundColor = "rgb(0, 0, 0)"
                    } else if (!e.target.dataset.shaded && !e.target.dataset.filled && e.target.dataset.colored) {
                        e.target.style.backgroundColor = `${newShade(e.target.style.backgroundColor)}`
                    } else {
                        if (e.target.dataset.shaded < 18) {
                            let shadeValue = parseFloat(e.target.getAttribute("data-shaded"));
                            shadeValue++;
                            e.target.setAttribute("data-shaded", `${shadeValue}`)
                            e.target.style.backgroundColor = `${newShade(e.target.style.backgroundColor)}`
                        }
                    }
                }
            } else if (erase.value == "on") {       
                e.target.style.backgroundColor = "rgb(255, 255, 255)"
                e.target.removeAttribute("data-shaded")
                e.target.removeAttribute("data-filled")
                e.target.removeAttribute("data-colored")
            }
        })
    })
    grid.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            if (erase.value == "off") {
                if (e.buttons > 0) {
                    if (rainbow.value == "off" && shade.value == "off") {
                        e.target.style.backgroundColor = "rgb(0, 0, 0)"
                        e.target.setAttribute("data-filled", "true")
                        e.target.removeAttribute("data-shaded")
                        e.target.removeAttribute("data-colored")
                    } else if (rainbow.value == "on" && shade.value == "off") {
                        e.target.style.backgroundColor = `#${randomColor()}`
                        e.target.setAttribute("data-colored", "true")
                        e.target.removeAttribute("data-shaded")
                        e.target.removeAttribute("data-filled")
                    } else if (rainbow.value == "off" && shade.value == "on") {
                        if (!e.target.dataset.shaded && !e.target.dataset.filled && !e.target.dataset.colored) {
                            e.target.style.backgroundColor = "rgb(240, 240, 240)"
                            e.target.setAttribute("data-shaded", "1")
                            e.target.removeAttribute("data-colored")
                            e.target.removeAttribute("data-filled")
                        } else if (!e.target.dataset.shaded && e.target.dataset.filled && !e.target.dataset.colored) {
                            e.target.style.backgroundColor = "rgb(0, 0, 0)"
                        } else if (!e.target.dataset.shaded && !e.target.dataset.filled && e.target.dataset.colored) {
                            e.target.style.backgroundColor = `${newShade(e.target.style.backgroundColor)}`
                        } else {
                            if (e.target.dataset.shaded < 18) {
                                let shadeValue = parseFloat(e.target.getAttribute("data-shaded"));
                                shadeValue++;
                                e.target.setAttribute("data-shaded", `${shadeValue}`)
                                e.target.style.backgroundColor = `${newShade(e.target.style.backgroundColor)}`
                            }
                        }
                    }
                } 
            } else if (erase.value == "on") {
                if (e.buttons > 0) {
                    e.target.style.backgroundColor = "rgb(255, 255, 255)"
                    e.target.removeAttribute("data-shaded")
                    e.target.removeAttribute("data-filled")
                    e.target.removeAttribute("data-colored")
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
        cell.style.backgroundColor = "rgb(255, 255, 255)"
        cell.removeAttribute("data-shaded")
        cell.removeAttribute("data-filled")
        cell.removeAttribute("data-colored")
    })
};

function eraseBtnOn () {
    erase.value = "on"
    erase.style.color = "rgb(255, 255, 255)";
    erase.style.backgroundColor = "rgb(0, 0, 0)";
}

function eraseBtnOff () {
    erase.value = "off";
    erase.style.color = "rgb(0, 0, 0)";
    erase.style.backgroundColor = "";
}

function rainbowBtnOn () {
    rainbow.value = "on";
    rainbow.style.color = "rgb(255, 255, 255)";
    rainbow.style.backgroundColor = "rgb(0, 0, 0)";
}

function rainbowBtnOff () {
    rainbow.value = "off";
    rainbow.style.color = "rgb(0, 0, 0)";
    rainbow.style.backgroundColor = "";
}

function shadeBtnOn() {
    shade.value = "on";
    shade.style.color = "rgb(255, 255, 255)";
    shade.style.backgroundColor = "rgb(0, 0, 0)";
}

function shadeBtnOff () {
    shade.value = "off";
    shade.style.color = "rgb(0, 0, 0)";
    shade.style.backgroundColor = "";
}

//changing toggle eraser button background color and ensuring that only
//one button can be on at a time.
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.value == "off") {
            if (button.classList.contains("eraser")) {
                eraseBtnOn();
                rainbowBtnOff();
                shadeBtnOff();
            } else if (button.classList.contains("rainbow")) {
                rainbowBtnOn();
                eraseBtnOff();
                shadeBtnOff();
            } else if (button.classList.contains("shade")) {
                shadeBtnOn();
                rainbowBtnOff();
                eraseBtnOff();
            }
        } else if (button.value == "on") {
            if (button.classList.contains("eraser")) {
                eraseBtnOff();
                rainbowBtnOff();
                shadeBtnOff();
            } else if (button.classList.contains("rainbow")) {
                rainbowBtnOff();
                eraseBtnOff();
                shadeBtnOff();
            } else if (button.classList.contains("shade")) {
                shadeBtnOff();
                rainbowBtnOff();
                eraseBtnOff();
            }
        }
    })
})

function randomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

function getRed(color) {
    return parseFloat(color.substring (
        color.indexOf("(") + 1,
        color.indexOf(",")
    ))
}

function getGreen(color) {
    return parseFloat(color.substring (
        color.indexOf(",") + 1,
        color.lastIndexOf(",")
    ))
}

function getBlue(color) {
    return parseFloat(color.substring (
        color.lastIndexOf(",") + 1,
        color.indexOf(")")
    ))
}

function newShade(color) {
    return `rgb(${getRed(color) - 15}, ${getGreen(color) - 15}, ${getBlue(color) - 15})`
}