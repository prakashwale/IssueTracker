import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Pagination } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TicTacToe from './TicTacToe';
import MemoryGame from './MemoryGame';
import UnderConstruction from './UnderConstruction';
import { FaGamepad, FaPuzzlePiece, FaDice, FaChess } from 'react-icons/fa';

const RecreationZone = () => {
  const [activePage, setActivePage] = useState(1);
  const gamesPerPage = 2;
  
  const games = [
    { 
      id: 1, 
      title: 'Tic Tac Toe', 
      component: <TicTacToe />, 
      icon: <FaGamepad />,
      description: 'Classic X and O game'
    },
    { 
      id: 2, 
      title: 'Memory Matching', 
      component: <MemoryGame />, 
      icon: <FaPuzzlePiece />,
      description: 'Match pairs of cards'
    },
    { 
      id: 3, 
      title: 'Hangman', 
      component: <UnderConstruction title="Hangman" />, 
      icon: <FaDice />,
      description: 'Coming soon!'
    },
    { 
      id: 4, 
      title: 'Connect Four', 
      component: <UnderConstruction title="Connect Four" />, 
      icon: <FaChess />,
      description: 'Coming soon!'
    }
  ];

  const totalPages = Math.ceil(games.length / gamesPerPage);
  
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const currentGames = games.slice(
    (activePage - 1) * gamesPerPage,
    activePage * gamesPerPage
  );

  return (
    <Container className="recreation-zone">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Recreation Zone</h2>
        <p className="text-center mb-4">
          Take a break from task management and enjoy some fun games!
        </p>

        <Row>
          {currentGames.map((game) => (
            <Col md={6} key={game.id} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {game.component}
              </motion.div>
            </Col>
          ))}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={activePage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default RecreationZone; 