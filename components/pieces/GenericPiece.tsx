// Client Side Renderer
'use client'

// Imports
import styles from './style.module.scss';
import React, { createRef } from "react"
import { Piece } from "./Piece";

export default class GenericPiece extends React.Component implements Piece {
    ref = createRef();
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
    isDark: boolean;

    constructor( props:any, data:any ){
        super(props);

        // console.log('Piece: constructor:', data);
        this.id = data.id;
        this.team = data.team;
        this.type = data.type;
        this.state = {
            col: data.col,
            row: data.row,
            x: data.x,
            y: data.y,
        }

        this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

        switch (data.team){
            case 'd':
                this.isDark = true;
                break;
            case 'l':
            default: 
                this.isDark = false;
                break;
        }
    }

    updatePosition = ( x:number, y: number, row:any, col:any ) => {
        console.log('Piece: updatePosition:');
        this.state = ({
            col: col,
            row: row,
            x: x,
            y: y
        });
    };

    getAvailableMoves = ():string[] => {
        console.log('Piece: getAvailableMoves:');
        let resultTiles:string[] = [];
        return resultTiles;
    }

    /**
	 * @function Render
	 * @purpose render the component
	 */
    render(): React.ReactNode {
        const { label, key, col, row, size, children, ...rest } = this.props;
		const inlineStyle = {
			width: size,
			height: size,
			fontSize: size - 10 + 'px',
			top: this.state.y + 'px',
			left: this.state.x + 'px'
		};

		// TODO: Remove this once piece types start inheriting the base piece
		let pieceText = '';
        switch (this.type) {
            case 'rook':
                pieceText = this.isDark ? '\u265C' : '\u2656';
                break;
            case 'bishop':
                pieceText = this.isDark ? '\u265D' : '\u2657';
                break;
            default:
                pieceText = this.isDark ? '\u265F' : '\u2659';
        }
		
        const classColour = this.isDark ? 'dark' : 'light';
		const classType = this.type;
        const classes = [styles.piece, styles[classColour], styles[classType]].join(' ');

		return (
			<div id={label} key={key} className={classes} style={inlineStyle} {...rest} >
				<div className="inner">
					<span>{ pieceText }</span>
				</div>
			</div>
		);
    };
}