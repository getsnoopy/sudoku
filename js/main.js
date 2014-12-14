/**
 * Sudoku
 * Author: Varun Varada
 */


// Weirdly, a for loop is apparently significantly faster than the native Array.indexOf()
// http://jsperf.com/thor-indexof-vs-for/5
Array.prototype.betterIndexOf = function( needle ) {
    for( var i = this.length - 1; i >= 0; i-- ) {
        if( this[i] === needle ) {
            return i;
        }
    }
    return -1;
};

$( document ).ready( function() {
    var game = new Sudoku();
    var view = new SudokuView( '#board', game );

    view.populate( game.generate() );
});