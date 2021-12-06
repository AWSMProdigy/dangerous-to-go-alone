import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      friends
      email
      description
      fromTime
      toTime
      platform
      games{
        title
      }
      discord
      xboxName
      steamName
      playstationName
    }
  }
`;

export const QUERY_GAMES = gql`
  query games{
    games{
      title
      developer
      releaseYear
      src
    }
  }
`;

export const QUERY_GAME = gql`
  query game{
    game{
      title
      developer
      releaseYear
      src
      players
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friends
      description
      toTime
      fromTime
      platform
      games{
        title
      }
      discord
      xboxName
      steamName
      playstationName
    }
  }
`;
