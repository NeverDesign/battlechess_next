// Client Side Renderer
'use client'

// Imports
import styles from './style.module.scss';
import { TileData } from "@/data/data";
import React, { Component, createRef } from "react"

// Types
type tileProps =  { 
    label: string, 
    key: number, 
    col: TileData["col"], 
    row: TileData["row"], 
    children: any, 
    handleclick: any,
    size: number
};

type tileState = {
    active: boolean,
    occupied: boolean,
    occupant: any,
    isInteractive: boolean
};

export default class Tile extends Component<tileProps, tileState> {
    ref = createRef();
    isDark: boolean = false;
    id: number;
    col: string;
    row: string;

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
    };

    /**
	 * @function onClick
	 * @purpose function that handles the click event for a tile and the callback passed in from the parent
	 */
	onClick = () => {
		const { handleclick } = this.props;

		if ( handleclick ){
			handleclick( this );
		} 
	};

    /**
	 * @function Render
	 * @purpose render the component
	 */
    render(): React.ReactNode {
        const classColour = this.isDark ? "dark" : "light";
		const classActive = this.state.active ? "active" : "inactive";
		const classHover = '';
		const size = this.props.size;
		const inlineStyle = {
			tileSize: {
				width: size,
				height: size
			}
		};
        const classes = [styles.tile, styles[classColour], styles[classActive], classHover].join(' ');
        const { label, key, col, row, children, handleclick, ...rest } = this.props;
		

		return (
			<div id={label} key={key} 
                // className={`${styles[classColour]}`}
                className={classes}
                style={inlineStyle.tileSize} 
                onClick={this.onClick} 
                {...rest}
            >
				<div className={styles.inner}>
					<span>{label}</span>
					{children}
				</div>
			</div>
		);
    };
}