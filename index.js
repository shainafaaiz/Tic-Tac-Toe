const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to iniyialize the game
function initialize(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty krna hai
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one step missing- green hatana hoga
        box.classList = `box box${index+1}`;
        
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initialize();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer ="X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkEnd(){
   let answer = "";

   //all three boxes should be non-empty and exactly same in value
   winningPosition.forEach((position) => {
    if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
         //check if winner is "X"
        if(gameGrid[position[0]] === "X")
            answer = "X";
        else
            answer = "O";
        
        //disable pointer events
        boxes.forEach((box) =>{
            box.style.pointerEvents = "none";
        });
        //now we know X or O is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
   });

   //we have a winner
   if(answer !== ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add('active');
   // return;
   }

   //If we donot have a winner: let's check whether is a tie
   let fillCount =0;
   gameGrid.forEach((box) =>{
      if(box !== ""){
        fillCount++;
      }
   });

   //
   if(fillCount === 9){
    gameInfo.innerText = `Game Tied!`;
    newGameBtn.classList.add('active');
    //return;
   }

   
}

function handleClick(index){
    if(gameGrid[index] === ""){
       boxes[index].innerText = currentPlayer; 
       gameGrid[index] = currentPlayer;
       boxes[index].style.pointerEvents = "none";
       //swap turn 
       swapTurn();
       //check whether anyone won
       checkEnd();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initialize);
    

