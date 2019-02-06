import React from 'react';
import ReactDOM from 'react-dom';

import Grid from './grid'
import './index.css';

class Game extends React.Component{

    state = {
        rowCount: 10,
        columnCount: 10,
        boardData: this.initBoardData(10, 10),
        history: []
    }

    initialiseGame = () =>{
        let height = document.getElementById("height").value;
        let width = document.getElementById("width").value;

        this.setState({
            rowCount: height,
            columnCount: width,
            boardData: this.initBoardData(height, width),
            history: []
        }); 
     
    }

    initBoardData(rowCount, columnCount){

        let data = [];
        //columns
        for (let i=0;i<rowCount;i++){
            //rows
            for (let j=0;j<columnCount;j++){
                data.push([]);
                data[i][j] = {
                    x: j,
                    y: i,
                    isAlive: false
                };
            }
        }

        return data;
    }

    nextTurn = () =>{

        let newGrid = [];

        for (let i=0;i<this.state.rowCount;i++){
            
            for (let j=0;j<this.state.columnCount;j++){
                newGrid.push([]);
                newGrid[i][j] = {
                    x: j,
                    y: i,
                    isAlive: false
                };
            }
        }

        //scan complete grid
        for (let x=0;x<this.state.rowCount;x++){
            for (let y=0;y<this.state.columnCount;y++){
                newGrid[x][y].isAlive = this.updateCellState(this.state.boardData[x][y].isAlive,x,y); 
            }
            
        }

        if (this.arraysEqual(this.state.boardData, newGrid)){
            alert ("No further changes can be made.");
        }else{
            this.state.history.push(this.state.boardData);
        }

        this.setState({
            boardData: newGrid
        });
    }

    updateCellState(currentState, x,y){

        let neighbouringCells = [];

        //build neighbouring cells array for selected cell
        for (var i=0;i<3;i++){
            for (var j=0;j<3;j++){
                
                var neighbourX = x + i - 1;
                var neighbourY = y + j - 1;

                if (neighbourX >= 0 && neighbourX <= this.state.rowCount - 1 && neighbourY >= 0 && neighbourY <= this.state.columnCount - 1 //boundary checks
                    && !(neighbourX === x && neighbourY === y)) //not same cell
                { 
                    neighbouringCells.push(this.state.boardData[x + i - 1][y + j - 1].isAlive);
                }           
            }
        }

        //find total neighbouring cells that are alive
        let totalNeighbours = 0;

        for (let i=0;i<neighbouringCells.length;i++){

            if (neighbouringCells[i])
                totalNeighbours++;
        }

        //return state of cell
        if (currentState){
            if (totalNeighbours < 2)
                return false;
            else if (totalNeighbours === 2 || totalNeighbours === 3)
                return true;
            else
                return true;
        }else{
            if (totalNeighbours === 3)
                return true;
        }
    }

    previousTurn = () =>{

        if (this.state.history.length > 0){
            let previousGrid = this.state.history[this.state.history.length-1];

            this.setState({
                boardData: previousGrid
            });

            //remove last element in history array after render
            this.state.history.pop();
        }else{
            alert("No previous states available.")
        }
    }

    arraysEqual(array1, array2){

        for (let i=0;i<this.state.rowCount;i++){
            for (let j=0;j<this.state.columnCount;j++){
                if (array1[i][j].isAlive != array2[i][j].isAlive){
                    return false;
                }
            }
        }

        return true;
    }

    render(){

        return(
            <div id="outerWrap">
                <header></header>
                <div id="leftPane">
                    <h1>Game Of Life</h1>
                    <p>Please enter the dimensions of the grid and hit Start Game button below. 
                    You can restart any time with new dimensions.</p>
                    <label name="width" className="gridLabel">Width: </label>
                    <input id="width" type="text" name="width" className="gridSize" />
                    <label name="height" className="gridLabel">Height: </label>
                    <input id="height" type="text" name="height" className="gridSize" />
                    
                    <button id="startButton" onClick={this.initialiseGame}>Start Game</button>
                    
                    <div id="buttonPanel">
                        <button id="previousTurnButton" onClick={this.previousTurn.bind(this)}>Previous Turn</button>
                        <button id="nextTurnButton" onClick={this.nextTurn.bind(this)}>Next Turn</button>
                    </div>
                </div>
                
                <div id="mainContent">                   
                    <div id="game">
                        <Grid boardData = {this.state.boardData} rowCount = {this.state.rowCount} columnCount = {this.state.columnCount} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);