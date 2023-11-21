import { Piece } from '../Piece';
import { Square } from '../Square';

export class Knight extends Piece {
  override value = 3;
  override name = 'knight';

  constructor(suit: string) {
    super(suit);
  }

  public override possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    this.calculateMoves(board, x, y, -2, -1, possibleMoves);
    this.calculateMoves(board, x, y, -2, 1, possibleMoves);
    this.calculateMoves(board, x, y, 2, -1, possibleMoves);
    this.calculateMoves(board, x, y, 2, 1, possibleMoves);
    this.calculateMoves(board, x, y, 1, -2, possibleMoves);
    this.calculateMoves(board, x, y, -1, -2, possibleMoves);
    this.calculateMoves(board, x, y, 1, 2, possibleMoves);
    this.calculateMoves(board, x, y, -1, 2, possibleMoves);

    return possibleMoves;
  }

  override calculateMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number,
    dx: number,
    dy: number,
    possibleMoves: Square[]
  ): Square[] {
    let newX = x + dx;
    let newY = y + dy;

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const possibleSquare = board[newX][newY];
      if (this.squareIsFreeOrKing(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      } else if (this.squareIsHostile(possibleSquare)) {
        possibleMoves.push(possibleSquare);
      }
    }

    return possibleMoves;
  }
}
