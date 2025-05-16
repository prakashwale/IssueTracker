import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRedo, FaStar } from 'react-icons/fa';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Emoji pairs for the memory game
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  
  // Initialize the game
  const initializeGame = () => {
    // Create pairs of emojis
    const cardPairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameStarted(true);
    setGameWon(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedPairs.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check if they match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      const firstEmoji = cards[firstCard].emoji;
      const secondEmoji = cards[secondCard].emoji;

      if (firstEmoji === secondEmoji) {
        // Match found
        setMatchedPairs([...matchedPairs, firstCard, secondCard]);
        setFlippedCards([]);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Start the game when component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <Card className="game-card">
      <Card.Header>
        <h3>Memory Matching Game</h3>
      </Card.Header>
      <Card.Body>
        <div className="game-stats mb-3">
          <p>Moves: {moves}</p>
          {gameWon && (
            <div className="game-won">
              <FaStar className="text-warning" /> Congratulations! You won in {moves} moves!
            </div>
          )}
        </div>
        
        <div className="memory-game">
          <Row>
            {cards.map((card) => (
              <Col xs={3} key={card.id} className="mb-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className={`memory-card ${flippedCards.includes(card.id) || matchedPairs.includes(card.id) ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="card-inner">
                      <div className="card-front">?</div>
                      <div className="card-back">{card.emoji}</div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
        
        <div className="mt-3 text-center">
          <Button variant="primary" onClick={initializeGame}>
            <FaRedo /> New Game
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemoryGame; 