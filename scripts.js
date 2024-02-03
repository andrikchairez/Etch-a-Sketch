//Some global variables that will help maintain the grid sizing
//of what I call the "Canvas", where a user can hover
//their mouse, and change the background of the grid.
//This will include functionality to input a different grid size
//below 100 (to prevent loading issues), and remake the canvas
const canvas = document.querySelector(".canvas");
const canvasMaxWidth = 960;
const gridFab = document.querySelector(".gridFabRow");
const randomizeRbgFab = document.querySelector(".randomizeRbgFabRow");
const clearFab = document.querySelector(".clearFabRow");
//randomizeSketchColorFeature 
const controller = new AbortController();
const { signal } = controller;
let rainbowToggle = false;
let rainbowRgbValue;
//1 of 4

//I chose this as our pixel size (accounting for border thickness)
//in order to have a grid initially populate with this square size
let size = 56;
//Pretty arbitrary number. Can change to whatever, but if you 
//change the number, you must first ADD 4, then divide the
//canvasMaxWidth by (size + 4), then square the result

//Utility functions that help create our grid, and clear it for
//new input
function createDiv(){
    const square = document.createElement("div");
    square.style.width = size + "px";
    square.style.height = size + "px";
    square.style.border = "1px solid gray"
    square.setAttribute("class","canvasChild")
    square.style.backgroundColor = " "

    canvas.appendChild(square);

    square.addEventListener('mouseover', () => {
        square.style.backgroundColor = "black";
    }, { signal });
};

function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild)
    }
}

//randomizeSketchColorFeature 
function randomColor(){
    return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}

// 2 of 4

//Finally, to create our first grid when a user renders the site
for(let i = 0; i < (256); i++){
        createDiv();
}; 

//Collection of our grid change button, clear, and random RGB toggle.
gridFab.addEventListener("click", () => {
    const gridSizeInput = prompt("What grid size would you like to use? (Max of 100)")

    if(!isNaN(gridSizeInput) && gridSizeInput > 0 && gridSizeInput < 100) {

        size = ((canvasMaxWidth/gridSizeInput)-4)

        clearCanvas();

        for(let i = 0; i < (gridSizeInput ** 2); i++){
            createDiv();
        };
        //randomizeSketchColorFeature 

        //I decided to do this because the way I was handling the RGB toggle
        //was making it really hard to re-add the old "black" background
        //event listener
        const canvasChild = document.querySelectorAll(".canvasChild");
        canvasChild.forEach(child => {
            child.addEventListener("mouseover", () => {
                child.style.backgroundColor = "black";
            }
        )});
        //3 of 4
    } else {
        alert("Please use a number above 0, and below 100 and use no letters or special notation!")
    };
});

//randomizeSketchColorFeature 
randomizeRbgFab.addEventListener("click", () => {
    rainbowToggle = !rainbowToggle;
    if(rainbowToggle === true){
        controller.abort()
        const canvasChild = document.querySelectorAll(".canvasChild");
        canvasChild.forEach(child => {
            child.addEventListener("mouseover", () => {
                child.style.backgroundColor = randomColor();
            });
        });
    }else if(rainbowToggle === false){
        controller.abort()
        const canvasChild = document.querySelectorAll(".canvasChild");
        canvasChild.forEach(child => {
            child.addEventListener("mouseover", () => {
                child.style.backgroundColor = "black";
            });
        });
    };
});
//4 of 4
clearFab.addEventListener("click", () => {
    const canvasChild = document.querySelectorAll(".canvasChild");
    canvasChild.forEach(child => {
        child.style.backgroundColor = "white";
    });
});