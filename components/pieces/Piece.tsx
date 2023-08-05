import React from "react"

export interface Piece {
    id: number;
    team: '';
    type: string;
    state: {
        col: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
        row: '1' |  '2' | '3' | '4' | '5' | '6' | '7' | '8';
        x: number;
        y: number;
    };
    columns: ['a','b', 'c', 'd', 'e', 'f', 'g', 'h'];
    rows: ['1', '2', '3', '4', '5', '6', '7', '8'];

    updatePosition( x:number, y: number, row:any, col:any ): void;

    getAvailableMoves():string[];

    render(): React.ReactNode;
}