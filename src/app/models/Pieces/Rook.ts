import { Piece } from '../Piece';
import { Square } from '../Square';

export class Rook extends Piece {
  override value = 5;
  override moves = [
    [-1, 0],
    [-2, 0],
    [-3, 0],
    [-4, 0],
    [-5, 0],
    [-6, 0],
    [-7, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, -1],
    [0, -2],
    [0, -3],
    [0, -4],
    [0, -5],
    [0, -6],
    [0, -7],
  ];
  override name = 'rook';

  constructor(suit: string) {
    super(suit);
  }

  public override possibleMoves(
    board: Array<Array<Square>>,
    x: number,
    y: number
  ): Square[] {
    let possibleMoves: Square[] = [];

    this.calculateMoves(board, x, y, 1, 0, possibleMoves);
    this.calculateMoves(board, x, y, -1, 0, possibleMoves);
    this.calculateMoves(board, x, y, 0, 1, possibleMoves);
    this.calculateMoves(board, x, y, 0, -1, possibleMoves);

    return possibleMoves;
  }
}
