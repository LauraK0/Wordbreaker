console.log('hello')
document.addEventListener("click", (e) => {
    e.preventDefault(); 
    console.log('button pressed')
    getWord(); 
})

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