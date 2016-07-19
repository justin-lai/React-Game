import React from 'react';
import keys from '../constants/keys';
import {gameTickSize, gridSize} from '../constants/game'
import _ from 'lodash';
import DoublyLinkedList from '../constants/DoublyLinkedList.js';
import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);

        var snake = new DoublyLinkedList;
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

        var newSnake = new DoublyLinkedList;
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
                    break;
                case keys.ENTER:
                    this.start();
                    break;
            }
            this.setState({color});
        });
    }

    isValidMove(snake, newHead) {
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
        var x, y;
        do {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        } while (snake.contains([x, y]))
        return [x, y];
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

    render(){
        return (
            <div>
                <div>{ 'TIME: ' + this.state.gameTime }</div>
                <div>{ 'SCORE: ' + this.state.score }</div>
                <Grid 
                    color={this.state.color}
                    snake={this.state.snake}
                    food={this.state.food} 
                />
                <button 
                    onClick={this.start}
                    style={{
                        display: 'block',
                        width: '100px'
                    }}
                >
                    START
                </button>
            </div>
        )
    }
}


