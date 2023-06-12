// Client Side Renderer
'use client'

// Imports
import React from "react"

// Data
import GameData from "../../data/data.js"

export default class Game extends React.Component {
    constructor (props:any) {
        console.log('Game: Constructor');
        super(props);
    }
    
    render () {
        return `
            <p>Hello</p>
        `
    }
}