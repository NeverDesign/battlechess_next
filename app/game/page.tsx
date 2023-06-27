// Client Side Renderer
'use client'

// Imports
import React from "react"


// Data
import GameData, { TileData } from "@/data/data";
import Tile from "@/components/tiles/Tile";

export default class Game extends React.Component {
    boardSize: number = 500;
    gridSize: number = this.boardSize/8;
    tiles: Tile[] = [];
    state: {
        tileData: TileData[]
    }

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

        return (
            <p>Hello</p>
        )
    }
}