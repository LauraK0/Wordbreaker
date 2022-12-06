const startButton = document.getElementById("start-button");

let modal;
let heightString;
let widthString;
let height;
let width;
let row = 0; //current guess (attempt #)
let col = 0; //current letter for that attempt
let winningWord;
let gameOver = false;
let closeButton;
let resetButton;

// document.addEventListener("DOMContentLoaded", );

document.addEventListener("keyup", (e) => {
    processInput(e);
})

startButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    heightString = document.getElementById('number-of-guesses').value; //number of guesses
    widthString = document.getElementById('length-of-word').value; //length of the word
    height = Number(heightString); //number of guesses
    width = Number(widthString); //length of the word
    removeStartButton();
    getWinningWord()
    generateGameBoard();
})

function removeStartButton() {
  if (document.body.contains(document.getElementById("start-button"))){  
    document.getElementById("start-button").remove();
    document.getElementById('game-init').remove();
}
}

function getWinningWord(){
    fetch(`https://random-word-api.herokuapp.com/word?length=${width}`)
    .then((response) => {
        if (!response.ok) throw new Error(response.status); 
        return response.json();
    })
    .then (response => {
    winningWord = response[0].toUpperCase();
    console.log(winningWord);
      })
    .catch(error => {
        console.log(error);
    }) 
  }

  // generates Game //

function generateGameBoard() {
  const gameBoard = document.createElement('div'); 
  gameBoard.className = 'game-area';
  const gameGrid = document.createElement('div'); 
  gameGrid.className = 'game-grid';
  gameGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  const keyboardContainer = document.createElement('div'); 
  keyboardContainer.className = 'keyboard-container';
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
    let tileHTML = 
    `<span id='${r}-${c}' class='row-block'></span>`;
    gameGrid.innerHTML += tileHTML; 
    }
  document.body.append(gameBoard);
  gameBoard.append(gameGrid);
}
  let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
]

for (let i = 0; i < keyboard.length; i++) {
    let currRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");
    keyboardRow.id = keyboard[i];

    for (let j = 0; j < currRow.length; j++) {
        let keyTile = document.createElement("button");

        let key = currRow[j];
        keyTile.innerText = key;
        if (key == "Enter") {
            keyTile.id = "Enter";
        }
        else if (key == "⌫") {
            keyTile.id = "Backspace";
        }
        else if ("A" <= key && key <= "Z") {
            keyTile.id = "Key" + key; 
        } 
        keyTile.classList.add("unused");
        keyTile.addEventListener("click", processKey);

        if (key == "Enter") {
            keyTile.classList.add("enter-key-tile");
        } else {
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
    }
    document.body.append(keyboardContainer);
    keyboardContainer.appendChild(keyboardRow);
}

    let spacerOne = document.createElement("div");
    let spacerTwo = document.createElement("div");
    spacerOne.classList.add("spacer-half");
    spacerTwo.classList.add("spacer-half");
    let middleRow = document.getElementById('A,S,D,F,G,H,J,K,L');
    let buttonA = document.getElementById('KeyA');
    middleRow.insertBefore(spacerOne, buttonA);
    middleRow.appendChild(spacerTwo);
}

//end of generate game function//


//functions to handle and compare words //

function processKey() {
  e = { "code" : this.id };
  processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(`${row}-${col}`);
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(`${row}-${col}`);
        currTile.innerText = "";
    }
  
    else if (e.code == "Enter") {
      (col === width) ? update(): alert(`Please enter a ${width} letter word`);
    }
  
    if (!gameOver && row == height) {
      console.log('game is over');
        gameOver = true;
        losingModal();
    }


}

function update() {
  let guess = "";

  //string up the guesses into the word
  for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(`${row}-${c}`);
      let letter = currTile.innerText;
      guess += letter;
  }
  console.log(guess);
    guess = guess.toLocaleLowerCase(); //case sensitive
    checkIfRealWord(guess);
}

