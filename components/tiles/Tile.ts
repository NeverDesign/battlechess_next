// Client Side Renderer
'use client'

import { TileData } from "@/data/data";
// Imports
import React from "react"

export default class Tile extends React.Component {
    isDark: boolean = false;
    id: number;
    col: string;
    row: string;
    state: {
        active: boolean,
        occupied: boolean,
        occupant: any,
        isInteractive: boolean
    }

    constructor( props:any, data:TileData ){
        super(props);

        // console.log('Tile: constructor:', data);
        this.id = data.id;
        this.col = data.col;
        this.row = data.row;
        this.state = {
            active: false,
            occupied: data.occupied,
            occupant: data.occupant,
            isInteractive: false
        }
        this.isDark = data.isDark;
    }

    /**
	 * @function Render
	 * @purpose render the component
	 */
	render() {
		const classColour = this.isDark ? 'dark ' : 'light ';
		const classActive = this.state.active ? 'active ' : '';
		const hoverClass = '';

		const size = this.props.size;
		const style = {
			tileSize: {
				width: size,
				height: size
			}
		};

		const { label, key, col, row, children, handleclick, ...rest } = this.props;

		return (
			<div id={label} key={key} row={row} col={col} className={'tile ' + classColour + classActive} style={style.tileSize} onClick={this.onClick} {...rest}>
				<div className="inner">
					<span>{label}</span>
					{children}
				</div>
			</div>
		);
	}
}