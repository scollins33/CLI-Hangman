// **Word**:
// Used to create an object representing the current word the user is attempting to guess.
// This should contain word specific logic and data.

// pull in the Urban npm module to get a random word
// get Letter module as well
const urban = require('urban');
const Letter = require('./letter.js');

/*  Word Constructor

    Properties:
        isSet (bool)
        value (string)
        def (string)
        letters (array of Letters)
*/
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
        this.value = response.word;
        this.def = response.definition;

        // split the word into a string
        // then loop over it and create a Letter object for each letter
        let characters = this.value.split('');
        let letters = [];

        for (let i = 0; i < characters.length; i++) {
            letters.push(new Letter(characters[i]));
        }

        // set the array of Letter objects
        this.letters = letters;
        this.length = letters.length;

        this.isSet = true;
    });
};

module.exports = Word;