/**
 * Sudoku Game
 * Author: Varun Varada
 */

(function( window ){

'use strict';

var Sudoku = function( board ){
    this.element = $( board );

};

// Expose Sudoku object to global scope
window.Sudoku = Sudoku;

})( window );