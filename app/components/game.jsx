import React from 'react';
import keys from '../constants/keys';
import {gameTickSize, gridSize} from '../constants/game'
import _ from 'lodash';
import DoublyLinkedList from '../constants/LinkedList.js';
import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        var snake = new DoublyLinkedList;
        snake.addToTail([1, 0]);
        snake.addToTail([2, 0]);
        snake.addToTail([3, 0]);
        snake.addToTail([4, 0]);
        snake.addToTail([5, 0]);
        snake.addToTail([6, 0]);
        snake.addToTail([7, 0]);

        this.state = {
            gameTime: 0,
            color: 'red',
            snake: snake,
            direction: 'LEFT'
        }

        this.restart = this.restart.bind(this);
    }
    componentDidMount(){
        this.handleKeyDown();

        this.gameIntervals = setInterval(()=>{
            this.moveSnake();
            this.setState({
                gameTime: this.state.gameTime + gameTickSize
            })
        }, gameTickSize)
    }

    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            var color = this.state.color;
            var snake = _.clone(this.state.snake);
            var newHead = _.clone(snake.head.value);
            switch (e.keyCode){
                case keys.LEFT:
                    this.setState({ direction: 'LEFT' });
                    break;
                case keys.RIGHT:
                    this.setState({ direction: 'RIGHT' })
                    break;
                case keys.DOWN:
                    this.setState({ direction: 'DOWN' })
                    break;
                case keys.UP:
                    this.setState({ direction: 'UP' })
                    break;
                case keys.SPACEBAR:
                    color = _.sample(['red', 'green', 'blue', 'yellow']);
                    break;
                case keys.ENTER:
                    break;
            }
            this.setState({color});
        });
    }

    isValidMove(snake, newHead) {
        if (!snake.contains(newHead)) {
            snake.removeTail();
            snake.addToHead(newHead);
        } else {
            alert('YOU LOSE');
            clearInterval(this.gameIntervals);
        }
    }

    moveSnake() {
        var snake = _.clone(this.state.snake);    
        var newHead = _.clone(snake.head.value);    
        switch (this.state.direction){
            case 'LEFT':
                newHead[0] = --newHead[0] < 0 ? gridSize - 1 : newHead[0]; 
                this.isValidMove(snake, newHead);
                break;
            case 'RIGHT':
                newHead[0] = ++newHead[0] >= gridSize ? 0 : newHead[0]; 
                this.isValidMove(snake, newHead);
                break;
            case 'DOWN':
                newHead[1] = ++newHead[1] >= gridSize ? 0 : newHead[1]; 
                this.isValidMove(snake, newHead);
                break;
            case 'UP':
                newHead[1] = --newHead[1] < 0 ? gridSize - 1 : newHead[1]; 
                this.isValidMove(snake, newHead);                
                break;
        }
    }

    restart() {
        clearInterval(this.gameIntervals);

        var newSnake = new DoublyLinkedList;
        newSnake.addToTail([1, 0]);
        newSnake.addToTail([2, 0]);
        newSnake.addToTail([3, 0]);
        newSnake.addToTail([4, 0]);
        newSnake.addToTail([5, 0]);
        newSnake.addToTail([6, 0]);
        newSnake.addToTail([7, 0]);

        this.setState({
            gameTime: 0,
            color: 'red',
            snake: newSnake,
            direction: 'LEFT'
        })

        this.gameIntervals = setInterval(()=>{
            this.moveSnake();
            this.setState({
                gameTime: this.state.gameTime + gameTickSize
            })
        }, gameTickSize)
    }

    render(){
        return (
            <div>
                { this.state.gameTime }
                <Grid 
                    position={this.state.position} 
                    color={this.state.color}
                    snake={this.state.snake}
                />
                <button onClick={this.restart}>RESTART </button>
            </div>
        )
    }
}


