import { Piece } from '../Piece';
import { Square } from '../Square';

export class Bishop extends Piece {
  override value = 3;
  override name = 'bishop';

  constructor(suit: string) {
    super(suit);
  }

  public override possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    this.calculateMoves(board, x, y, 1, 1, possibleMoves);
    this.calculateMoves(board, x, y, -1, 1, possibleMoves);
    this.calculateMoves(board, x, y, 1, -1, possibleMoves);
    this.calculateMoves(board, x, y, -1, -1, possibleMoves);

    return possibleMoves;
  }
}
