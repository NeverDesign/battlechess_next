// Client Side Renderer
'use client'

// Imports
import React from "react"

// Data
import GameData from "../../data/data.js"
import Tile from "@/components/tiles/Tile.js";

export default class Game extends React.Component {
    boardSize: number = 500;
    gridSize: number = this.boardSize/8;
    tiles: Tile[] = [];

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
        
    };
    
    render () {
        return (
            <p>Hello</p>
        )
    }
}