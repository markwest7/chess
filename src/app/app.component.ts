import { Component } from '@angular/core';
import { Piece } from './models/Piece';
import { King } from './models/Pieces/King';
import { Rook } from './models/Pieces/Rook';
import { Square } from './models/Square';
import { cloneDeep } from 'lodash';
import { Bishop } from './models/Pieces/Bishop';
import { Queen } from './models/Pieces/Queen';
import { Knight } from './models/Pieces/Knight';
import { Pawn } from './models/Pieces/Pawn';
import { Board } from './models/Board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chess';
  board: Board;
  selectedSquare: Square | null = null;
  currentPlayer = -1;
  suits: string[] = [];

  constructor() {
    this.board = new Board();
    // console.log(this.board);
    this.suits = ['white', 'black'];
    this.currentPlayer = 0;
  }

  gameLoop() {
    //Wait for player input
    //---Are there any checks?
    //---|---Checkmate?
    //---|---|--> Ask to restart game
    //---|---|---|--> Restart game
    //Computer move
    //---Are there any checks?
    //---|---Checkmate?
    //---|---|--> Ask to restart game
    //---|---|---|--> Restart game
    //Restart game
  }

  clickSquare(square: Square) {
    if (this.currentPlayer === 0) {
      if (square.isMarked()) {
        this.movePiece(this.selectedSquare!, square);
      } else if (square.getPiece() === null) {
        this.board.getBoard().forEach((x) => x.forEach((y) => y.unmark()));
      } else if (
        square.getPiece()!.getSuit() !== this.suits[this.currentPlayer]
      ) {
        //clicked opponents piece
        //TODO
      } else {
        this.board.getBoard().forEach((x) => x.forEach((y) => y.unmark()));
        this.selectedSquare = square;
        this.possibleMoves(square);
      }
    }
  }

  movePiece(
    fromSquare: Square,
    toSquare: Square,
    board: Array<Array<Square>> = this.board.getBoard(),
    testMove: Boolean = false
  ) {
    toSquare.setPiece(fromSquare.getPiece());
    fromSquare.setPiece(null);
    board.forEach((x) => x.forEach((square) => square.unmark()));

    const piece = toSquare.getPiece();
    const coordinates = this.findCoordinates(toSquare, board);
    const fromCoordinates = this.findCoordinates(fromSquare, board);
    if (piece instanceof Pawn) {
      if (piece.isQueening(coordinates[1])) {
        board[coordinates[0]][coordinates[1]].setPiece(
          new Queen(piece.getSuit())
        );
      }
    } else if (piece instanceof King) {
      piece.move();
      if (coordinates[0] - fromCoordinates[0] > 1) {
        this.movePiece(
          board[7][coordinates[1]],
          board[5][coordinates[1]],
          board,
          testMove
        );
      } else if (fromCoordinates[0] - coordinates[0] > 1) {
        this.movePiece(
          board[0][coordinates[1]],
          board[3][coordinates[1]],
          board,
          testMove
        );
      }
    }

    // console.log(board[0][0]);
    if (!testMove) this.nextPlayer();
    return board;
  }

  isCheck(
    board: Array<Array<Square>> = this.board.getBoard(),
    player: number = this.currentPlayer
  ) {
    let kingSquare: Square;
    const suit = this.suits[player];

    board.forEach((row) => {
      const kingSquareInRow = row.find((square) => {
        const piece = square.getPiece();
        return piece && piece.getName() === 'king' && piece.getSuit() === suit;
      });

      if (kingSquareInRow) {
        kingSquare = kingSquareInRow;
      }
    });

    if (this.threatenedSquares(player, board).includes(kingSquare!)) {
      // console.log('CHECK');
      return true;
    } else {
      // console.log('not check');
      return false;
    }
  }

  findCoordinates(
    square: Square,
    board: Array<Array<Square>> = this.board.getBoard()
  ) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === square) {
          return [i, j];
        }
      }
    }

    return [0, 0];
  }

  possibleMoves(
    square: Square,
    board: Array<Array<Square>> = this.board.getBoard(),
    player: number = this.currentPlayer
  ) {
    let possibleMoves: Array<Square> = [];
    const coordinates = this.findCoordinates(square, board);
    const x = coordinates[0];
    const y = coordinates[1];

    possibleMoves = square.getPiece()!.possibleMoves(board, x, y);

    if (square.getPiece()?.getSuit() === this.suits[player]) {
      if (square.getPiece()?.getName() === 'king') {
        const threats = this.threatenedSquares(player, board);
        possibleMoves = possibleMoves.filter((x) => {
          return !threats.includes(x);
        });
        console.log(possibleMoves);
      }

      const legalmoves = possibleMoves.filter((toSquare) => {
        let boardAfterMove = cloneDeep(board);

        const moveCoordinates = this.findCoordinates(toSquare, board);
        this.movePiece(
          boardAfterMove[x][y],
          boardAfterMove[moveCoordinates[0]][moveCoordinates[1]],
          boardAfterMove,
          true
        );

        return !this.isCheck(boardAfterMove);
      });

      possibleMoves = legalmoves;

      possibleMoves.forEach((x) => x.mark());
    }

    return possibleMoves;
  }

  threatenedSquares(
    player: number,
    board: Array<Array<Square>> = this.board.getBoard()
  ) {
    let threats: Square[] = [];
    let pieces: Square[] = [];
    player = player === 1 ? 0 : 1;
    // console.log(player);

    board.forEach((x) =>
      x.forEach((square) => {
        if (square.getPiece()?.getSuit() === this.suits[player]) {
          pieces.push(square);
          // console.log(square);
        }
      })
    );

    pieces.forEach((x) => {
      // const squares = this.possibleMoves(x);
      const squares = x
        .getPiece()
        ?.threatenedSquares(
          board,
          this.findCoordinates(x, board)[0],
          this.findCoordinates(x, board)[1]
        );
      if (squares) {
        squares.forEach((y) => {
          threats.push(y);
        });
      }
    });

    return threats;
  }

  nextPlayer() {
    this.isCheck();
    if (this.currentPlayer === 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer = 1;
      this.computerMove();
    }
  }

  findAllMoves(
    board: Array<Array<Square>> = this.board.getBoard(),
    player: number
  ) {
    let pieces: Square[] = [];

    board.forEach((x) =>
      x.forEach((square) => {
        if (square.getPiece()?.getSuit() === this.suits[player]) {
          pieces.push(square);
        }
      })
    );

    let piecesMove: Array<[Square, Array<Square>]> = [];

    pieces.forEach((piece) => {
      const legalMoves = this.possibleMoves(piece, board, player);
      // console.log(piece.getPiece());
      // console.log(legalMoves);
      if (legalMoves.length > 0) {
        piecesMove.push([piece, legalMoves]);
      }
    });

    return piecesMove;
  }

  computerMove() {
    let piecesMove = this.findAllMoves(
      this.board.getBoard(),
      this.currentPlayer
    );

    console.log(piecesMove);

    if (piecesMove.length > 0) {
      // const cpuMove = this.computerRandomMove(piecesMove);
      const cpuMove = this.computerFindTactics(piecesMove);
      this.movePiece(cpuMove[0], cpuMove[1]);
    } else if (this.isCheck()) {
      console.log('checkmate');
    } else {
      console.log('stalemate');
    }
  }

  computerFindTactics(
    possibleMoves: Array<[Square, Array<Square>]>,
    moveCount: number = 1
  ) {
    const suit = possibleMoves[0][0].getPiece()?.getSuit();
    const currentBoardValue = this.calculateBoardValue(
      this.currentPlayer,
      this.board.getBoard()
    );
    let lowestValuedMove = currentBoardValue;
    let choosenPiece = possibleMoves[0][0];
    let choosenMove = possibleMoves[0][1][0];
    let opponent = this.currentPlayer === 1 ? 0 : 1;
    let board = cloneDeep(this.board);

    for (let i = 0; i < moveCount; i++) {
      const candidate = this.findBestMove(this.currentPlayer, possibleMoves); //behöver board skickas med?
      lowestValuedMove = candidate[0];
      choosenPiece = candidate[1][0];
      choosenMove = candidate[1][1];

      if (lowestValuedMove === -1) {
        break;
      }

      let boardAfterMove = cloneDeep(board);
      const fromCoordinates = this.findCoordinates(
        choosenPiece,
        board.getBoard()
      );
      const moveCoordinates = this.findCoordinates(
        choosenMove,
        board.getBoard()
      );
      console.log(boardAfterMove.getBoard()[0][0]); //ROOK
      console.log(moveCoordinates);
      this.movePiece(
        boardAfterMove.getBoard()[fromCoordinates[0]][fromCoordinates[1]],
        boardAfterMove.getBoard()[moveCoordinates[0]][moveCoordinates[1]],
        boardAfterMove.getBoard(),
        true
      ); //still rook at the end of this method. makes no sense
      console.log(boardAfterMove.getBoard()[0][0]); //No rook on a8??
      console.log(board.getBoard()[0][0]); //rook
      let opponentsMoves = this.findAllMoves(
        boardAfterMove.getBoard(),
        opponent
      );
      if (opponentsMoves.length > 0) {
        const cpuMove = this.findBestMove(
          opponent,
          opponentsMoves,
          boardAfterMove.getBoard()
        );
      } else if (this.isCheck()) {
        console.log('checkmate');
      } else {
        console.log('stalemate');
      }
    }

    return [choosenPiece, choosenMove];
  }

  findBestMove(
    player: number,
    possibleMoves: Array<[Square, Array<Square>]>,
    board: Array<Array<Square>> = this.board.getBoard()
  ): [number, [Square, Square]] {
    const suit = possibleMoves[0][0].getPiece()?.getSuit();
    const currentBoardValue = this.calculateBoardValue(
      player,
      this.board.getBoard()
    );
    let lowestValuedMove = currentBoardValue; //Value of opponents pieces
    let choosenPiece = possibleMoves[0][0];
    let choosenMove = possibleMoves[0][1][0];
    // const opponent = this.currentPlayer === 1 ? 0 : 1;

    for (let i = 0; i < possibleMoves.length; i++) {
      for (let j = 0; j < possibleMoves[i][1].length; j++) {
        let boardAfterMove = cloneDeep(board);
        const fromCoordinates = this.findCoordinates(
          possibleMoves[i][0],
          board
        );
        const moveCoordinates = this.findCoordinates(
          possibleMoves[i][1][j],
          board
        );
        this.movePiece(
          boardAfterMove[fromCoordinates[0]][fromCoordinates[1]],
          boardAfterMove[moveCoordinates[0]][moveCoordinates[1]],
          boardAfterMove,
          true
        );

        let boardValue = this.calculateBoardValue(player, boardAfterMove);
        if (boardValue < lowestValuedMove) {
          lowestValuedMove = boardValue;
          choosenPiece = possibleMoves[i][0];
          choosenMove = possibleMoves[i][1][j];
        }
      }
    }

    let returnMoves: [Square, Square] = [choosenPiece, choosenMove];

    if (lowestValuedMove === currentBoardValue) {
      returnMoves = this.computerRandomMove(possibleMoves);
    }

    console.log(lowestValuedMove);
    console.log(returnMoves);

    return [lowestValuedMove, returnMoves];
  }

  calculateBoardValue(
    player: number,
    board: Array<Array<Square>> = this.board.getBoard()
  ) {
    let boardValue = 0;

    const opponent = player === 1 ? 0 : 1;

    if (this.isCheck(board, opponent)) {
      console.log('check indeed', this.findAllMoves(board, opponent));
      if (this.findAllMoves(board, opponent).length < 1) {
        return -1;
      }
    }

    board.forEach((row) =>
      row.forEach((square) => {
        const piece = square.getPiece();
        if (piece) {
          if (piece.getSuit() !== this.suits[player]) {
            boardValue += piece.getValue();
          }
        }
      })
    );
    return boardValue;
  }

  computerRandomMove(possibleMoves: Array<[Square, Array<Square>]>) {
    const pieceToMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    const choosenMove =
      pieceToMove[1][Math.floor(Math.random() * pieceToMove[1].length)];

    const choosenPiece = pieceToMove[0];

    let returnMoves: [Square, Square] = [choosenPiece, choosenMove];

    return returnMoves;
  }
}
