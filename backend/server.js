const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Issue = require('./models/Issue');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo DB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const schema = buildSchema(`
  type Issue {
    id: ID!
    title: String!
    description: String!
    priority: String!
    assignedDeveloper: String!
    tags: [String!]!
    dueDate: String!
    status: String!
  }

  type Query {
    issues: [Issue]
    issue(id: ID!): Issue
  }

  type Mutation {
    addIssue(
      title: String!
      description: String!
      priority: String!
      assignedDeveloper: String!
      tags: [String!]!
      dueDate: String!
    ): Issue!
    updateIssue(id: ID!, status: String!): Issue!
    deleteIssue(id: ID!): Issue
  }
`);

const root = {
  issues: async () => {
    try {
      return await Issue.find();
    } catch (error) {
      throw new Error('Error fetching issues');
    }
  },
  
  issue: async ({ id }) => {
    try {
      return await Issue.findById(id);
    } catch (error) {
      throw new Error('Error fetching issue');
    }
  },
  
  addIssue: async ({ title, description, priority, assignedDeveloper, tags, dueDate }) => {
    try {
      const newIssue = new Issue({
        title,
        description,
        priority, // No case conversion needed
        assignedDeveloper,
        tags: tags.filter(tag => tag.trim() !== ''),
        dueDate
        // Let Mongoose apply the default status
      });
      const result = await newIssue.save();
      return result;
    } catch (error) {
      throw new Error('Error adding issue: ' + error.message);
    }
  },
  
  updateIssue: async ({ id, status }) => {
    try {
      return await Issue.findByIdAndUpdate(
        id, 
        { status }, 
        { new: true }
      );
    } catch (error) {
      throw new Error('Error updating issue: ' + error.message);
    }
  },
  
  deleteIssue: async ({ id }) => {
    try {
      const deletedIssue = await Issue.findByIdAndDelete(id);
      if (!deletedIssue) {
        throw new Error('Issue not found');
      }
      return deletedIssue;
    } catch (error) {
      throw new Error('Error deleting issue: ' + error.message);
    }
  }
};


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});