const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById('game-container');

let height = 6; //number of guesses
let width = 5; //length of the word

let row = 0; //current guess (attempt #)
let col = 0; //current letter for that attempt

startButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    getWord();
    removeStartButton();
    generateGameBoard();
})

function removeStartButton() {
  if (document.body.contains(document.getElementById("start-button"))){  
    document.getElementById("start-button").remove();
}
}

function getWord(){
  fetch(`https://random-word-api.herokuapp.com/word?length=5`)
    .then((response) => {
        if (!response.ok) throw new Error(response.status); 
        return response.json();
    })
    .then (response => {
    console.log(response)
      })
    .catch(error => {
        console.log(error);
        let para = document.createElement("p");
        let str = "Sorry, we couldn't find this word in the dictionary.";
        const definition = document.createTextNode(str);
        para.appendChild(definition);
        const list = document.querySelector(".search-results-description");
        list.appendChild(para);
    }) 
  }

function generateGameBoard() {
  const gameBoard = document.createElement('div'); 
  gameBoard.className = 'game-area';

  const gameGrid = document.createElement('div'); 
  gameGrid.className = 'game-grid';

  const keyboardContainer = document.createElement('div'); 
  keyboardContainer.className = 'keyboard-container';

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
        // <span id="0-0" class="tile">P</span>
        let tile = document.createElement('span');
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add('row-block');
        tile.innerText = '';
        gameGrid.append(tile);
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
console.log(buttonA);
middleRow.insertBefore(spacerOne, buttonA);
middleRow.appendChild(spacerTwo);
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  console.log(key);
});

function processKey() {
  e = { "code" : this.id };
  processInput(e);
}



function checkIfDictionaryWord(word) {
  // request that word from dictionary API
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
        if (!response.ok) throw new Error(response.status); 
        return response.json();
    })
    .catch(error => {
        console.log(error);
        let para = document.createElement("p");
        let str = "Please enter a valie word";
        const output = document.createTextNode(str);
        para.appendChild(output);
        const list = document.querySelector(".");
        list.appendChild(para);
    }) 
  }

    function compareWord() {

    }