/**
 * Sudoku
 * Author: Varun Varada
 */

(function ( window ) {

// Enable strict mode
'use strict';

/**
 * Instantiates a new Sudoku board
 */
var Sudoku = function() {

    /**
     * Multidimensional array that holds the initial board state
     *
     * @type {Array}
     */
    this.initialBoard = [];

    /**
     * Multidimensional array that holds the current board state
     *
     * @type {Array}
     */
    this.board = [];

    /**
     * Multidimensional array that holds the current board's solution
     *
     * @type {Array}
     */
    this.solution = [];

};

$.extend( true, Sudoku.prototype, {

    /**
     * Gets the current board
     *
     * @return {Array[]} The current board
     */
    getBoard: function() {
        return this.board;
    },

    /**
     * Gets the current board's solution
     *
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

        // Keep a copy of the initial board
        this.initialBoard = $.extend( true, [], this.board );

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
     *
     * @param  {Array}    board
     * @return {Boolean}          Whether the provided solution is correct or not
     */
    isSolved: function() {
        var i, j;

        for( i = 0; i < this.board.length; i++ ) {
            // Verify values
            // Note: Not using strict equals to because we want to ignore type inconsistencies.
            for( j = 0; j < this.board[i].length; j++ ) {
                // Empty value
                if( this.board[i][j] == 0 ) {
                    return false;
                }

                if( this.board[i][j] != this.solution[i][j] ) {
                    return false;
                }
            }
        }

        return true;
    },

    /**
     * Updates the board at specified position with number.
     *
     * @param  {Object} position The position to update
     * @param  {Number} number   The number to update the position with
     */
    update: function ( position, number ) {
        this.board[position.row][position.column] = number;
    },

    /**
     * Clears a position on the board
     *
     * @param  {Object} position The position to clear
     */
    clear: function ( position ) {
        this.board[position.row][position.column] = 0;
    },

    /**
     * Resets the board to its initial state and returns it
     *
     * @return {Array[]} The reset board
     */
    reset: function() {
        this.board = $.extend( true, [], this.initialBoard );
        return this.board;
    },

    /**
     * Gets a list of valid numbers that can be played in a certain board position
     *
     * @param  {Object} position The position on the board
     * @return {Array}          An array of valid numbers
     */
    getValidNumbers: function ( position ) {
        var i, j, index, validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Check row
        for( i = 0; i < this.board[position.row].length; i++ ) {
            if( this.board[position.row][i] != 0 ) {
                // Remove number that's been used from the valid numbers
                // Note: Converting array items to numbers to make types compatible
                index = validNumbers.betterIndexOf( +this.board[position.row][i] );
                if( index !== -1 ) {
                    validNumbers.splice( index, 1 );
                }
            }
        }

        // Check column
        for( i = 0; i < this.board.length; i++ ) {
            if( this.board[i][position.column] != 0 ) {
                // Remove number that's been used from the valid numbers
                // Note: Converting array items to numbers to make types compatible
                index = validNumbers.betterIndexOf( +this.board[i][position.column] );
                if( index !== -1 ) {
                    validNumbers.splice( index, 1 );
                }
            }
        }

        // Check block
        var beginRow = position.row - (position.row % 3),
            beginCol = position.column - (position.column % 3),
            endRow = beginRow + 2,
            endCol = beginCol + 2;
        for( i = beginRow; i <= endRow; i++ ) {
            for( j = beginCol; j <= endCol; j++ ) {
                if( this.board[i][j] != 0 ) {
                    // Remove number that's been used from the valid numbers
                    // Note: Converting array items to numbers to make types compatible
                    index = validNumbers.betterIndexOf( +this.board[i][j] );
                    if( index !== -1 ) {
                        validNumbers.splice( index, 1 );
                    }
                }
            }
        }

        return validNumbers;
    }

});

// Expose the constructor to the global scope
window.Sudoku = Sudoku;

})( window );
