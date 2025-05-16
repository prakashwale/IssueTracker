import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
  query GetIssues {
    issues {
      id
      title
      description
      priority
      assignedDeveloper
      tags
      dueDate
      status
    }
  }
`;

export const GET_ISSUE = gql`
  query GetIssue($id: ID!) {
    issue(id: $id) {
      id
      title
      description
      priority
      assignedDeveloper
      tags
      dueDate
      status
    }
  }
`;