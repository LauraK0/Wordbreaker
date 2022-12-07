# Wordle Clone

## Overview 

The app is a replication of the popular NYT Wordle game where the player must correctly guess a 5 letter word randomly picked. 

Our task was to break up every part of the game into a separate user story, create an issue for every user story. Then decide which user story you are going to focus on and attempt to complete the selected user story.

### How to play
Try the app out [here](laurak0.github.io/wordle-clone/)

### How to use
To clone this repo to your local computer, copy and paste the following into your terminal:

`git clone git@github.com:LauraK0/wordle-clone.git`

## User stories

The user stories are:
- [x] game begins, grid is created
- [x] word from the dictionary randomly picked as the winning word
- [x] player should be able to input a 5 letter word 
- [x] chosen word must be 5 letters exactly and should be a word found in the dictionary, if not word should be allowed to be submitted
- [x] the word should be evaluated against the winning word
- [x] if the word contains letters that are in the word but in the wrong place, the letter should be highlighted in yellow
- [x] if the word contains letters that are in the word and in the right place, the letter should be highlighted in green
- [x] the player be given 6 chances before losing, same rules apply
- [x] if the player correctly guesses the word, they should be congratulated for their great feat
- [x] if the player gets to the end of their 6 chances without correctly guessing the word, they should be notified that they have lost
- [x] game should restart with a new word randomly allocated as the winning word
- [ ] a record should be kept of the players progress containing how many times they've played and if the guessed the word correctly and how many attempts it took

## Development of first user story

I initially chose two user stories to tackle, these were generating the winning from a random word API and then check the user input can be found in the dictionary.

I looked at various to see if they provide what I needed. I couln't one single API that could a generate a random API and also compare two words. So I chose two separate APIs and fetched at different points. These were the [Random Word Api](https://random-word-api.herokuapp.com/) to generate a random word and the [Free Dictionary API](https://dictionaryapi.dev/) to check if the word is valid.

#### Challenges 
An issue occurs as sometimes the random word generated is not found in the free dictionary API and the user can never win. 

Alternative to Free dictionary API was to get all words from the Random Word API and then check the guessed word against this. This would have been a huge data dump and would take a long time to fetch and will likely slow down the application.

I resolved by checking for a winning match before checking whether the word is in the dictionary app.


