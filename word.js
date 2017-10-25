// **Word**:
// Used to create an object representing the current word the user is attempting to guess.
// This should contain word specific logic and data.

// pull in the Urban npm module to get a random word
// get Letter module as well
var urban = require('urban');
var Letter = require('./letter.js');

// set up Word Constructor
function Word() {
    this.value = '';
}

// add function to generate a new word
Word.prototype.getNewWord = function () {
    // call urban API for random word
    urban.random().first(function (response) {
        // set the word value
        this.value = response.word;

        // split the word into a string
        // then loop over it and create a Letter object for each letter
        var characters = this.value.split('');
        var letters = [];

        for (var i = 0; i < characters.length; i++) {
            letters.push(new Letter(characters[i]));
        }

        // set the array of Letter objects
        this.letters = letters;
    });
};

module.exports = Word;