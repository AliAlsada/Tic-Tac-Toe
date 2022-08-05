const gamePlay = document.querySelector('.game-play');
const mainPage = document.querySelector('.main-page');
const mainPageButtons = document.querySelectorAll(".human,.bot");
const playerOne = document.querySelector(".human.player-one");
const playerTwo = document.querySelector(".human.player-two");
const botOne = document.querySelector(".bot.player-one");
const botTwo = document.querySelector(".bot.player-two");
const startButton = document.querySelector(".start-game");
const fields = document.querySelectorAll(".block");




//factory function (module)
const gameBoard = () => {

    //2D array to store the result of the game
    let gameBoardArray = [0,0,0,0,0,0,0,0,0];


    const selectPlayers = (playerOne, playerTwo) => {
        if (playerOne.classList.contains("active"))
            playerOne.classList.remove("active");
        else{
            playerOne.classList.add("active");
            playerTwo.classList.remove("active");
        }
        
    }

    const selectPlayersEvents = () => {
        
        playerOne.addEventListener('click', () => selectPlayers(playerOne, botOne));
        playerTwo.addEventListener('click', () => selectPlayers(playerTwo, botTwo));
        botOne.addEventListener('click', () => selectPlayers(botOne, playerOne));
        botTwo.addEventListener('click', () => selectPlayers(botTwo, playerTwo));
    }


    const startGame = () => {
        selectPlayersEvents();
        startButton.addEventListener('click', () => {
            if (playerOne.classList.contains("active") && playerTwo.classList.contains("active")){
                const playerX =  player("X", true);
                const playerO =  player("O", false);
                play(playerX, playerO);
            }

            if (playerOne.classList.contains("active") && botTwo.classList.contains("active")){
                const playerX =  player("X", true);
                const bot =  bot("O", false);
                // play(playerX, playerO);
            }
        })
    }
    
    //restart the gameBoard
    const resetGame = () => {
        
    }

    //there is possibility of a tie
    const winningConditions = () => {

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
                && gameBoardArray[winConditions[i][2]] === "X") return true;

            else if (gameBoardArray[winConditions[i][0]] === "O" 
                && gameBoardArray[winConditions[i][1]] === "O" 
                && gameBoardArray[winConditions[i][2]] === "O")  return true;   
            
        } return false;
    }




    const displayMark = (field, playerX, playerO) => {
  
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
        }

                
    }
    

    const play = (playerX, playerO) => {
        gamePlay.classList.add('active')
        mainPage.classList.remove('active')

        
        for (const field of fields){
            function wrapperFunction(){
                
                if (winningConditions()) {
                    for (const field of fields){
                        field.removeEventListener('click', wrapperFunction);
                    }return;
                }

                displayMark(field, playerX, playerO)
            }

            
            field.addEventListener('click', wrapperFunction);  
            
        }
    }

    return {startGame};
}




//factory function
const player = (mark,round) => {

    //the player will have the chance to choose X or O
    const chooseMark = () => {

    }

    return {mark, round};

}


const bot = (mark, round) => {

}



const test = gameBoard();
test.startGame();







