import React from 'react'

import Cell from './cell'

export default class Grid extends React.Component{

    state = {
        rowCount: this.props.rowCount,
        columnCount: this.props.columnCount,
        boardData: this.props.boardData
    }

    handleClick(i, j) {

        let updateData = this.state.boardData;
        updateData[j][i].isAlive = !this.state.boardData[j][i].isAlive;
        
        this.setState({
            boardData: updateData
        });
    }

    renderBoard(data){
        return data.map((boardRowData) => {
            return boardRowData.map((singleCell) => {
                return (
                    <div>
                        <Cell
                            onClick={ () => this.handleClick(singleCell.x, singleCell.y)}
                            value={singleCell}
                        />
                    {(boardRowData[boardRowData.length - 1] === singleCell) ? <div id="newLine" /> : ""}

                    </div>)
            })
        })
    }

    //interface methd - updates state from parent class
    componentWillReceiveProps(newProps){

        if (JSON.stringify(this.props) !== JSON.stringify(newProps)){
            this.setState({
                rowCount: newProps.rowCount,
                columnCount: newProps.columnCount,
                boardData: newProps.boardData
            });
        }
    }

    render(){
        return(            
            <div id="mainGrid">
                <div id="instructions">
                    <p>Click a cell to highlight active cells.</p>
                    <p>Once you are happy with the
                    pattern just hit Next Turn as often as you can.</p> 
                </div>
                    
                {this.renderBoard(this.state.boardData)}
            </div>
        )
    }
}