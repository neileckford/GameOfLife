import React from 'react'

export default class Cell extends React.Component{

    render(){
        let cellStatus = (this.props.value.isAlive ? "cellAlive" : "cellDead")

        return (
            <div className="cell" id={cellStatus} onClick={this.props.onClick}>

            </div>
        );
    }
}