import { Piece } from './Piece';

export class Square {
  private notation: string;
  private color: string;
  private piece: Piece | null;
  private marked: boolean = false;
  private free: boolean;

  constructor(notation: string, color: string, piece: Piece | null) {
    this.notation = notation;
    this.color = color;
    this.piece = piece;
    this.free = piece === null ? true : false;
  }

  public getNotation() {
    return this.notation;
  }

  public getColor() {
    return this.color;
  }

  public isFree() {
    return this.free;
  }

  public mark() {
    this.marked = true;
  }

  public unmark() {
    this.marked = false;
  }

  public isMarked() {
    return this.marked;
  }

  public getPiece() {
    return this.piece;
  }

  public setPiece(piece: Piece | null) {
    this.piece = piece;
    this.free = piece === null ? true : false;
  }
}
