/**
 * Sudoku
 * Author: Varun Varada
 */

(function ( window ) {

// Enable strict mode
'use strict';

/**
 * Instantiates a new Sudoku view using a DOM element
 *
 * @param {String} board DOM Selector for the board
 */
var SudokuView = function ( element, game ) {

    /**
     * The DOM element that holds UI interface
     *
     * @type {jQuery}
     */
    this.element = $( element );

    /**
     * The DOM element that holds the board
     * @type {[type]}
     */
    this.board = this.element.find( '.board' );

    /**
     * The DOM element that holds the number picker
     *
     * @type {?jQuery}
     */
    this.numberPicker = null;

    /**
     * Holds a reference to the game object being used
     *
     * @type {Sudoku}
     * @private
     */
    this._game = game;

    /**
     * Keeps track of whether the view has been initialized
     *
     * @type {Boolean}
     */
    this.initialized = false;

    // Initialization code
    this._render();
    this.reset();
};

$.extend( true, SudokuView.prototype, {

    /**
     * Binds UI controls to event handlers
     */
    bindEvents: function() {
        var _this = this;

        // Handle clicking on board cells
        this.board.on( 'click', '.grid table td.fillable', function ( event ) {
            // Prevent bubbling
            event.stopPropagation();

            _this.showNumberPicker(
                $( this ),
                _this._game.getValidNumbers( _this._calculateArrayPosition( $( this ) ) )
            );
        });

        // Handle clicking on number picker
        this.board.on( 'click', '.number-picker td:not(.disabled)', function ( event ) {
            // Prevent bubbling
            event.stopPropagation();

            var cell = $( this ).closest( '.number-picker' ).closest( 'td' );
            var number = $( this ).text();

            _this._game.update( _this._calculateArrayPosition( cell ), number );
            _this.update( cell, number );
            _this.hideNumberPicker();
            if( _this._game.isSolved() ) {
                _this.finish();
            }
        });

        // Handle clicking on clear button
        this.board.on( 'click', '.grid table td.fillable.filled button', function ( event ) {
            // Prevent bubbling
            event.stopPropagation();

            var cell = $( this ).closest( 'td' );

            _this._game.clear( _this._calculateArrayPosition( cell ) );
            _this.clear( cell );
        });

        // Handle clicking on restart button
        this.element.on( 'click', 'button[data-action="restart"]', function() {
            _this.reset();
            _this.populate( _this._game.reset() );
        });

        // Handle clicking on new game button
        this.element.on( 'click', 'button[data-action="new"]', function() {
            _this.reset();
            _this.populate( _this._game.generate() );
        });
    },

    /**
     * Renders the board
     *
     * @private
     */
    _render: function() {
        var i, j, cellRow, blockRow, block, table;

        table = $( '<table class="grid"></table>' );

        // Blocks
        for( i = 0; i < 9; i++ ) {
            // Start a new row
            if( i % 3 === 0 ) {
                blockRow = $( '<tr/>' );
            }

            block = $( '<table class="block"></table>' );

            // Cells in a block
            for( j = 0; j < 9; j++ ) {
                // Start a new row
                if( j % 3 === 0 ) {
                    cellRow = $( '<tr/>' );
                }

                // Create cells
                cellRow.append( $( '<td/>' )
                    .append( $( '<p/>' ) )
                    .append( $( '<button>×</button>' ) )
                );

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

        this.board.prepend( table );

        // Generate number picker
        if( !this.numberPicker ) {
            var row;
            this.numberPicker = $( '<table class="number-picker"></table>' );

            for( var i = 0; i < 3; i++ ) {
                row = $( '<tr class="np-row"></tr>' ).appendTo( this.numberPicker );
                row.append( $( '<td/>' ).text( (3 * i) + 1 ) );
                row.append( $( '<td/>' ).text( (3 * i) + 2 ) );
                row.append( $( '<td/>' ).text( (3 * i) + 3 ) );
            }

            this.numberPicker.appendTo( this.board ).hide();
        }
    },

    /**
     * Populate the board with a given board array
     *
     * @param  {Array[]} board The array representation of the board
     */
    populate: function ( board ) {
        var i, j, cells, number, blocks = this.board.find( 'table.grid table.block' );

        for( i = 0; i < blocks.length; i++ ) {
            cells = $( blocks[i] ).find( 'tr:not(.np-row) > td' );
            for( j = 0; j < cells.length; j++ ) {
                number = board[ (3 * Math.floor( i / 3)) + Math.floor( j / 3 ) ][ (3 * (i % 3)) + (j % 3) ];

                $( cells[j] ).toggleClass( 'fillable', number == 0 );
                $( cells[j] ).removeClass( 'filled' );

                // Handle empty cells
                if( number == 0 ) {
                    number = '';
                }

                $( cells[j] ).find( 'p' ).text( number );
            }
        }

        if( !this.initialized ) {
            this.bindEvents();
        }

        this.initialized = true;
    },

    /**
     * Updates a cell on the board
     *
     * @param  {jQuery} cell   The cell on the board to update
     * @param  {Number} number Number that the cell should be updated to
     */
    update: function ( cell, number ) {
        cell = $( cell );
        cell.find( 'p' ).text( number || '' );
        cell.toggleClass( 'filled', number != 0 );
    },

    /**
     * Clears a cell on the board
     *
     * @param  {jQuery} cell The cell on the board
     */
    clear: function ( cell ) {
        this.update( cell, 0 );
    },

    /**
     * Resets the board to a fresh state
     */
    reset: function() {
        // Hide number picker
        this.hideNumberPicker();

        // Clear board
        this.board.find( 'table.grid table.block td > p' ).text( '' );

        // Hide finish message
        this.board.find( '.finished-overlay' ).fadeOut();
    },

    /**
     * Prepares the view when a game is finished
     */
    finish: function() {
        this.board.find( '.finished-overlay' ).fadeIn();
    },

    /**
     * Shows the number picker at a specified cell
     *
     * @param  {jQuery} cell The cell where the number picker should originate
     */
    showNumberPicker: function ( cell, validNumbers ) {
        var _this = this;

        // If validNumbers is provided, disable invalid numbers
        if( validNumbers ) {
            var isValid;
            this.numberPicker.find( 'td' ).each( function() {
                isValid = validNumbers.betterIndexOf( parseInt( $( this ).text() ) ) !== -1;
                $( this ).toggleClass( 'disabled', !isValid );
            });
        }

        // Show number picker
        this.numberPicker.appendTo( cell ).fadeIn( 'fast' );

        // Hide number picker when clicked outside of it
        $( document ).on( 'click.numberPicker', ':not(.number-picker)', function ( event ) {
            // Prevent bubbling
            event.stopPropagation();

            _this.hideNumberPicker();
        });
    },

    /**
     * Hides the number picker
     */
    hideNumberPicker: function() {
        this.numberPicker.fadeOut( 'fast', function() {
            $( this ).detach();
        });

        // Stop listening to click events on document
        $( document ).off( 'click.numberPicker' );
    },

    /**
     * Calculates array position based given a cell from the DOM
     *
     * @param  {jQuery} cell Board cell from the DOM
     * @return {Object}      Corresponding array position of the cell
     */
    _calculateArrayPosition: function ( cell ) {
        var position = { r: 0, c: 0 };

        // Calculate array position
        position.r = cell.closest( 'tr' ).index() + (3 * cell.closest( '.block' ).closest( 'tr' ).index());
        position.c = cell.index() + (3 * cell.closest( '.block' ).closest( 'td' ).index());

        return position;
    }

});

// Expose the constructor to the global scope
window.SudokuView = SudokuView;

})( window );
