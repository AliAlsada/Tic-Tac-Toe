
const fields = document.querySelectorAll(".block");


//factory function (module)
const gameBoard = () => {

    //2D array to store the result of the game
    let gameBoardArray = [0,0,0,0,0,0,0,0,0];


    //start the game
    const startGame = (enemie) => {
        //instinitiate the players here

    }
    
    //restart the gameBoard
    const resetGame = () => {

    }

    //there is possibility of a tie
    const winningConditions = (playerX, playerO) => {

        let winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winConditions.length; i++){

            if (gameBoardArray[winConditions[i][0]] === "X" 
                && gameBoardArray[winConditions[i][1]] === "X" 
                && gameBoardArray[winConditions[i][2]] === "X") declareWinner(playerX);

            else if (gameBoardArray[winConditions[i][0]] === "O" 
                && gameBoardArray[winConditions[i][1]] === "O" 
                && gameBoardArray[winConditions[i][2]] === "O")  declareWinner(playerO);       
        }
    }

    const declareWinner = (winner) => {  
        for (const field of fields) { field.removeEventListener('click', () => displayMark(field)) }
        
    }


    const displayMark = (field) => {
        let location = field.id;
        
        //if the round is for X, and the block is empty
        if (playerX.round && field.textContent === "") {  
            gameBoardArray[Number(location)-1] = "X";
            
            //the next round will be for playerO
            field.textContent = "X";  
            playerX.round = false;
            playerO.round = true;

        //if the round is for O, and the block is empty
        }else if (field.textContent === "") {
            gameBoardArray[Number(location)-1] = "O";
            
            //the next round will be for playerX
            field.textContent = "O";  
            playerX.round = true;
            playerO.round = false;
        } winningConditions(playerX, playerO);
    }

    const play = () => {
        
        for (const field of fields) {
            field.addEventListener('click', () => displayMark(field))
          }
    }

    return {play};
}




//factory function
const player = (name,mark,round) => {

    //The player will have the chance to play against computer or a real player
    const playAgainst = (enemie) => {

    }

    //the player will have the chance to choose X or O
    const chooseMark = () => {

    }

    return {round, mark};

}


const playerX =  player("Ali","X", true);
const playerO =  player("Hassan","O", false);

const test = gameBoard();


test.play();



