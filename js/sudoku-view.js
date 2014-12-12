/**
 * Sudoku
 * Author: Varun Varada
 */

(function( window ) {

// Enable strict mode
'use strict';

/**
 * Instantiates a new Sudoku view using a DOM element
 *
 * @param {String} board DOM Selector for the board
 */
var SudokuView = function( element ) {

    /**
     * The DOM element that holds the board
     * @type {jQuery}
     */
    this.element = $( element );
};

$.extend( true, SudokuView.prototype, {

    /**
     * Renders the board
     */
    render: function() {
        var i, j, cellRow, blockRow, block, table;

        table = $( '<table/>' );

        // Blocks
        for( i = 0; i < 9; i++ ) {
            // Start a new row
            if( i % 3 === 0 ) {
                blockRow = $( '<tr/>' );
            }

            block = $( '<table/>' );

            // Cells in a block
            for( j = 0; j < 9; j++ ) {
                // Start a new row
                if( j % 3 === 0 ) {
                    cellRow = $( '<tr/>' );
                }

                // Create cells
                cellRow.append( $( '<td/>' ) );

                // Append row to block
                if( (j + 1) % 3 === 0 ) {
                    block.append( cellRow );
                }
            }

            block = $( '<td/>' ).append( block );
            blockRow.append( block );

            // Append row to table
            if( (i + 1) % 3 === 0 ) {
                table.append( blockRow );
            }
        }

        this.element.append( table );
    },

    /**
     * Populates the board with a given board array
     *
     * @param  {Array[]} board The array representation of the board
     */
    populate: function( board ) {
        var i, j, cells, blocks = $( '#board table table' );

        for( i = 0; i < blocks.length; i++ ) {
            cells = $( blocks[i] ).find( 'td' );
            for( j = 0; j < cells.length; j++ ) {
                var number = board[ (3 * Math.floor( i / 3)) + Math.floor( j / 3 ) ][ (3 * (i % 3)) + (j % 3) ];

                // Skip empty cells
                if( number == 0 ) {
                    continue;
                }

                $( cells[j] ).text( number );
            }
        }
    }

});

// Expose the constructor to the global scope
window.SudokuView = SudokuView;

})( window );
