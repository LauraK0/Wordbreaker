# Wordle Clone

## Overview 

The app is a replication of the popular NYT Wordle game. 
User must correctly guess a 5 letter word randomly picked. 

## User stories

The user stories are:
- game begins, grid is created, word from the dictionary randomly picked as the winning word
- player should be able to input a 5 letter word 
- chosen word must be 5 letters exactly and should be a word found in the dictionary, if not word should be allowed to be submitted
- the word should be evaluated against the winning word
- if the word contains letters that are in the word but in the wrong place, the letter should be highlighted in yellow
- if the word contains letters that are in the word and in the right place, the letter should be highlighted in green
- the player be given 6 chances before losing, same rules apply
- if the player correctly guesses the word, they should be congratulated for their great feat
- if the player gets to the end of their 6 chances without correctly guessing the word, they should be notified that they have lost
- game should restart with a new word randomly allocated as the winning word
- a record should be kept of the players progress containing how many times they've played and if the guessed the word correctly and how many attempts it took

## Development

It was built with the [Random Word Api](https://random-word-api.herokuapp.com/) to generate a random word and the [Free Dictionary API](https://dictionaryapi.dev/) to check if the word is valid.

An issue occurs as sometimes the random word generated is not found in the free dictionary API and the user can never win.

Alternative to Free dictionary API was to get all words from the Random Word API and then check the guessed word against this. This will be a huge data dump and will take a long time to fetch and will likely slow down the application.
