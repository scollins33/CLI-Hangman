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
    this.value = pValue;
    this.hidden = true;
    this.rep = '_';
}

Letter.prototype.checkStatus = function () {
    return this.hidden;
};

Letter.prototype.checkValue = function (pGuess) {
    return (pGuess === this.value);
};

Letter.prototype.reveal = function () {
    this.hidden = false;
    this.rep = this.value;
};

module.exports = Letter;