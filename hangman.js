const inquirer = require('inquirer');
const Gameboard = require('./gameboard.js');

let gameBoard = new Gameboard;

let wordCheck = setInterval(function () {
    if (gameBoard.gameWord.isSet === false) {
        console.log('waiting for word');
    } else {
        console.log('we got a word boys');
        clearInterval(wordCheck);
    }
}, 500);