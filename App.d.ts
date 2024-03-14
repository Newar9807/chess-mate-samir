declare module "chess.js" {
  export type Board = (Piece | null)[][];
  interface Piece {
    type: "q" | "r" | "n" | "b" | "k" | "p";
    color: "b" | "w";
  }

  type Col = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
  type Row = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  export type Position = `${Col}${Row}`;

  interface Move {
    color: "w" | "b";
    from: Position;
    to: Position;
  }
  
  interface ExtendedChess {
    isCheckmate(): boolean;
    isDraw(): boolean;
    undo(): void;
    turn(): "w" | "b";
    history(options: { verbose: true }): Move[];
  }
  
  export class Chess implements ExtendedChess {
    // ... (previous methods)
    moves(options: { verbose: true }): Move[];
    move(move: { from: string; to: string; promotion?: "q" | "r" | "n" | "b" }): Move | null;
    board(): Board;

    isCheckmate(): boolean {
      const moves = this.moves({ verbose: true });
      return moves.length === 0;
    }

    isDraw(): boolean {
      const moves = this.moves({ verbose: true });
      return moves.length === 0 && !this.isCheckmate();
    }

    undo(): void {
      const history = this.history({ verbose: true });
      if (history.length > 0) {
        this.load(history.slice(0, -1));
      }
    }

    turn(): "w" | "b" {
      return this.history({ verbose: true }).length % 2 === 0 ? "w" : "b";
    }

    history(options: { verbose: true }): Move[] {
      return super.history(options);
    }
  }
}
