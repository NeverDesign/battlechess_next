// Client Side Renderer
'use client'

// Imports
import styles from './style.module.scss';
import React, { Component, createRef } from "react"

// Types
type alertProps =  {
    label: string,
    key: string,
    status: string, 
    type: string, 
    message: string, 
};

export default class Alert extends Component<alertProps> {
    ref = createRef();

    constructor ( props: alertProps ){
        super(props);
    }

    render(): React.ReactNode {
        const { label, key, status, type, message, ...rest } = this.props;

		return (
			<div id={label} key={key} className={'alert state-' + status + ' type-' + type} {...rest} >
				<div className="inner">
					<span>{ message }</span>
				</div>
			</div>
		);
    }
}