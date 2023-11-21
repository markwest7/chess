import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';
import { Square } from './Square';

export class Board {
  board: Array<Array<Square>> = [];

  constructor() {
    this.newBoard();
    this.setupPieces();
  }

  newBoard() {
    let color;
    const notationChars = 'abcdefgh';

    for (let x = 0; x < 8; x++) {
      this.board.push([]);
      color = color === 'black' ? 'white' : 'black';
      for (let y = 0; y < 8; y++) {
        color = color === 'black' ? 'white' : 'black';
        this.board[x][y] = new Square(notationChars[x] + (8 - y), color, null);
      }
    }
  }

  setupPieces() {
    const player1 = 'white';
    const player2 = 'black';

    for (let i = 0; i < 8; i++) {
      this.board[i][6].setPiece(new Pawn(player1, -1));
      this.board[i][1].setPiece(new Pawn(player2, 1));
    }

    this.board[0][7].setPiece(new Rook(player1));
    this.board[1][7].setPiece(new Knight(player1));
    this.board[2][7].setPiece(new Bishop(player1));
    this.board[3][7].setPiece(new Queen(player1));
    this.board[4][7].setPiece(new King(player1));
    this.board[5][7].setPiece(new Bishop(player1));
    this.board[6][7].setPiece(new Knight(player1));
    this.board[7][7].setPiece(new Rook(player1));

    this.board[0][0].setPiece(new Rook(player2));
    this.board[1][0].setPiece(new Knight(player2));
    this.board[2][0].setPiece(new Bishop(player2));
    this.board[3][0].setPiece(new Queen(player2));
    this.board[4][0].setPiece(new King(player2));
    this.board[5][0].setPiece(new Bishop(player2));
    this.board[6][0].setPiece(new Knight(player2));
    this.board[7][0].setPiece(new Rook(player2));

    // this.board[4][7].setPiece(new King(player1));
    // this.board[4][0].setPiece(new King(player2));
    // this.board[7][6].setPiece(new Rook(player2));
    // this.board[0][5].setPiece(new Rook(player2));
  }

  getBoard() {
    return this.board;
  }
}