function checkIfRealWord(guess){
    if (winningWord === guess.toLocaleUpperCase()) {
        gameWon();
    }
    else {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
            .then((response) => {
                if (!response.ok) throw new Error(response.status); 
                return response.json();
            })
            .then((data_arr) => { //returns object containing data relating to work
                data_arr.every ( data => { //looping through each item in the object
                        flipTiles(data.word);
                        })
                    })
            .catch(error => {
                console.log(error);
                alert('Please enter a 5 letter word found in the dictionary');
            }) 
        }
}


function flipTiles() {
    let currentGuess = []
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(`${row}-${c}`);
        let letter = currTile.innerText;
        currentGuess.push({ tile: `${row}-${c}`, value: letter});
    }

    let winningArray = winningWord.split('');

    currentGuess.forEach((letter, index) => {
        if (letter.value == winningArray[index]) {
            let currTile = document.getElementById(letter.tile);
            let keyTile = document.getElementById("Key" + letter.value);
            currTile.classList.add('correct');
            keyTile.classList.remove("unused");
            keyTile.classList.add('correct');
        }
    })

    currentGuess.forEach(letter => {
        if (winningArray.includes(letter.value)) {
            let currTile = document.getElementById(letter.tile);
            let keyTile = document.getElementById("Key" + letter.value);
            if (currTile.classList.value !== 'row-block correct') {
                currTile.classList.add('present');
                keyTile.classList.remove("unused");
                keyTile.classList.add('present');
            }
        }
    })

    currentGuess.forEach(letter => {
        if (!winningArray.includes(letter.value)) {
            let currTile = document.getElementById(letter.tile);
            let keyTile = document.getElementById("Key" + letter.value);
            if (currTile.classList.value !== 'row-block correct' || currTile.classList.value !== 'row-block present') {
                currTile.classList.add('absent');
                keyTile.classList.remove("unused");
                keyTile.classList.add('absent');
            }
        }
    })

    row += 1; //start new row
    col = 0; //start at 0 for new row

    if (row >= height) {
        losingModal();
      }
}

function gameWon() {
    flipTiles();
    winningModal();
}

function winningModal() {
    modal = document.createElement('div'); 
    modal.classList.add('modal');
    const modalHTML = 
    `
        <div id="modal-content">
        <span class="close-button">×</span>
        <h2 class="search-results-heading">You've Won</h2>
        <button class="standard-button" type="reset" id="reset-button">Play Again?</button>
    `;
    modal.innerHTML = modalHTML; 
    document.body.appendChild(modal); // add new section to DOM for displaying search results
    modal.classList.toggle("show-modal");
    closeButton = document.querySelector(".close-button");
    resetButton = document.getElementById('reset-button');
    document.addEventListener(
        "click",
        function (event) {
          // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
          if (
            event.target.matches(".close-button") ||
            !event.target.closest(".modal-content")
          ) {
            closeModal();
          }
        },
        false
      );
    // closeButton.addEventListener("click", closeModal);
    resetButton.addEventListener("click", reset);
}

function losingModal() {
    modal = document.createElement('div'); 
    modal.classList.add('modal');
    const modalHTML = 
    `
        <div id="modal-content">
        <h2 class="search-results-heading">You've Lost!</h2>
        <p>The winning word was ${winningWord}!</p>
        <button class="standard-button" type="reset" id="reset-button">Play Again?</button>
    `;
    modal.innerHTML = modalHTML; 
    document.body.appendChild(modal); // add new section to DOM for displaying search results
    modal.classList.toggle("show-modal");
    resetButton = document.getElementById('reset-button');
    document.addEventListener(
        "click",
        function (event) {
          // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
          if (
            !event.target.closest(".modal-content")
          ) {
            closeModal();
          }
        },
        false
      );
    // closeButton.addEventListener("click", closeModal);
    resetButton.addEventListener("click", reset);
}


function closeModal(){
    modal.remove();
}

function reset() {
    closeModal();
    let game = document.querySelector('.game-area');
    let keyboard = document.querySelector('.keyboard-container');
    game.remove();
    keyboard.remove();
    generateGameBoard();
    getWinningWord();
    row = 0; //start new row
    col = 0; //start at 0 for new row
}
