const startButton = document.getElementById("start-button")
startButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    getWord();
    startGame();
})

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the form's default behaviour of submitting
    const input = document.querySelector("input");
    const guessedWord = 'input.value.toLowerCase().trim()'; 
    getDefinition(guessedWord);
})

function startGame() {
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