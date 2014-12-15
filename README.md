[Sudoku](http://94e1561.5minfork.com/)
======

The classic puzzle game in a modern, mobile-first version.

## Structure

The app uses two main objects to provide the game functionality: `Sudoku` (the "model") and
`SudokuView` (the "view"). The `Sudoku` object generates a board, maintains the state of the
board, and handles checking the valid moves and whether the game is finished. The `SudokuView`
object renders the board to the screen, handles the UI interactions and events, and shows a
message when the user finishes the game.

With regard to design, all the CSS is in `main.css`. It uses media queries to provide a responsive,
mobile-first layout. The CSS resets are all in `normalize.css`, which are part of the HTML5 Boilerplate
package.


## Technologies

- HTML5 (Boilerplate, for quick setup)
- JavaScript (and jQuery)
- CSS3 (animations, media queries, and such)
- `@font-face` using Google Web Fonts (to keep the UI consistent)

## Browser Support

- Firefox 4+
- Chrome 26+
- IE10+

## Tradeoffs / Technical Choices

- The game only uses one board (hard-coded), which I primarily did in the interest of saving time
and getting gameplay working first.
- There is no "real" controller in the app. In essence, this is an app based on the MV paradigm
instead of MVC. This was also done in the interest of saving time. As a result, the view calls
event handlers directly on the model instead of triggering events which are handled by a controller.
- The app does not use Sass, as I was having trouble setting it up (on Windows, unfortunately). I used native CSS in
the interest of saving time.
- I extend the native `Array` object to provide a function called `betterIndexOf` which has
[significantly better performance](http://jsperf.com/thor-indexof-vs-for/5) than the native `Array.indexOf`.
- I extend the `prototype`s of objects by using the `jQuery.extend` function which allows for a clean, simple
way to do so.
- The app optimizes for mobile by only checking whether the board is solved when the number of filled cells
equals the total number of cells in the board. This makes the process more efficient, and minimizes the UI
thread from being blocked every time a move is made which provides a more responsive UI, especially on mobile.
- All animations are CSS3-based. This offloads work from the CPU to the GPU,
[creates fewer browser paint events](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/),
and takes advantage of hardware acceleration, resulting in a faster, more responsive UI.

## Future Improvements

- Allow clearing cells on mobile by tap-and-hold, for example.
- Add game features, such as board difficulty, timer, notes (visual hints on which numbers are possible in each cell), etc.
- Implement a real controller to make it truly MVC, and use a `Event` object to create a true Observer pattern.
- Get [Sass](http://sass-lang.com/)y!
- Use Local Storage / Web Storage to persistently maintain the state of the game if the browser gets accidentally
refreshed, for example.
- Use [DLX](http://en.wikipedia.org/wiki/Dancing_Links) to generate/solve new boards.
- Use icon fonts to replace the text-based game controls for a better UI.
- Get inspired and use more dashes of color than the boring 50 shades of grey.
- Use more animations for when a board is rendered, numbers are added/removed, etc.
