# Minesweeper

1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/minesweeper/README.md)
2. Screenshot:
<img width="1389" alt="Screenshot 2023-05-21 at 23 39 48" src="https://github.com/rolling-scopes-school/illia-sakharau-JSFE2023Q1/assets/124388500/532600d7-9e76-438b-9bbb-743b29062deb">

3. Deploy: [link](https://rolling-scopes-school.github.io/illia-sakharau-JSFE2023Q1/minesweeper/)
4. Done 21.05.2023 / deadline 23.05.2023
5. Score: 180 / 180
* Basic scope (40 / 40)
  - - [x] (10 / 10) layout, design, responsive UI
  - - [x]  (10 / 10)at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default
  - - [x]  (10 / 10)when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine
   - - [x] (10 / 10)the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game
* Advanced scope (80 / 80)
  - - [x] (20 / 20) mines are placed after the first move, so that user cannot lose on the first move
  - - [x] (10 / 10) user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags
  - - [x] (10 / 10) the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell
  - - [x] (10 / 10) the game can be restarted without reloading the page
  - - [x] (15 / 15) game duration and number of clicks are displayed
   - - [x] (15 / 15) when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers
* Hacker scope (60 / 60)
  - - [x]  (10 / 10) sound accompaniment (on/off) when clicking on cell and at the end of the game
  - - [x] (20 / 20) implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99)
  - - [x] (10 / 10) implemented saving the latest 10 results using LocalStorage
  - - [x] (10 / 10) implemented saving the state of the game
  - - [x] (10 / 10) option to choose different themes for the game board (dark/light themes)
 
