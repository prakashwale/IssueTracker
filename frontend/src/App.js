import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import AddIssuePage from './components/AddIssuePage';
import ViewIssuesPage from './components/ViewIssuesPage';
import IssueDetailsPage from './components/IssueDetailsPage';
import DashboardPage from './components/DashboardPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import RecreationZone from './components/RecreationZone';
import PrivateRoute from './components/PrivateRoute';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const Layout = () => {
  const location = useLocation();
  const [user] = useAuthState(auth);

  return (
    <div className="app-container">
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-content">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              TaskTrack
            </Link>
          </motion.div>
          <div className="nav-links">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </motion.div>
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/add-issue" className={`nav-link ${location.pathname === '/add-issue' ? 'active' : ''}`}>
                    Add Task
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/issues" className={`nav-link ${location.pathname === '/issues' ? 'active' : ''}`}>
                    View Tasks
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/recreation" className={`nav-link ${location.pathname === '/recreation' ? 'active' : ''}`}>
                    Recreation
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Logout />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/signup" className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}>
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.nav>
      <AnimatePresence mode="wait">
        <motion.div 
          key={location.pathname}
          className="content-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="add-issue" element={
            <PrivateRoute>
              <AddIssuePage />
            </PrivateRoute>
          } />
          <Route path="issues" element={
            <PrivateRoute>
              <ViewIssuesPage />
            </PrivateRoute>
          } />
          <Route path="issue/:id" element={
            <PrivateRoute>
              <IssueDetailsPage />
            </PrivateRoute>
          } />
          <Route path="dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="recreation" element={
            <PrivateRoute>
              <RecreationZone />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;