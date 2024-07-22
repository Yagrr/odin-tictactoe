// NOTE: Game instance
const tictactoe = ( () => {    
    let gameBoard =  ["","","","","","","","",""];
    const gameBoardHTML = document.querySelector('#gameboard');
    const render = (() => {

        // Removing existing squares
        while ( gameBoardHTML.firstChild ) {
            gameBoardHTML.removeChild( gameBoardHTML.lastChild );
        }

        let cellsHTML = "";
        gameBoard.forEach( ( cell, index ) => {
            cellsHTML = `<div class='square empty' id='square-${index}' index=${index}><\div>`;
            gameBoardHTML.insertAdjacentHTML( 'beforeend', cellsHTML );
        });
    })

    gameBoardHTML.addEventListener( "click", (e) => {

        if ( e.target.classList.contains("square") ) {
            const targetCell = e.target;
            const cellIndex = targetCell.getAttribute( "index" );

            // If empty cell then proceed
            if (tictactoe.getgameBoard()[ cellIndex ] === "") {

                gameCtrl.addMark( cellIndex );
                targetCell.textContent = gameBoard[ cellIndex ];
                targetCell.classList.remove("empty");

            }
        }

        gameCtrl.checkWin();

    });

    // TODO: Create game win/lose state

    const update = ( index, mark ) => {
        gameBoard[ index ] = mark;
    }

    const resetgameBoard = () => gameBoard = ["","","","","","","","",""];


    const getgameBoard = () => gameBoard;

    return {
        render,
        update,
        getgameBoard,
        resetgameBoard,
    }

})();

// NOTE: Game controller

const createPlayer = ( name, mark ) => {
    return {
        name,
        mark,
    }
}

const gameCtrl = (() => {
    let players = [];
    let currentPlayerIndex;
    let turns = 0;
    let gameOver;

    const start = () => {
        players = [ 
            createPlayer( document.querySelector('#player1').value, "X" ),
            createPlayer( document.querySelector('#player2').value, "O" )
        ] 

        turns = 0;
        currentPlayerIndex = 0;
        gameOver = false;
        tictactoe.resetgameBoard();
        tictactoe.render();
    }
// TODO: Create reset button on the gameCtrl and Render-side

    const addMark = ( cellIndex ) => {

        tictactoe.update( cellIndex, players[ currentPlayerIndex ].mark )
        if (checkWin( tictactoe.getgameBoard, players[ currentPlayerIndex ].mark ) ) {
            console.log("Win!")
            resultDisplayHTML.classList.remove('hidden');
            resultHTML.textContent = players[ currentPlayerIndex ].name + ' wins!';
            gameOver = true;
        }

        if ( turns === 8  && gameOver === false ) {
            console.log("Draw!")
            resultDisplayHTML.classList.remove('hidden');
            resultHTML.textContent = 'Draw!';
        } else {
            console.log("Turn: " + turns);
            turns += 1;
        }

        // Switch
        currentPlayerIndex = currentPlayerIndex ?  0 : 1;

    }

    const checkWin = () => {
        gameboard = tictactoe.getgameBoard();
        const winningCombinations = [
            [ 0, 1, 2 ],
            [ 3, 4, 5 ],
            [ 6, 7, 8 ],
            [ 0, 3, 6 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 0, 4, 8 ],
            [ 2, 4, 6 ],
        ] 

        for ( let i = 0; i < winningCombinations.length; i++) {
            const [ a, b, c] = winningCombinations[i]
            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c] ) {
                return true;
            } 
        }
        return false;
    }

    return {
        start,
        addMark,
        checkWin,
    }
})();

const player1HTML = document.querySelector('#player1');
const player2HTML = document.querySelector('#player2');
const resultDisplayHTML = document.querySelector('#result-display');
const resultHTML = document.querySelector('#result');
const startBtn = document.querySelector( '#start-button' );

startBtn.addEventListener( 'click', (e) => {
    if (player1HTML.value != '' && player2HTML.value != '') {
        e.preventDefault();
        resultDisplayHTML.classList.add('hidden');
        gameCtrl.start();
        startBtn.textContent = "Restart Game"
    } 
});

// Use player factory

//const tictactoe = ( function() {    
//    let gameBoard = ["-","-","-","-","-","-","-","-","-"];
//    const placeX = ( inputX ) => {
//        if ( inputX <= 0 && inputX >= 9 )
//        gameBoard[ inputPos ];
//    };
//    const placeO = ( inputO ) => {
//        if ( inputO <= 0 && inputO >= 9 )
//        gameBoard[ inputO ];
//    };
//    return { placeX, placeO };
//})();

// Display
