/**
 * Sudoku
 * Author: Varun Varada
 */

(function( window ) {

// Enable strict mode
'use strict';

/**
 * Instantiates a new Sudoku board
 */
var Sudoku = function() {

    /**
     * Multidimensional array that holds the current board state
     * @type {Array}
     */
    this.board = [];

    /**
     * Multidimensional array that holds the current board's solution
     * @type {Array}
     */
    this.solution = [];

};

$.extend( true, Sudoku.prototype, {

    /**
     * Gets the current board
     * @return {Array[]} The current board
     */
    getBoard: function() {
        return this.board;
    },

    /**
     * Gets the current board's solution
     * @return {Array[]} The current board's solution
     */
    getSolution: function() {
        return this.solution;
    },

    /**
     * Generates a new board
     * Note: Gives the same board every time for the moment (have to implement a real board generator).
     *
     * @return {Array[]} The generated board
     */
    generate: function() {
        var i;

        // Initialize board
        this.board = [
            '5 3 0 ' + '0 7 0 ' + '0 0 0',
            '6 0 0 ' + '1 9 5 ' + '0 0 0',
            '0 9 8 ' + '0 0 0 ' + '0 6 0',

            '8 0 0 ' + '0 6 0 ' + '0 0 3',
            '4 0 0 ' + '8 0 3 ' + '0 0 1',
            '7 0 0 ' + '0 2 0 ' + '0 0 6',

            '0 6 0 ' + '0 0 0 ' + '2 8 0',
            '0 0 0 ' + '4 1 9 ' + '0 0 5',
            '0 0 0 ' + '0 8 0 ' + '0 7 9'
        ];
        for ( i = 0; i < this.board.length; i++ ) {
            this.board[i] = this.board[i].split( ' ' );
        };

        // Initialize corresponding solution
        this.solution = [
            '5 3 4 ' + '6 7 8 ' + '9 1 2',
            '6 7 2 ' + '1 9 5 ' + '3 4 8',
            '1 9 8 ' + '3 4 2 ' + '5 6 7',

            '8 5 9 ' + '7 6 1 ' + '4 2 3',
            '4 2 6 ' + '8 5 3 ' + '7 9 1',
            '7 1 3 ' + '9 2 4 ' + '8 5 6',

            '9 6 1 ' + '5 3 7 ' + '2 8 4',
            '2 8 7 ' + '4 1 9 ' + '6 3 5',
            '3 4 5 ' + '2 8 6 ' + '1 7 9'
        ];
        for ( i = 0; i < this.solution.length; i++ ) {
            this.solution[i] = this.solution[i].split( ' ' );
        };

        return this.board;
    },

    /**
     * Checks whether the provided solution is correct
     * Note: Assumes puzzles have unique solutions, which is true in 99.99% of the cases.
     * @param  {Array} solution
     * @return {Boolean}          Whether the provided solution is correct or not
     */
    checkSolution: function( solution ) {
        var i, j;

        // Check format and dimensions
        if( !(solution instanceof Array && solution.length === 9) ) {
            return false;
        }

        for( i = 0; i < solution.length; i++ ) {
            // Check format and dimensions
            if( !(solution[i] instanceof Array && solution[i].length === 9) ){
                return false;
            }

            // Verify values
            // Note: Not using strict equals to because we want to ignore type inconsistencies.
            for( j = 0; j < solution[i].length; j++ ) {
                // Empty value
                if( solution[i][j] == 0 ){
                    return false;
                }

                if( solution[i][j] != this.solution[i][j] ){
                    return false;
                }
            }
        }

        return true;
    }

});

// Expose the constructor to the global scope
window.Sudoku = Sudoku;

})( window );
