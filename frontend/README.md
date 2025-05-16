# Task Management App

A comprehensive platform that combines task tracking with interactive recreational features, secured by Firebase authentication.

## Features

### Task Management
- **Dashboard**: View task statistics and analytics
- **Task Creation**: Add new tasks with detailed information
- **Task Viewing**: View and manage all tasks
- **Task Details**: View detailed information about each task

### Authentication
- **User Registration**: Create a new account
- **User Login**: Secure login with email and password
- **Protected Routes**: Only authenticated users can access task management features

### Recreation Zone
- **Tic Tac Toe**: Classic X and O game
- **Memory Matching**: Match pairs of cards
- **Additional Games**: Placeholder for future games (Hangman, Connect Four, etc.)

## Technologies Used

- **Frontend**: React, React Router, React Bootstrap, Framer Motion
- **Backend**: Node.js, Express, GraphQL
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Styling**: CSS, Bootstrap

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
cd frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:3500/graphql
```

4. Start the development server
```
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AddIssuePage.js
│   │   ├── DashboardPage.js
│   │   ├── EditIssueModal.js
│   │   ├── Home.js
│   │   ├── IssueDetailsPage.js
│   │   ├── IssueFilter.js
│   │   ├── IssueTable.js
│   │   ├── Login.js
│   │   ├── Logout.js
│   │   ├── MemoryGame.js
│   │   ├── ParallaxSlider.js
│   │   ├── PrivateRoute.js
│   │   ├── RecreationZone.js
│   │   ├── Signup.js
│   │   ├── TicTacToe.js
│   │   ├── UnderConstruction.js
│   │   └── ViewIssuesPage.js
│   ├── graphql/
│   │   ├── mutations.js
│   │   └── queries.js
│   ├── App.js
│   ├── App.css
│   ├── firebase.js
│   └── index.js
└── package.json
```

## Usage

1. **Register/Login**: Create an account or log in to access the task management features
2. **Task Management**: Add, view, and manage tasks
3. **Recreation**: Take a break and enjoy the games in the Recreation Zone

## Future Enhancements

- Additional games in the Recreation Zone
- Task categories and tags
- User profile management
- Team collaboration features
- Mobile app version

## Acknowledgments

- React Bootstrap for UI components
- Framer Motion for animations
- Firebase for authentication
- GraphQL for API
