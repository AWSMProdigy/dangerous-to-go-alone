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
      games
      discord
      xboxName
      steamName
      playstationName
      profPic
      playstyle
      canLfg
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
      players
      platforms
    }
  }
`;

export const QUERY_GAME = gql`
query game($gameTitle: String!){
  game(gameTitle: $gameTitle){
    game{
      title
      developer
      releaseYear
      src
      players
      platforms
      lfgList{
        _id
        title
        creator
        players
        capacity
        playstyle
      }
    }
    players{
      username
      fromTime
      toTime
      platform
    }
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
      games
      discord
      xboxName
      steamName
      playstationName
      profPic
      playstyle
    }
  }
`;

export const QUERY_LIBRARY = gql`
  query library {
    games{
      title
      developer
      releaseYear
      src
      players
      platforms
    }
    me{
      games
    }
  }
`

export const QUERY_ME_GAME = gql`
  query me_game($gameTitle: String!) {
    game(gameTitle: $gameTitle){
      game{
        title
        developer
        releaseYear
        src
        players
        platforms
        lfgList{
          _id
          title
          creator
          players
          capacity
          playstyle
        }
      }
      players{
        username
        fromTime
        toTime
        platform
      }
    }
    me{
      fromTime
      toTime
      username
      canLfg
      playstyle
    }
  }
`
