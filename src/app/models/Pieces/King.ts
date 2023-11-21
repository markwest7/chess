import { Piece } from '../Piece';
import { Square } from '../Square';

export class King extends Piece {
  override moves = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];
  override name = 'king';
  hasMoved = false;

  constructor(suit: string) {
    super(suit);
  }

  public override possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    this.moves.forEach((move) => {
      if (
        x + move[0] > -1 &&
        x + move[0] < 8 &&
        y + move[1] > -1 &&
        y + move[1] < 8
      ) {
        let possibleSquare = board[x + move[0]][y + move[1]];
        if (
          possibleSquare.getPiece() === null ||
          possibleSquare.getPiece()?.getSuit() !== this.suit
        ) {
          possibleMoves.push(possibleSquare);
        }
      }
    });

    if (!this.hasMoved) {
      let possibleSquare = board[x + 2][y];
      // this.castling(board, x + 2, y);
      if (
        this.squareIsFree(board[x + 1][y]) &&
        this.squareIsFree(board[x + 2][y])
      ) {
        possibleMoves.push(possibleSquare);
      }
      possibleSquare = board[x - 2][y];
      if (
        this.squareIsFree(board[x - 1][y]) &&
        this.squareIsFree(board[x - 2][y]) &&
        this.squareIsFree(board[x - 3][y])
      ) {
        possibleMoves.push(possibleSquare);
      }
    }

    return possibleMoves;
  }

  move() {
    this.hasMoved = true;
  }

  // castling(board: Array<Array<Square>>, x: number, y: number) {
  //   if (x === 6) {
  //     this.hasMoved = true;
  //   }
  // }
}
