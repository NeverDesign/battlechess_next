// Client Side Renderer
'use client'

// Imports
import styles from './page.module.scss';
import React, { Ref } from "react"

// Data
import GameData, { TileData } from "@/data/data";
import Tile from "@/components/tiles/Tile";

export default class Game extends React.Component {
    boardSize: number = 550;
    gridSize: number = (this.boardSize - 20)/8;
    tiles: Tile[] = [];
    state: {
        tileData: TileData[]
    };
    board: any;
    tileContainer: any;


    constructor (props:any) {
        console.log('Game: Constructor');
        super(props);

        this.state = {
            tileData: GameData.tiles
        }
    }

    generateTiles = () => {
        console.log('Game: Constructor');
        let tiles = [];

        // 1. Generate an array of tile classes based on the tile data
        tiles = this.state.tileData.map((data) => {
            let props = {
                key: data.id,
                label: 'tile-' + data.id,
                size: this.gridSize,
            }
            return new Tile(props, data);
        });

        return tiles;
    };
    
    render () {
        this.tiles = this.generateTiles();
        const tileNodes = this.tiles.map((tile) => { return tile.render(); });
        const boardStyle = {
			width: this.boardSize + 50 + 'px'
		};

        return (
            <>
                <header className={styles.header}>
                    <h1>Battle Chess</h1>
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