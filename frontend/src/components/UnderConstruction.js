import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaHardHat, FaTools } from 'react-icons/fa';

const UnderConstruction = ({ title }) => {
  return (
    <Card className="game-card">
      <Card.Header>
        <h3>{title}</h3>
      </Card.Header>
      <Card.Body className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaHardHat size={50} className="mb-3 text-warning" />
          <h4>Under Construction</h4>
          <p>This game is currently being developed. Check back soon!</p>
          <div className="construction-animation">
            <FaTools className="construction-icon" />
          </div>
        </motion.div>
      </Card.Body>
    </Card>
  );
};

export default UnderConstruction; 