import { gql } from '@apollo/client';

export const ADD_ISSUE = gql`
  mutation AddIssue(
    $title: String!
    $description: String!
    $priority: String!
    $assignedDeveloper: String!
    $tags: [String!]!
    $dueDate: String!
  ) {
    addIssue(
      title: $title
      description: $description
      priority: $priority
      assignedDeveloper: $assignedDeveloper
      tags: $tags
      dueDate: $dueDate
    ) {
      id
      title
      status
    }
  }
`;

export const UPDATE_ISSUE = gql`
  mutation UpdateIssue($id: ID!, $status: String!) {
    updateIssue(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const DELETE_ISSUE = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id) {
      id
    }
  }
`;