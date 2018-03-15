import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Reset(props){
  return (
    <button onClick = {props.reset}>
      Play Again
    </button>
  );
}

function Square(props) {
  return (
    <button className="square" onClick= {props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(index) {
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.props.onClick(index)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <Reset reset={this.props.reset}/>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
    };
  }

  handleClick(index) {
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    // makes a copy of the original array...
    if (calculateWinner(squares) || squares[index]) return;
    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  handleReset(){
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }]
    });
  }


  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(index)=> this.handleClick(index)}
            reset={()=> this.handleReset()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let line of lines){
    const [a,b,c] = line;
    // if there is a value in square a, and this is the same as b and c, then return the value of a
    // ie. don't return if a is null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
