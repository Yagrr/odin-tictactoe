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
            cellsHTML = `<div class='square' id='square-${index}' index=${index}><\div>`;
            gameBoardHTML.insertAdjacentHTML( 'beforeend', cellsHTML );
        });
    })

    gameBoardHTML.addEventListener( "click", (e) => {
        if ( e.target.classList.contains("square") ) {
            const targetCell = e.target;
            // If empty cell then proceed
            if (targetCell.textContent === "") {
                const cellIndex = targetCell.getAttribute( "index" );
                console.log(cellIndex);
                gameCtrl.addMark( cellIndex );
                targetCell.textContent = gameBoard[ cellIndex ];
            }
        }
    });

    // TODO: Create game win/lose state

    const update = ( index, value) => {
        gameBoard[ index ] = value;
    }

    return {
        render,
        update,
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
    let turns;
    let gameOver;

    const start = () => {
        players = [ 
            createPlayer( document.querySelector('#player1').value, "X" ),
            createPlayer( document.querySelector('#player2').value, "O" )
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        tictactoe.render();
    }
// TODO: Create reset button on the gameCtrl and Render-side
    const end = () => {
        gameOver = true;
    }

    const addMark = ( cellIndex ) => {
        tictactoe.update( cellIndex, players[currentPlayerIndex].mark )
        // Switch
        currentPlayerIndex ? currentPlayerIndex = 0 : currentPlayerIndex = 1;
        if ( turns === 8 ) {
            gameCtrl.end();
        } else {
            turns += 1;
        }
    }

    return {
        start,
        end,
        addMark,
    }
})();
// TODO: Make start button turn into restart button
const startBtn = document.querySelector( '#start-button' );
startBtn.addEventListener( 'click', () => {
    gameCtrl.start();
    startBtn.textContent = "Restart Game";
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
