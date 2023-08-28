// Client Side Renderer
'use client'

// Imports
import styles from './style.module.scss';
import React from "react"

// Types
type alertProps =  { 
    status: string, 
    type: string, 
    message: string, 
};

export default class Alert extends React.Component<alertProps> {

}