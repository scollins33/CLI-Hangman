// **Word**:
// Used to create an object representing the current word the user is attempting to guess.
// This should contain word specific logic and data.

// pull in the Urban npm module to get a random word
// get Letter module as well
const urban = require('urban');
const Letter = require('./letter.js');

// set up Word Constructor
function Word() {
    this.isSet = false;
}

// get new word from Urban Dictionary
// then process into separate letters
// set 'isSet' to true once all this is complete
Word.prototype.getNewWord = function () {

    // use arrow function to preserve 'this'
    urban.random().first((response) => {
        // set the word value
        console.log('The word is: ' + response.word);
        this.value = response.word;

        // split the word into a string
        // then loop over it and create a Letter object for each letter
        let characters = this.value.split('');
        let letters = [];

        for (let i = 0; i < characters.length; i++) {
            letters.push(new Letter(characters[i]));
        }

        // set the array of Letter objects
        this.letters = letters;

        this.isSet = true;
        console.log('Word and Letters have been set');
    });
};

module.exports = Word;