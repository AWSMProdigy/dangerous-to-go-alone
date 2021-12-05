import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendName: String!) {
    addFriend(friendName: $friendName) {
      username
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendName: String!) {
    removeFriend(friendName: $friendName) {
      username
    }
  }
`;

export const ADD_GAME = gql`
  mutation addUserGame($title: String!) {
    addUserGame(title: $title) {
     games
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($title: String!) {
    removeGame(title: $title) {
      games
    }
  }
`;

export const UPDATE_GAMES = gql`
  mutation updateGames($title: String!) {
    updateGames(title: $title) {
      games
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
  mutation updateAvailability($fromTime: String!, $toTime: String!) {
    updateAvailability(fromTime: $fromTime, toTime: $toTime) {
      availability
    }
  }
`;

export const UPDATE_PLATFORM = gql`
  mutation updatePlatform($platform: String!) {
    updatePlatform(platform: $platform) {
      platform
    }
  }
`;

export const UPDATE_DESC = gql`
  mutation updateDesc($description: String!) {
    updateDesc(description: $description) {
      description
    }
  }
`;


