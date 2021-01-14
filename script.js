
const board = document.querySelector ('.board')
var width = 50;
var height = 25;

// expert minesweeper is 30x16 with 99 bombs and total of 480 cells.
var bombRatio = 4.8
var bombsAmount = Math.floor ((width*height)/bombRatio);
var totalCells = width * height;
var cells = [];
var bombs = [];




for (let i=0; i<totalCells; i++){
    const cell = document.createElement ('div');
    cell.setAttribute ('id', i);
    board.appendChild (cell);
    cell.innerHTML = i;
    cells.push (i);
}




// for (let i=0; i<bombsAmount; i++){
//     let randomNumber = Math.floor (Math.random() * totalCells);
//     if (bombs.indexOf(randomNumber) == -1){
//         bombs.push(randomNumber);
//     }
//     let z = document.getElementById(randomNumber)
//     z.innerHTML = "bomb";
//     z.classList.add("bomb");

// }



while (bombs.length < bombsAmount) {
    let randomNumber = Math.floor (Math.random() * totalCells);
    if (bombs.indexOf(randomNumber) == -1){
        bombs.push(randomNumber);
    }
    let z = document.getElementById(randomNumber)
    z.innerHTML = "bomb";
    z.classList.add("bomb");

}


console.log (bombs.length);
console.log (bombsAmount);

console.log (cells);
console.log (bombs);




function trackCorners(){
    let cornerArray = [0,(width-1),((width*height)-width),(width*height)-1];
    return cornerArray;
}

var cornerArray = trackCorners ();

console.log ((width*height)-width);
console.log ((width*height)-1);
console.log (cornerArray);


var leftSideArray = [];
var rightSideArray = [];

function trackEdgeSides(){

    for (let i=0; i<height ; i++){
        let leftSide = i * width;
        leftSideArray.push(leftSide);

        let rightSide = (width * (i+1)) - 1;
        rightSideArray.push(rightSide);
    }
    
}
trackEdgeSides();
console.log (leftSideArray);
console.log (rightSideArray);



var topSideArray = [];
var bottomSideArray = [];

function trackEdgeRows(){

    for (let i=0; i<width ; i++){
        topSideArray.push(i);

        let bottomSide = ((width*height)-width) + i;
        bottomSideArray.push(bottomSide);
    }
    
}
trackEdgeRows();
console.log (topSideArray);
console.log (bottomSideArray);

