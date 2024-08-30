import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        let val = Math.random() < chanceLightStartsOn ? true : false;
        row.push(val);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // check every row
    let check = board.every(row => {
      return row.every(item => item === true) ? true : false;
    });
    return check;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = [];
      oldBoard.forEach(element => {
        let newRow = [];
        element.forEach(item => {
          newRow.push(item);
        })
        newBoard.push(newRow);
      })

      // TODO: in the copy, flip this cell and the cells around it
      // flip clicked cell
      flipCell(y, x, newBoard);
      // flip cell above
      flipCell(y - 1, x, newBoard);
      // flip cell below
      flipCell(y + 1, x, newBoard);
      //flip cell left
      flipCell(y, x - 1, newBoard);
      //flip cell right
      flipCell(y, x + 1, newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return (
      <h3>
        You Win!!! Congrats!!!
      </h3>
    )
  }
  else {
    // make table board
    return (
      <table className="Board" data-testid="Board">
        <tbody>
          {board.map((row, rInd) => {
            return (
              <tr key={`${rInd}`}>{row.map((col, cInd) => {
                let coords = `${rInd}-${cInd}`;
                return (
                  <Cell isLit={col} flipCellsAroundMe={() => flipCellsAround(coords)} key={coords} testid={coords} />
                )
              })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Board;

Board.defaultProps = {
  nrows: 3,
  ncols: 3,
  chanceLightStartsOn: 0.3
}
