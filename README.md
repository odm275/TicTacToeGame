# TicTacToeGame
**-Description**: Interactive TicTacToe game that allows you to pick between playing with a friend or against a computer.

**-Menu**:
  The menu was handled using the graphics library p5.js. It is much more straight forward than HTML canvas, has an extensive amount of tutorials on Youtube which make it extremely accessible, and allows for on the fly interactive graphics. For more information and documentation check (https://p5js.org/).

**-Single Player Mode**:
  The goal when creating the computer player was that it would never lose. TicTacToe being a simple game with complete information gave me a strong hint that this was possible.  The computer's moves are computed using the minmax algorithm. The minmax algorithm is called every time it is the computer turn in order to think ahead of the current board, grade the possible outcomes, and pick the situations that will increase the terminal boards where the computer wins or tie at worst. Hence, if the human player plays perfectly, there will always be a tie; otherwise, the computer will win.
For more information on the minmax algorithm (https://en.wikipedia.org/wiki/Minimax) or check the comments in the sketch.js file.

