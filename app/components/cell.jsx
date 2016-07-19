import React from 'react';

import _ from 'lodash';

export default class Cell extends React.Component {
    constructor(props){
        super(props);
    }

    cellColor(x ,y) {
        if (this.isSnakeCell(x, y)) {
            return this.props.color;
        } else if (this.isFoodCell(x, y)) {
            return 'orange';
        } else {
            return 'blue';
        }
    }

    isSnakeCell(x, y){
        return this.props.snake.contains([x, y]);
    }

    isFoodCell(x, y){
        return x === this.props.food[0] && y === this.props.food[1];
    }

    createCellStyle(x, y){
        return {
            display: 'inline-block',
            margin: '0px 0px 0px 0px',
            padding: '0px 0px 0px 0px',
            width: '20px',
            minWidth: '20px',
            height: '20px',
            minHeight: '20px',
            // border:'solid 1px black',
            backgroundColor: this.cellColor(x, y)
        }
    }
    render(){
        return (
            <div
                className='cell'
                style={this.createCellStyle(this.props.x, this.props.y)}
            >

            </div>

        )
    }

}
