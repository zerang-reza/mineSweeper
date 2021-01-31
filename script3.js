
   
const board = document.querySelector ('.board');
const theTimer = document.querySelector ('.timer');
const theFlags = document.querySelector ('.flags');
const resetButton = document.querySelector ('.reset');


// resetButton.addEventListener ("click", load, false);

function load (){
    var width = 50;
    var height = 25;

    // expert minesweeper is 30x16 with 99 bombs and total of 480 cells.
    var bombRatio = 4.8
    // var bombsAmount = Math.floor ((width*height)/bombRatio);
    var bombsAmount = 160;
    var totalCells = width * height;
    var cells = [];
    var bombs = [];
    var neighbours = [];
    var checkedCells = [];
    var checkList = [];
    var flagList = [];
    var flags =bombsAmount;

    var isGameOver = false;
    var timerInterval;
    var timer = 1;


    theFlags.innerHTML = flags;



    for (let i=0; i<totalCells; i++){
        const cell = document.createElement ('div');
        cell.setAttribute ('id', i);
        board.appendChild (cell);
        // cell.innerHTML = i;
        cells.push (i);
        cell.classList.add(".one");

        cell.onclick = function (e){
            click (cell);
        }

        // cell.addEventListener ("click", function(e){
        //     click (cell);
        // })


        // cell.oncontextmenu = function(e){
        //     e.preventDefault();
        //     rightClick (cell);
        // }


        cell.addEventListener ("contextmenu", function(e){
            e.preventDefault();
            rightClick (cell);
        })
    }

}


load();


function runTimer (){
    theTimer.innerHTML = timer;
    timer ++;
}







function rightClick (cell){

    if ( isGameOver){
        return;
    }

    let cellId = cell.id;
    let c = cell.getAttribute ('data');

    if ( checkedCells.includes (cellId) ){
        return;
    }
    if ( (c != "flaged") && (c != "question") && (0 < flags < bombsAmount) ){

        cell.innerHTML =  '&#128681;';
        // cell.classList.add("bomb");
        console.log ("flag");
        cell.setAttribute  ('data', "flaged");
        flags --;
        theFlags.innerHTML = flags;
        flagList.push (cellId);
    }
    else if (c == "flaged"){
        cell.innerHTML =  '?'.bold();
        // cell.classList.add("bomb");
        console.log ("question");
        cell.setAttribute  ('data', "question");
        flags ++;
        theFlags.innerHTML = flags;
        flagList.pop (cellId);

    }
    else if (c == "question"){
        cell.innerHTML =  '';
        // cell.classList.add("bomb");
        console.log ("unflag");
        cell.setAttribute  ('data', "");
    }
}







