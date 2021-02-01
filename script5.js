
const board = document.querySelector ('.board');
var width = 50;
var height = 25;

// expert minesweeper is 30x16 with 99 bombs and total of 480 cells.
var bombRatio = 4.8
// var bombsAmount = Math.floor ((width*height)/bombRatio);
var bombsAmount = 10;
var totalCells = width * height;
var cells = [];
var bombs = [];
var neighbours = [];

var isGameOver = false;




for (let i=0; i<totalCells; i++){
    const cell = document.createElement ('div');
    cell.setAttribute ('id', i);
    board.appendChild (cell);
    // cell.innerHTML = i;
    cells.push (i);
    cell.classList.add(".one");



    cell.addEventListener ("click", function(e){
        click (cell);
})
    
}


function click (cell){
    
    let cellId = cell.id;

    let bombsNumber = checkNeighbours (cellId);

    let neighbourArray = trackNeighbours (cellId);

  

    cell.classList.add ("one");
    // cell.classList.remove ("cell");
    
    console.log("id", cellId);
    // let bombsNumber = checkNeighbours (cellId);
    console.log("bombs", bombsNumber);

    cell.innerHTML = bombsNumber;

    
}



function ifZero (cellId){


    let cellId3 = parseInt (cellId);


    let bombsNumber = checkNeighbours (cellId3);

    if (bombsNumber == 0){

        for (let i=0; i<trackNeighbours.length; i++){

            let cellId2 = neighbourArray[i];
            let cell2 = document.getElementById (cellId2);


            bombsNumber = checkNeighbours (cell2);
            // checkNeighbours (neighbourArray[i]);
            console.log("rrrrrrrrrrrr");


            cell2.classList.add ("one");

            console.log("id", cellId3);

            console.log("bombs", bombsNumber);

            cell2.innerHTML = bombsNumber;
        }

    }


}






function createBombs (){
    
    while (bombs.length < bombsAmount) {
        let randomNumber = Math.floor (Math.random() * totalCells);
        if (bombs.indexOf(randomNumber) == -1){
            bombs.push(randomNumber);
        }
        let z = document.getElementById(randomNumber)
    //     z.innerHTML = '&#128163;';
    //     z.classList.add("bomb");
    // }
    }
}

createBombs();



function showBombs (bombs){
    for (let i=0; i<bombs.length; i++){
        const b = document.getElementById (bombs[i]);
        b.innerHTML =  '&#128163;';
        b.classList.add("bomb");
        console.log ("show bombs");
    }
}


// console.log (bombs.length);
// console.log (bombsAmount);

// console.log (cells);
// console.log (bombs);



function trackNeighbours (cellId){

    let cellIds = [];
    if (cornerArray.includes(cellId)){
        cellIds = cornerArray;
    }else if (leftSideArray.includes(cellId)){
        cellIds = leftSideArray;
    }else if (rightSideArray.includes(cellId)){
        cellIds = rightSideArray;
    }else if (topSideArray.includes(cellId)){
        cellIds = topSideArray;
    }else if (bottomSideArray.includes(cellId)){
        cellIds = bottomSideArray;
    }else {
        cellIds = [
            cellId-width-1,
            cellId-width,
            cellId-width+1,
            cellId-1,
            cellId+1,
            cellId+width-1,
            cellId+width,
            cellId+width+1
        ]
    }

    return cellIds;
}




// function trackNeighbours (cellId){

//     let neighbourArray = [];
//     if (cornerArray.includes(cellId)){
//         neighbourArray = cornerArray;
//     }else if (leftSideArray.includes(cellId)){
//         neighbourArray = leftSideArray;
//     }else if (rightSideArray.includes(cellId)){
//         neighbourArray = rightSideArray;
//     }else if (topSideArray.includes(cellId)){
//         neighbourArray = topSideArray;
//     }else if (bottomSideArray.includes(cellId)){
//         neighbourArray = bottomSideArray;
//     }else {
//         neighbourArray = [
//             cellId-width-1,
//             cellId-width,
//             cellId-width+1,
//             cellId-1,
//             cellId+1,
//             cellId+width-1,
//             cellId+width,
//             cellId+width+1
//         ]
//     }

