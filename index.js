const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

initGame();

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
];

//function to intialise the game
function initGame(){
    currentPlayer = "X";
    //gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameGrid = [];
    for (let i = 0; i < 9; i++) {
        gameGrid[i] = "";
    }

    //empty Grid on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap kro turn ko
        swapTurn();

        //check kahin jeet toh nhi gaye?
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    //update on UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position) => {
        if(gameGrid[position[0]] !== "" && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X or 0
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "0";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winning Player - ${answer}`;
        newGameBtn.classList.add("active"); 
        return;
    }

    //when there is no winner, if the game is tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        
    }
}

newGameBtn.addEventListener("click", initGame);