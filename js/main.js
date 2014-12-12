/**
 * Sudoku
 * Author: Varun Varada
 */

$( document ).ready( function() {
    var game = new Sudoku();
    var view = new SudokuView( '#board' );

    view.render();
    view.populate( game.generate() );
});