import React from 'react';
import keys from '../constants/keys';
import {gameTickSize, gridSize} from '../constants/game'
import _ from 'lodash';
import DoublyLinkedList from '../constants/DoublyLinkedList.js';
import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);

        let snake = new DoublyLinkedList;
        snake.addToTail([10, 10]);
        snake.addToTail([11, 10]);

        this.state = {
            gameTime: 0,
            color: 'yellow',
            snake: snake,
            direction: 'LEFT',
            score: 0,
            food: [-1, -1]
        }

        this.start = this.start.bind(this);
    }

    componentDidMount(){
        this.handleKeyDown();
    }

    start() {
        clearInterval(this.gameIntervals);

        let newSnake = new DoublyLinkedList;
        newSnake.addToTail([10, 10]);
        newSnake.addToTail([11, 10]);

        this.setState({
            gameTime: 0,
            color: 'yellow',
            snake: newSnake,
            direction: 'LEFT',
            food: this.setFoodPosition(newSnake),
            score: 0
        })

        this.gameIntervals = setInterval(()=>{
            this.moveSnake();
            this.setState({
                gameTime: this.state.gameTime + gameTickSize
            })
        }, gameTickSize)
    }

    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            let color = this.state.color;
            let snake = _.clone(this.state.snake);
            let newHead = _.clone(snake.head.value);
            switch (e.keyCode){
                case keys.LEFT:
                    if (this.state.direction !== 'RIGHT') {
                        this.setState({ direction: 'LEFT' });
                    }
                    break;
                case keys.RIGHT:
                    if (this.state.direction !== 'LEFT') {
                        this.setState({ direction: 'RIGHT' })
                    }
                    break;
                case keys.DOWN:
                    if (this.state.direction !== 'UP') {
                        this.setState({ direction: 'DOWN' })
                    }
                    break;
                case keys.UP:
                    if (this.state.direction !== 'DOWN') {
                        this.setState({ direction: 'UP' })
                    }
                    break;
                case keys.SPACEBAR:
                    break;
                case keys.ENTER:
                    this.start();
                    break;
            }
            this.setState({color});
        });
    }

    isValidMove(snake, newHead) {
        // check if the snake collides with itself
        if (!snake.contains(newHead)) {
            // if the snake eats the food, do not remove its tail
            if (newHead[0] === this.state.food[0] && newHead[1] === this.state.food[1]) {
                this.setState({
                    food: this.setFoodPosition(snake),
                    score: this.state.score + 1
                })
            } else {
                snake.removeTail();
            }
            snake.addToHead(newHead);
        } else {
            this.setState({ color: 'red'});
            alert('YOU LOSE');
            clearInterval(this.gameIntervals);
        }
    }

    setFoodPosition(snake) {
        let x, y;
        // find a coordinate position that does not generate on top of the snake
        do {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        } while (snake.contains([x, y]))
        return [x, y];
    }

    moveSnake() {
        let snake = _.clone(this.state.snake);    
        let newHead = _.clone(snake.head.value);    
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

    render(){
        return (
            <div>
                <div>{`TIME: ${ (this.state.gameTime/1000).toFixed(1) }`}</div>
                <div>{`SCORE: ${this.state.score }`}</div>
                <Grid 
                    color={this.state.color}
                    snake={this.state.snake}
                    food={this.state.food} 
                />
                <button 
                    onClick={this.start}
                    style={{
                        display: 'block',
                        width: '100px',
                        margin: '10px 0 0 150px'
                    }}
                >
                    START
                </button>
            </div>
        )
    }
}


