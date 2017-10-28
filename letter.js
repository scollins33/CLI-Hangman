// **Letter**:
// Used for each letter in the current word.
// Each letter object should either display an underlying character,
// or a blank placeholder (such as an underscore),
// depending on whether or not the user has guessed the letter.
// This should contain letter specific logic and data.

// create the Letter constructor
// value is what letter the object is
// hidden is boolean to check it's status
// rep is hwo it should be represented on the board
function Letter(pValue) {
    this.value = pValue.toLowerCase();
    this.hidden = true;
    this.rep = '_';
}

// return the status (hidden / revealed)
Letter.prototype.isHidden = function () {
    return this.hidden;
};

// compare the letter to the passed value
Letter.prototype.checkValue = function (pGuess) {
    return (pGuess === this.value);
};

// make the letter known
Letter.prototype.reveal = function () {
    this.hidden = false;
    this.rep = this.value;
};

module.exports = Letter;