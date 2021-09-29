// selecting all the elements

// the divs to display background to the winner places where he put X or O
const places = Array.from(document.querySelectorAll('.place'))
// array which we will switch the background to x or O
const grips = Array.from(document.querySelectorAll('.grip'))
// it will display the current player turn
const playerDisplay = document.querySelector('.display-player')
// button to add event listener to reset/to play again 
const resetButton = document.querySelector('#reset')
// announce the winner of the game or if it is draw tie
const announcer = document.querySelector('.announcer')

// the board of the tic tac toe before we display it on the web
let board = ['','','','','','','','','']
// our current player turn
let currentPlayer = 'X'
// who won the game?
let playerWinner = ''

// all the states that we will display
const PLAYERX_WON = 'PLAYER X WON'
const PLAYERO_WON = 'PLAYER O WON'
const TIE = 'TIE'

// all the winning places in the board
let winningStates = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

// adding to each element event listener of 'click'
places.forEach(place => {
    let placeIndex = places.indexOf(place) // finding the index for board
    // console.log(placeIndex)
    place.addEventListener('click', function(){
        if(board[placeIndex] === '' && playerWinner === '') {// in this if statement we will check if the game is still active and if is the place of element that you clicked on is empty
            board[placeIndex] = currentPlayer
            // console.log(board)
            
            DisplayOnBoard(placeIndex)// calling the function to display all our changes to be on our front
            // document.getElementsByClassName("place").style
            
            playerWinner = checkIfSomeoneWon() // check if some player won the game

        // if player O have won the game than it will announce that he won, and than we won't be able to click
        // until we will click the reset button or refresh
        if (playerWinner === PLAYERO_WON){
            announcer.textContent = PLAYERO_WON
            console.log('O won')
        } 

        // checking if the X won the game if true it will announce that he won, and than we won't be able to click
        if (playerWinner === PLAYERX_WON){
            announcer.textContent = PLAYERX_WON
            console.log('X won')
        }
        
        // checking if the players have fill all the board if is that true checks
        // if someone win. else announce TIE
        if(board.every(checkIfBoardIsFull) == true){
            isGameActive = checkIfSomeoneWon()
            if(playerWinner === '')
                announcer.textContent = "TIE"
        }

        currentPlayer = switchBetweenPlayers()
        playerDisplay.textContent = currentPlayer.toString()
    }
    })
})
//adding an event listener to the reset button
resetButton.addEventListener('click', resetBoard)

function switchBetweenPlayers(){
    // function who switches between two players 
    if(currentPlayer === "X") return 'O'

    return 'X'
}

function DisplayOnBoard(index){
    // this function will display the background of an element that we clicked on
    // if current player is X so the background will be X
    // if current player is O the background will be O
    for(let i = 0; i < 9; i++){
        if(index == i){
            // console.log(i, index)
            let PlaceInBoard = document.getElementById(index.toString()) // finding the index of the element by finding the id of the child
            if(currentPlayer ==="X"){
                // changing the background
                PlaceInBoard.style.background = "url('images/Black-X.png')"
                PlaceInBoard.style.backgroundSize = "cover"
                PlaceInBoard.style.backgroundRepeat = "no-repet"
            } else {
                // changing the background
                PlaceInBoard.style.background = "url('images/playO.png')"
                PlaceInBoard.style.backgroundRepeat = "no-repet"
                PlaceInBoard.style.backgroundSize = "cover" 
            }
            
        }
        
    }
}

function checkIfSomeoneWon(){
    // this function checks if someone won the game. Function checks on which winning state
    // the player own. When the function finds the state it will display to his parent
    // (which is the div with class place) and change his background color
    for (let i = 0; i < winningStates.length; i++) {
        const element = winningStates[i]
        // checks every state if the player X is won in winning states
        if(board[element[0]] == "X" && board[element[1]] == "X" && board[element[2]] == "X") {
            // for every element that the if statement finds it will add background to him
            for(let i = 0; i < 3; i++) {
                let x1 = document.getElementById(element[i].toString()).parentElement
                x1.style.background = "rgba(57, 57, 57, 0.21)"
                // console.log(x1)
            }
            // returns the string of the player
            return PLAYERX_WON
        }
        
        // checks every state if the player O is won in winning states
        if(board[element[0]] == "O" && board[element[1]] == "O" && board[element[2]] == "O") {
            for(let i = 0; i < 3; i++) {
                // for every element that the if statement finds it will add background to him
                let x1 = document.getElementById(element[i].toString()).parentElement
                x1.style.background = "rgba(57, 57, 57, 0.21)"
                // console.log(x1)
            }
            // returns the string of the player
            return PLAYERO_WON
        }
    }
    return ''
}

function resetBoard(){
    // function of an event listener 'click' when clicks it will clear the board
    // and other variables, clear the grip class and so on
    for(let i = 0; i < board.length; i++) {
        board[i] = ''
        let whiteColor = document.getElementById(i.toString()).style
        let x = document.getElementById(i.toString()).parentElement.style
        x.backgroundColor = 'transparent'
        whiteColor.background = 'none'

        playerWinner = ''
    }
    // resets the announcer
    announcer.textContent = ''

    //resets the player turn to player X
    currentPlayer = "O"
    currentPlayer = switchBetweenPlayers()

    playerDisplay.textContent = currentPlayer
    // console.log(board)
    // console.log(currentPlayer)
}

function checkIfBoardIsFull(oneGrip){
    // checks if array board full of variables. We does that to check if the game is tie/draw
    return oneGrip === 'X' || oneGrip === 'O'
}