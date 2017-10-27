const Word = require('./word.js');

function Gameboard() {
    this.gameWord = new Word;
    this.gameWord.getNewWord(this.gameWord.processWord);
}

Gameboard.prototype.showWord = function () {
    if (this.gameWord.isSet === false) {
        console.log('waiting for word...')
    } else {
        console.log(this.gameWord);
    }
};

Gameboard.prototype.startGame = function () {

};

module.exports = Gameboard;