//     return neighbourArray;
// }







function trackCorners(){
    let cornerArray = [0,(width-1),((width*height)-width),(width*height)-1];
    return cornerArray;
}

var cornerArray = trackCorners ();

// console.log ((width*height)-width);
// console.log ((width*height)-1);
// console.log (cornerArray);


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
// console.log (rightSideArray);



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
// console.log (topSideArray);
// console.log (bottomSideArray);
// console.log (bottomSideArray);



// checkNeighbours();

// check the 8 adjcent neighbours of each cell
function checkNeighbours(cellId){
// function checkNeighbours(){

    // for (let i=0; i<totalCells ; i++){

        let i = parseInt (cellId);
        let bNumber = 0;

        if (bombs.includes(i)){   

            // const cell = document.getElementById(i);
            // cell.classList.add (".bomb");
            console.log("Game Over");
            isGameOver = true;
            showBombs(bombs);
            
            
        }else{

            // compare with 3 neighbours
            if (cornerArray.includes(cells[i])){

                if (i == cornerArray[0]){

                    if ( bombs.includes(i+1)){
                        bNumber ++;
                    }if (bombs.includes(i+width)){
                        bNumber ++;      
                    }if (bombs.includes(i+width+1)){
                        bNumber ++;
                    }


                }else if (i == cornerArray[1] ){
                    // console.log(cells[i]);

                    if ( bombs.includes(i-1)){
                        bNumber ++;
                    } if (bombs.includes(i+width)){
                        bNumber ++;
                    } if (bombs.includes(i+width-1)){
                        bNumber ++;
                    }

                }else if (i == cornerArray[2] ){
                    // console.log(cells[i]);

                    if ( bombs.includes(i-width)){
                        bNumber ++;
                    } if (bombs.includes(i-width+1)){
                        bNumber ++;
                    } if (bombs.includes(i+1)){
                        bNumber ++;
                    }



                }else if (i == cornerArray[3] ){
                    // console.log(cells[i]);


                    if ( bombs.includes(i-1)){
                        bNumber ++;
                    } if (bombs.includes(i-width)){
                        bNumber ++;
                    } if (bombs.includes(i-width-1)){
                        bNumber ++;
                    }

                }

            // compare with 5 neighbours
            }else if (leftSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (rightSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width-1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (topSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+width-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                }


            // compare with 5 neighbours
            }else if (bottomSideArray.includes(cells[i])){
                // console.log(cells[i]);

                if ( bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                }

            // compare with 8 neighbours
            }else{

                if ( bombs.includes(i-width-1)){
                    bNumber ++;
                } if (bombs.includes(i-width)){
                    bNumber ++;
                } if (bombs.includes(i-width+1)){
                    bNumber ++;
                } if (bombs.includes(i-1)){
                    bNumber ++;
                } if (bombs.includes(i+1)){
                    bNumber ++;
                } if ( bombs.includes(i+width-1)){
                    bNumber ++;
                } if (bombs.includes(i+width)){
                    bNumber ++;
                } if (bombs.includes(i+width+1)){
                    bNumber ++;
                }

                
            }
        }

        ifZero(i);
        return bNumber;

        // const cell = document.getElementById(cellId);
        // cell.innerHTML = bNumber;
        // addNumberStyle(bNumber);


        // cells[i].setAttribute ("data", bNumber);
        // let ali = cells.getAttribure ("data");
        // console.log ("data", ali);

    // }

}


// checkNeighbours();




function addNumberStyle(t){
    if (t == 0){
        // cell.classList.add('.zero');
    } if (t == 1){
        cell.classList.add('.one');
        // console.log("class one")
    }if (t == 2){
        cell.classList.add('.two');
        // console.log("class two")
    } if (t == 3){
        cell.classList.add('.three');
    }if (t == 4){
        cell.classList.add('.four');
    } if (t == 5){
        cell.classList.add('.five');
    }if (t == 6){
        cell.classList.add('.six');
    } if (t == 7){
        cell.classList.add('.seven');
    }if (t == 8){
        cell.classList.add('.eight');
    }
}
