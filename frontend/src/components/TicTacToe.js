import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUndo } from 'react-icons/fa';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
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
  };

  const handleClick = (i) => {
    if (board[i] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setGameOver(false);
  };

  const renderSquare = (i) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={board[i] === 'X' ? 'primary' : board[i] === 'O' ? 'danger' : 'light'}
          className="square"
          onClick={() => handleClick(i)}
          disabled={board[i] || winner || gameOver}
        >
          {board[i]}
        </Button>
      </motion.div>
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : gameOver
    ? 'Game Over - Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Card className="game-card">
      <Card.Header>
        <h3>Tic Tac Toe</h3>
      </Card.Header>
      <Card.Body>
        <div className="game-status mb-3">{status}</div>
        <div className="game-board">
          <Row className="mb-2">
            <Col>{renderSquare(0)}</Col>
            <Col>{renderSquare(1)}</Col>
            <Col>{renderSquare(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{renderSquare(3)}</Col>
            <Col>{renderSquare(4)}</Col>
            <Col>{renderSquare(5)}</Col>
          </Row>
          <Row>
            <Col>{renderSquare(6)}</Col>
            <Col>{renderSquare(7)}</Col>
            <Col>{renderSquare(8)}</Col>
          </Row>
        </div>
        <div className="mt-3 text-center">
          <Button variant="secondary" onClick={resetGame}>
            <FaUndo /> Reset Game
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TicTacToe; 