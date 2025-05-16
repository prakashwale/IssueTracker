import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaTasks, FaBell, FaCheckCircle, FaRocket, FaGamepad } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import '../App.css';

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      icon: <FaChartLine />,
      title: "Smart Analytics",
      description: "Get real-time insights into your project's performance with advanced analytics.",
      color: "#FF6B6B"
    },
    {
      icon: <FaUsers />,
      title: "Team Sync",
      description: "Connect your team with seamless collaboration and real-time updates.",
      color: "#4ECDC4"
    },
    {
      icon: <FaTasks />,
      title: "Task Master",
      description: "Organize and track tasks with our intelligent task management system.",
      color: "#45B7D1"
    },
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      description: "Never miss important updates with our intelligent notification system.",
      color: "#96CEB4"
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Control",
      description: "Maintain high standards with automated quality checks and reviews.",
      color: "#FFEEAD"
    },
    {
      icon: <FaGamepad />,
      title: "Recreation Zone",
      description: "Take a break and enjoy fun games to recharge your productivity.",
      color: "#D4A5A5"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Transform Your Project Management</h1>
          <p className="hero-subtitle">
            Experience the next generation of task tracking with our intuitive and powerful platform.
            Streamline your workflow and boost team productivity.
          </p>
          <div className="hero-buttons">
            {user ? (
              <>
                <Button 
                  variant="primary" 
                  className="cta-button primary" 
                  as={Link} 
                  to="/dashboard"
                >
                  Launch Dashboard
                </Button>
                <Button 
                  variant="outline-primary" 
                  className="cta-button secondary" 
                  as={Link} 
                  to="/recreation"
                >
                  Play Games
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="primary" 
                  className="cta-button primary" 
                  as={Link} 
                  to="/login"
                >
                  Login
                </Button>
                <Button 
                  variant="outline-primary" 
                  className="cta-button secondary" 
                  as={Link} 
                  to="/signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <div className="section-header">
            <h2>Powerful Features for Modern Teams</h2>
            <p>Everything you need to manage projects efficiently and effectively</p>
          </div>
          
          <Row>
            {features.map((feature, index) => (
              <Col md={4} key={index} className="mb-4">
                <motion.div
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <Card.Body>
                      <div className="feature-icon" style={{ color: feature.color }}>
                        {feature.icon}
                      </div>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={4}>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>15K+</h3>
                <p>Happy Users</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3>75K+</h3>
                <p>Tasks Completed</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3>99%</h3>
                <p>Success Rate</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Supercharge Your Project Management?</h2>
            <p>Join the growing community of teams that trust TaskTrack for their project needs</p>
            {user ? (
              <Button 
                variant="primary" 
                className="cta-button primary" 
                as={Link} 
                to="/add-issue"
              >
                Start Your Journey
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="cta-button primary" 
                as={Link} 
                to="/signup"
              >
                Start Your Journey
              </Button>
            )}
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;