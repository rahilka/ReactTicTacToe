import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  // store the current value of the square in state,
  // and change it when the sqare is clicked

  // Square no longer keeps its own state;
  // it receives its value from its parent Board and informs its parent when it's clicked.
  // We call components like this controlled components.

  return (
    // Whenever this.setState is called, an update to the component is scheduled
    // causing React to merge in the passed state update and rerender the component along with its descendants.
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

class Board extends React.Component {

  // When you want to aggregate data from multiple children or to have two child components communicate with each other,
  // move the state upwards so that it lives in the parent component.
  // The parent can then pass the state back down to the children via props,
  // so that the child components are always in sync with each other and with the parent.

  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // To update the state of Board,
  // The usual pattern is pass down a function from Board to Square that gets called when the square is clicked.

  handleClick(i) {
    const squares = this.state.squares.slice(); // copy the squares array prior to making changes and to prevent mutating the existing array

    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
       />  //we pass two props from Board to Square: value and onCLick
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
