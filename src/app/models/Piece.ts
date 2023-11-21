import { Square } from './Square';

export class Piece {
  moves = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];
  name = '';
  suit = '';
  value = 1;

  constructor(suit: string) {
    this.suit = suit;
  }

  public getMoves() {
    return this.moves;
  }

  public getType() {
    return this.suit + '-' + this.name;
  }

  public getName() {
    return this.name;
  }

  public getSuit() {
    return this.suit;
  }

  public threatenedSquares(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    return this.possibleMoves(board, x, y);
  }

  public possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];
    return possibleMoves;
  }

  calculateMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number,
    dx: number,
    dy: number,
    possibleMoves: Square[]
  ): Square[] {
    let newX = x + dx;
    let newY = y + dy;

    while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const possibleSquare = board[newX][newY];

      if (this.squareIsFreeOrKing(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      } else if (this.squareIsHostile(possibleSquare)) {
        possibleMoves.push(possibleSquare);
        break;
      } else {
        break;
      }

      newX += dx;
      newY += dy;
    }

    return possibleMoves;
  }

  squareIsFreeOrKing(possibleSquare: Square) {
    if (
      possibleSquare.getPiece() === null ||
      (possibleSquare.getPiece()?.getName() === 'king' &&
        possibleSquare.getPiece()?.getSuit() !== this.getSuit())
    ) {
      return true;
    } else {
      return false;
    }
  }

  squareIsFree(possibleSquare: Square) {
    if (possibleSquare.getPiece() === null) {
      return true;
    } else {
      return false;
    }
  }

  squareIsHostile(possibleSquare: Square) {
    if (
      possibleSquare.getPiece()?.getSuit() !== this.getSuit() &&
      possibleSquare.getPiece() !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  getValue() {
    return this.value;
  }
}
