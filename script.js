const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById('game-container');
const wordSize = 5

startButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    getWord();
    removeStartButton();
    generateGame();
})

function removeStartButton() {
  if (document.body.contains(document.getElementById("start-button"))){  
    document.getElementById("start-button").remove();
}
}

function generateGame() {
  const gameGrid = document.createElement('div'); 
  gameGrid.className = 'game-area';
  for(i = 0; i < 6; i++){
    const row = document.createElement('div');
    row.className = 'row';
    for(j = 0; j < wordSize; j++){
      const rowBlock = document.createElement('div');
      rowBlock.className = 'row-block';
      row.append(rowBlock);
    }
    gameGrid.append(row);
  }
  gameContainer.append(gameGrid);
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
        let str = "Please enter a di";
        const definition = document.createTextNode(str);
        para.appendChild(definition);
        const list = document.querySelector(".search-results-description");
        list.appendChild(para);
    }) 
  }

    function compareWord() {

    }