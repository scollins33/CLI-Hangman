const Word = require('./word.js');
const inquirer = require('inquirer');

/*  Gameboard Constructor

    Properties:
        gameWord (string)
        round (integer)
        lives (integer)
        inProgress (bool)
        newGame (bool)
 */
function Gameboard() {
    // create and set word
    this.gameWord = new Word;
    this.gameWord.getNewWord();

    // start round count
    this.round = 1;
    this.inProgress = false;
    this.newGame = false;
}

// used to test
Gameboard.prototype.showWord = function () {
    if (this.gameWord.isSet === false) {
        console.log('waiting for word...')
    } else {
        console.log(this.gameWord);
    }
};

// generates the CLI board on demand
Gameboard.prototype.generateBoard = function () {
    console.log(`\n||\n||  Round ${this.round}`);
    console.log(`||  Lives Left: ${this.lives}`);

    let gameDisplay = '||  Board:    ';
    this.gameWord.letters.forEach(function (each) {
        gameDisplay += (`${each.rep} `);
    });
    gameDisplay += '\n||\n';
    console.log(gameDisplay);
};

// starts the game
Gameboard.prototype.startGame = function () {
    this.inProgress = true;
    this.lives = Math.ceil(this.gameWord.length / 2) + 2;

    console.log('------------------------------------------');
    console.log('Game Starting! \n');
    console.log(`Hint: \n ${this.gameWord.def}`);

    // start the first round
    this.playRound();
};

// play a round of the game
// if you win
// if you lose
// otherwise play a new round (recursive)
Gameboard.prototype.playRound = function () {
    // generate board to show fresh state
    this.generateBoard();

    // inquire for guess
    inquirer.prompt({
            type: 'input',
            name: 'guess',
            message: 'Whats your next guess?',
            validate: function (val) {
                let matching = val.match(/^[a-z0-9\s]+$/i);
                let oneChar = val.length < 2;

                if (matching && oneChar) {
                    return true;
                }
                return 'Please enter an alphanumeric guess.';
            }
    }).then((answer) => {
        // convert to lowercase
        let thisGuess = answer.guess.toLowerCase();
        let revealedCount = 0;
        let winRound = false;

        // loop through the Letters to check the guess
        this.gameWord.letters.forEach((each) => {
            // check for already guessed - revealed and equivalent
            if (!each.isHidden() && each.checkValue(thisGuess)) {
                revealedCount++;
                winRound = true;
            }
            // skip if the letter isn't hidden
            else if (!each.isHidden()) {
                revealedCount++;
            }
            // if the guess matches reveal the letter
            else if (each.checkValue(thisGuess)) {
                each.reveal();
                revealedCount++;
                winRound = true;
            }
        });

        // if you didn't get a match, lose a life
        if (!winRound) {this.lives--;}

        // check for game win
        if (revealedCount === this.gameWord.length) {
            // one last board generation so you can see the completed word
            this.generateBoard();

            // win, all characters have been revealed
            console.log('  ------------------------------------------');
            console.log('|');
            console.log('|                  YOU WIN');
            console.log('|');
            console.log('  ------------------------------------------');
            this.newGame = true;
        }
        // if no lives, lose the game
        else if (this.lives === 0) {
            console.log('  ------------------------------------------');
            console.log('|');
            console.log('|                  YOU LOSE');
            console.log('|');
            console.log('  ------------------------------------------');
            this.newGame = true;
        }
        else {
            // play next round
            this.round++;
            this.playRound();
        }
    });
};

module.exports = Gameboard;