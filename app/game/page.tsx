// Client Side Renderer
'use client'

// Imports
import styles from './page.module.scss';
import React, { Ref } from "react"

// Data
import GameData, { PieceData, TileData } from "@/data/data";
import Tile from "@/components/tiles/Tile";
import Piece from "@/components/pieces/Piece";
import Rook from '@/components/pieces/Rook';
import Bishop from '@/components/pieces/Bishop';

export default class Game extends React.Component {
    boardSize: number = 550;
    gridSize: number = (this.boardSize - 20)/8;
    tiles: Tile[] = [];
    pieces: Piece[] = [];
    state: {
        tileData: TileData[],
        piecesData: Piece[]
    };
    board: any;
    tileContainer: any;

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
                label: 'tile-' + data.id,
                size: this.gridSize,
            }
            // Create an return a new Tile
            return new Tile(props, data);
        });

        return tiles;
    };

    generatePieces = () => {
        console.log('Game: generatePieces');
        let pieces = [];

        pieces = this.state.piecesData.map((data) => {
            let piece:any = null;
            switch (data.type) {
                case 'rook':
                    piece = new Rook( data );
                    break;
                case 'bishop':
                    piece = new Bishop( data );
                    break;
                default:
                    piece = new Piece( data );
            }
            return piece;
        });

        return pieces;
    };

    /**
     * @function render
     * @purpose render the game screen
     */
    render () {
        this.tiles = this.generateTiles();
        // this.pieces = this.generatePieces();
        const tileNodes = this.tiles.map((tile) => { return tile.render(); });
        const boardStyle = {
			width: this.boardSize + 50 + 'px'
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
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}