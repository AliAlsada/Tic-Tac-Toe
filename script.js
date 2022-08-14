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
    let gameBoardArray = Array.from(Array(9).keys());

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
                play(playerX, playerO, false);
            }

            if (playerOne.classList.contains("active") && botTwo.classList.contains("active")){
                play(huPlayer, aiPlayer, true);
            }
        })
    }
    
    //restart the gameBoard
    const resetGame = (playerX, playerO) => {
        gameBoardArray = [0,0,0,0,0,0,0,0,0];
        for (const field of fields){
            field.textContent = "";
        }
        playerX.round = true;
        playerO.round = false;
    }


    const returnToMainPage = () => {
        // resetGame()
        gamePlay.classList.remove('active');
        mainPage.classList.add('active');
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
                && gameBoardArray[winConditions[i][2]] === "X") {
                    
                    fields[winConditions[i][0]].classList.add("winner");
                    fields[winConditions[i][1]].classList.add("winner");
                    fields[winConditions[i][2]].classList.add("winner");
                    return 10;
            }

            else if (gameBoardArray[winConditions[i][0]] === "O" 
                && gameBoardArray[winConditions[i][1]] === "O" 
                && gameBoardArray[winConditions[i][2]] === "O"){ 

                    fields[winConditions[i][0]].classList.add("loser");
                    fields[winConditions[i][1]].classList.add("loser");
                    fields[winConditions[i][2]].classList.add("loser");
                    return -10;   
            }
            
        } 
    }


    const winningConditionsBot = () => {

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
                && gameBoardArray[winConditions[i][2]] === "X") {
                    return 10;
            }

            else if (gameBoardArray[winConditions[i][0]] === "O" 
                && gameBoardArray[winConditions[i][1]] === "O" 
                && gameBoardArray[winConditions[i][2]] === "O"){ 
                    return -10;   
            }
            
        } 
    }


    const displayMark = (field, playerX, playerO, playerOrBot) => {
  
        let location = field.id;
        
        //if the round is for X, and the block is empty
        if (playerX.round && field.textContent === "") {  
            gameBoardArray[Number(location)-1] = "X";
            
            //the next round will be for playerO
            field.textContent = "X";  
            playerX.round = false;
            playerO.round = true;
            winningConditions();

            if (playerOrBot){
                let spot = bestSpot();
                gameBoardArray[spot] = "O";
                fields[spot].textContent = "O";
                playerX.round = true;
                playerO.round = false;
                winningConditions();
                return;
            } 
        }

        //if the round is for O, and the block is empty
        else if (field.textContent === "") {
            gameBoardArray[Number(location)-1] = "O";
            //the next round will be for playerX
            winningConditions();    
            field.textContent = "O";  
            playerX.round = true;
            playerO.round = false;
        }      
    }
    

    const play = (playerX, playerO, playerOrBot) => {
        gamePlay.classList.add('active')
        mainPage.classList.remove('active')

        
        for (const field of fields){
            function wrapperFunction(){
                
                if (winningConditions()) {
                    for (const field of fields){
                        field.removeEventListener('click', wrapperFunction);
                    }return;
                }

                displayMark(field, playerX, playerO, playerOrBot);
            }          
            field.addEventListener('click', wrapperFunction);  
            
        }
    }

    const emptySquers = () => {
        return gameBoardArray.filter(s => typeof s == 'number');
    }

    
    const bestSpot = () => {
        return miniMax(gameBoardArray, aiPlayer).index;
    }

    const miniMax = (newBoard, player) => {
        let availSpots = emptySquers();
    
        if (winningConditionsBot() === -10)
            return {score: 10};
        else if (winningConditionsBot() === 10) 
            return {score: -10};
        else if (availSpots.length === 0)
            return {score: 0};

        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = newBoard[availSpots[i]];
            
            if (player === aiPlayer) {
                newBoard[availSpots[i]] = "O";
                let result = miniMax(newBoard, huPlayer);
                move.score = result.score;
            }else {
                newBoard[availSpots[i]] = "X";
                let result = miniMax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }

        let bestMove;
        if(player === aiPlayer) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
	    }

	    return moves[bestMove];
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
    return {mark, round};
}

const huPlayer =  player("X", true);
const aiPlayer =  bot("O", false);


const test = gameBoard();
test.startGame();







