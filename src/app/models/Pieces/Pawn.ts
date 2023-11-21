import { Piece } from '../Piece';
import { Square } from '../Square';

export class Pawn extends Piece {
  override name = 'pawn';
  direction: number;
  originY: number;
  queeningY;

  constructor(suit: string, direction: number = -1) {
    super(suit);
    this.direction = direction;
    if (direction === -1) {
      this.originY = 6;
      this.queeningY = 0;
    } else {
      this.originY = 1;
      this.queeningY = 7;
    }
  }

  public override threatenedSquares(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    this.possibleCaptures(board, x - 1, y + this.direction, possibleMoves);
    this.possibleCaptures(board, x + 1, y + this.direction, possibleMoves);

    return possibleMoves;
  }

  public override possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    let newY = y + this.direction;

    if (newY >= 0 && newY < 8) {
      const possibleSquare = board[x][newY];
      if (possibleSquare.getPiece() === null) {
        possibleMoves.push(possibleSquare);
      }
    }

    if (y === this.originY) {
      let newY = y + this.direction + this.direction;

      if (newY >= 0 && newY < 8) {
        const possibleSquare = board[x][newY];
        if (possibleSquare.getPiece() === null) {
          possibleMoves.push(possibleSquare);
        }
      }
    }

    let newX = x - 1;
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const possibleSquare = board[newX][newY];
      if (this.squareIsHostile(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      }
    }

    newX = x + 1;
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const possibleSquare = board[newX][newY];
      if (this.squareIsHostile(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      }
    }

    return possibleMoves;
  }

  possibleCaptures(
    board: Array<Array<Square>>,
    x: number,
    y: number,
    possibleMoves: Square[]
  ): Square[] {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      const possibleSquare = board[x][y];
      if (this.squareIsHostile(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      }
    }

    return possibleMoves;
  }

  isQueening(y: number) {
    if (y === this.queeningY) {
      return true;
    } else {
      return false;
    }
  }
}
