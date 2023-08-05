// Client Side Renderer
'use client'

// Imports
import styles from './page.module.scss';
import React, { Ref, createRef } from "react"

// Data
import GameData, { PieceData, TileData } from "@/data/data";
import Tile from "@/components/tiles/Tile";
import Rook from '@/components/pieces/Rook';
import Bishop from '@/components/pieces/Bishop';
import { Piece } from '@/components/pieces/Piece';
import GenericPiece from '@/components/pieces/GenericPiece';

export default class Game extends React.Component {
    boardSize: number = 550;
    gridSize: number = (this.boardSize)/8;
    tiles: Tile[] = [];
    pieces: Piece[] = [];
    state: {
        tileData: TileData[],
        piecesData: PieceData[]
    };
    board: any = React.createRef();
    tileContainer: any = React.createRef();
    pieceContainer: any = React.createRef();

    constructor (props:any) {
        console.log('Game: Constructor');
        super(props);

        this.state = {
            tileData: GameData.tiles,
            piecesData: GameData.pieces
        }
    }

    /**
     * @fucntion generateTiles
     * @purpose generate an array of Tile Classes based on the tileData and return it
     * 
     * @returns Tile[]
     */
    generateTiles = ():Tile[] => {
        console.log('Game: generateTiles');
        let tiles = [];

        // 1. Generate an array of Tile classes based on the tile data
        tiles = this.state.tileData.map((data) => {
            // Set the props
            let props = {
                key: data.id,
                label: `tile-${data.id}`,
                size: this.gridSize,
            }
            // Create an return a new Tile
            return new Tile(props, data);
        });

        return tiles;
    };

    /**
     * @function getTileRef
     * @purpose looks up a tile's reference key (ID) by column and row
     * 
     * @param col 
     * @param row 
     * 
     * @returns number|null
     */
    getTileRef = ( col: string, row: string ) => {
        let tileRef:number|null = null;

        let results = this.state.tileData.map((data) => {
            if ( data.col === col && data.row === row ){
                tileRef = data.id;
            }
        });

        return tileRef;
    };

    /**
	 * @function getTilePosition
	 * @purpose get the x, y, row and col info for a specific tile
	 *
	 * @param tileRef
	 * @returns {{col: *, x: number, y: number, row: number}}
	 */
	getTilePosition = ( tileRef:number ) => {
		let x, y, row, col;
		let targetTileNode = null;
		const tileClasses = this.tiles;

		// Loop through the tiles to find the one that matches and grab it's position info
		for(let i = 0; i < tileClasses.length; i++ ){
			if( tileClasses[i].props.key === tileRef ){
				// Set the destinationTileNode to the current class
				targetTileNode = this.tileContainer.current.children[i];

				// Get the position and row/col data
				x = targetTileNode.offsetLeft;
				y = targetTileNode.offsetTop;
				col = tileClasses[i].col;
				row = tileClasses[i].row;
			}
		}

		// Return an object containing the position info
		return { x, y, row, col };
	};

    /**
     * @function generatePieces
     * @purpose generate the pieceClasses required to play the game
     * 
     * @returns Pieces[]
     */
    generatePieces = () => {
        console.log('Game: generatePieces');
        let pieces = [];

        pieces = this.state.piecesData.map((data) => {
            let piece:any = null;
            let props = {
                key: data.id,
                label: `piece-${data.id}`,
                size: this.gridSize
            };
            switch (data.type) {
                case 'rook':
                    piece = new Rook( props, data );
                    break;
                case 'bishop':
                    piece = new Bishop( props, data );
                    break;
                default:
                    piece = new GenericPiece( props, data );
            }
            return piece;
        });

        return pieces;
    };

    /**
	 * @function componentDidMount
	 * @purpose run when the component is mounted and ready for use, after initial render
	 */
	componentDidMount() {
		console.log('Game: componentDidMount: ', this.getTileRef('c', '1'));

        // Update the piece data with the X and Y from the rendered tiles
        let piecesDataTemp = this.state.piecesData;
        this.state.piecesData.find((piece, index) => {
            const tileRef = this.getTileRef( piece.col, piece.row );
            const tilePosition = this.getTilePosition( tileRef );

            piece.x = tilePosition.x;
            piece.y = tilePosition.y;
            piece.col = tilePosition.col;
            piece.row = tilePosition.row;

            piecesDataTemp[index] = piece;
            
            return null;
        });
        this.setState({piecesData: piecesDataTemp});
    }

    /**
     * @function render
     * @purpose render the game screen
     */
    render () {
        this.tiles = this.generateTiles();
        this.pieces = this.generatePieces();
        const tileNodes = this.tiles.map((tile) => { return tile.render(); });
        const pieceNodes = this.pieces.map((piece) => { return piece.render(); })
        const boardStyle = {
			width: this.boardSize
		};

        return (
            <>
                <header className={styles.header}>
                    {/* <h1>Battle Chess</h1> */}
                </header>

                <div className={'game'}>
                    <main role={'main'} className={styles.main} style={{width: this.boardSize + 'px'}}>
                        <div className={styles['container-board']} style={boardStyle}>
                            <div className={styles['board player-1']} ref={this.board}>
                                <div className={styles['container']} ref={ this.tileContainer }>
                                    {tileNodes}
                                </div>
                                <div className={[styles.container, styles['container-pieces']].join(' ')} ref={ this.pieceContainer }>
								    {pieceNodes}
							    </div>
                            </div>
                        </div>
                    </main>
                </div>

                <code>
                    <pre></pre>
                </code>
            </>
        )
    }
}