import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Card className="auth-card" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                className="w-100 mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : <><FaSignInAlt /> Login</>}
              </Button>
              <div className="text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  );
};

export default Login; 