function click (cell){


    if ( isGameOver){
        return;
    }
    

    if (cell.getAttribute ('data') == "flaged"){
        // console.log("kkk");
        return;
    }else {

        // console.log("nnn", checkList);

        let cellId = cell.id;
        // let cellId = cell.getAttribute ('id')
    
        // console.log("id", cellId);
        // let isCellChecked = cell.getAttribute ('data');
    
    
        // if ( isCellChecked == "checked" ){
        if ( checkedCells.includes (cellId) ){
            // console.log("aa");
        
            // let c = cell.getAttribute ('id');
    
            checkList.splice ( 0, 1);
    
            if ( checkList.length != 0){
                let cell2 = document.getElementById (checkList [0]);
                click (cell2);
            }      
        }
    
        // if ( isCellChecked != "checked" ){
        if ( !(checkedCells.includes (cellId)) ){
            // console.log("bb");
    
            let bombsNumber = checkNeighbours (cell, cellId); 

                
            if (bombsNumber != 0 ){

                cell.innerHTML = bombsNumber;
    
                if ( bombsNumber == 1){
                    cell.classList.add ("one");   
                }
                if ( bombsNumber == 2){
                    cell.classList.add ("two");   
                }
                if ( bombsNumber == 3){
                    cell.classList.add ("three");   
                }
                if ( bombsNumber == 4){
                    cell.classList.add ("four");   
                }
                if ( bombsNumber == 5){
                    cell.classList.add ("five");   
                }
                if ( bombsNumber == 6){
                    cell.classList.add ("six");   
                }
                if ( bombsNumber == 7){
                    cell.classList.add ("seven");   
                }
                if ( bombsNumber == 8){
                    cell.classList.add ("eight");   
                }
                if ( bombsNumber == 9){
                    cell.classList.add ("nine");   
                    cell.innerHTML = '&#128163;';
                }
                
            
                checkedCells.push (cellId);

                
                if (checkedCells.length == 1){
                    timerInterval = setInterval (runTimer, 1000);
                }


    
                if ( checkList.length != 0){
                    let cell2 = document.getElementById (checkList [0]);
                    click (cell2);
                }      


                
            }
            if (bombsNumber == 0 ){
                // console.log("ccc");
    
                cell.classList.add ("zero");   
                // console.log("id", cellId);
                // console.log("bombs", bombsNumber);
                // cell.innerHTML = bombsNumber;
                // cell.setAttribute ('data', "checked");
                checkedCells.push (cellId);


                if (checkedCells.length == 1){
                    timerInterval = setInterval (runTimer, 1000);
                }
    
    
    
                let neighbourArray = trackNeighbours (cellId);
    
                for (let i=0; i<neighbourArray.length; i++){
    
                    if ( !(checkedCells.includes (neighbourArray [i])) && !(checkList.includes (neighbourArray [i])) ){
                        checkList.push (neighbourArray [i]);
                    }
                }
    
                if ( checkList.length != 0){
                    let cell2 = document.getElementById (checkList [0]);
                    click (cell2);
                }     
    
            }
    
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

        if ( (b.getAttribute ("data")) == "flaged"){
            console.log ("abcdefg");
            
        }else{
            b.innerHTML =  '&#128163;';
            b.classList.add("bomb");
            b.setAttribute ('data', "bomb");
            console.log ("show bombs");

        }
        
    }
    for (let i=0; i<flagList.length; i++){
        const c = document.getElementById (flagList[i]);

        // if (c.classList.contains('bomb')){
        //     c.innerHTML =  "00";
        // }

        if ( (c.getAttribute ('data')) == "bomb"){
            c.innerHTML =  "00";
        }



        // cell.setAttribute  ('data', "question");


        
        // if ( c.value = ""){
        //     c.innerHTML =  '&#128683;';
        // }



        // console.log ("mmmm", c.getAttribute ("data"));

        // let flo = c.getAttribute ("name");
        // if ( flo != "bomb"){
        //     c.innerHTML =  '&#128683;';
        //     console.log ("nnnn", flagList);
        // }else if ( (c.getAttribute ("data")) == "bomb"){
        //     c.innerHTML =  2;
        //     console.log ("nnnn", flagList);
        // }
    }
}










function trackNeighbours (cellId){

    let cellIdNum = parseInt (cellId);
    let cellIds = [];


    if (cellIdNum == 0){
        cellIds = [cellIdNum+1, cellIdNum+width, cellIdNum+width+1];
    }else if (cellIdNum == (width-1)){
        cellIds = [cellIdNum-1, cellIdNum+width, cellIdNum+width-1];
    }else if (cellIdNum == ((width*height)-width)){
        cellIds = [cellIdNum-width, cellIdNum-width+1, cellIdNum+1];
    }else if (cellIdNum == ((width*height)-1)){
        cellIds = [cellIdNum-width-1, cellIdNum-width, cellIdNum-1];

    }else if (cellIdNum < (width-1)){
        cellIds = [cellIdNum-1, cellIdNum+width-1, cellIdNum+width, cellIdNum+width+1, cellIdNum+1];
    }else if (cellIdNum > ((width*height)-width)){
        cellIds = [cellIdNum-1, cellIdNum-width-1, cellIdNum-width, cellIdNum-width+1, cellIdNum+1];
    }else if (cellIdNum % width == 0 ){
        cellIds = [cellIdNum-width, cellIdNum-width+1, cellIdNum+1, cellIdNum+width+1, cellIdNum+width];
    }else if (cellIdNum % width == (width - 1) ){
        cellIds = [cellIdNum-width, cellIdNum-width-1, cellIdNum-1, cellIdNum+width-1, cellIdNum+width];
    }else {
        cellIds = [
            cellIdNum-width-1,
            cellIdNum-width,
            cellIdNum-width+1,
            cellIdNum-1,
            cellIdNum+1,
            cellIdNum+width-1,
            cellIdNum+width,
            cellIdNum+width+1
        ]
    }

    console.log ("neighbourssss:" , cellIdNum, "matriss:", cellIds );
    return cellIds;
}











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









// check the 8 adjcent neighbours of each cell
function checkNeighbours(cell, cellId){

        let i = parseInt (cellId);
        let bNumber = 0;
        // console.log ("cell id" , j)

        if (bombs.includes(i)){   

            // const cell = document.getElementById(i);
            // cell.classList.add (".bomb");
            console.log("Game Over");
            isGameOver = true;
            showBombs(bombs);
            bNumber = 9;
            clearInterval (timerInterval);
            
            
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

        return bNumber;

}

