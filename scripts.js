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
    });
};

function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild)
    }
}

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
    } else {
        alert("Please use a number above 0, and below 100 and use no letters or special notation!")
    };
});

clearFab.addEventListener("click", () => {
    const canvasChildren = document.querySelectorAll(".canvasChild");
    canvasChildren.forEach(child => {
        child.style.backgroundColor = "white";
    });
});
