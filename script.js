const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById('game-container');

let height = 6; //number of guesses
let width = 5; //length of the word

let row = 0; //current guess (attempt #)
let col = 0; //current letter for that attempt

let word = '';
let gameOver = false;

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
    word = response[0];
    console.log(word);
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


    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
      processInput(e);
  })
}

//end of generate game function//

//functions to handle and compare words //

function processKey() {
  e = { "code" : this.id };
  processInput(e);
}

function processInput(e) {
  if (gameOver) return; 

  // alert(e.code);
  if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
          let currTile = document.getElementById(row.toString() + '-' + col.toString());
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
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      currTile.innerText = "";
  }

  else if (e.code == "Enter") {
      update();
  }

  if (!gameOver && row == height) {
      gameOver = true;
      //document.getElementById("answer").innerText = word;
  }
}

function update() {
  let guess = "";
  //document.getElementById("answer").innerText = "";

  //string up the guesses into the word
  for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;
      guess += letter;
  }

  guess = guess.toLowerCase(); //case sensitive
  console.log(guess);

  if (!guessList.includes(guess)) {
      //document.getElementById("answer").innerText = "Not in word list";
      return;
  }
  
  //start processing guess
  let correct = 0;

  let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
  for (let i = 0; i < word.length; i++) {
      let letter = word[i];

      if (letterCount[letter]) {
         letterCount[letter] += 1;
      } 
      else {
         letterCount[letter] = 1;
      }
  }

  console.log(letterCount);

  //first iteration, check all the correct ones first
  for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;

      //Is it in the correct position?
      if (word[c] == letter) {
          currTile.classList.add("correct");

          let keyTile = document.getElementById("Key" + letter);
          keyTile.classList.remove("present");
          keyTile.classList.add("correct");

          correct += 1;
          letterCount[letter] -= 1; //deduct the letter count
      }

      if (correct == width) {
          gameOver = true;
      }
  }

  console.log(letterCount);
  //go again and mark which ones are present but in wrong position
  for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;

      // skip the letter if it has been marked correct
      if (!currTile.classList.contains("correct")) {
          //Is it in the word?         //make sure we don't double count
          if (word.includes(letter) && letterCount[letter] > 0) {
              currTile.classList.add("present");
              
              let keyTile = document.getElementById("Key" + letter);
              if (!keyTile.classList.contains("correct")) {
                  keyTile.classList.add("present");
              }
              letterCount[letter] -= 1;
          } // Not in the word or (was in word but letters all used up to avoid overcount)
          else {
              currTile.classList.add("absent");
              let keyTile = document.getElementById("Key" + letter);
              keyTile.classList.add("absent")
          }
      }
  }

  row += 1; //start new row
  col = 0; //start at 0 for new row
}