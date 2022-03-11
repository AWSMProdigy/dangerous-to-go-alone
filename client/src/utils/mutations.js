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

export const CREATE_GAME = gql`
  mutation createGame($title: String!, $developer: String!, $releaseYear: String!, $src: String!) {
    createGame(title: $title, developer: $developer, releaseYear: $releaseYear, src: $src) {
      title
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
     title
     src
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
      fromTime
      toTime
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

export const UPDATE_DISCORD = gql`
  mutation updateDiscord($discord: String!) {
    updateDiscord(discord: $discord) {
      discord
    }
  }
`;

export const UPDATE_XBOX = gql`
  mutation updateXbox($xboxName: String!) {
    updateXbox(xboxName: $xboxName) {
      xboxName
    }
  }
`;

export const UPDATE_STEAM = gql`
  mutation updateSteam($steamName: String!) {
    updateSteam(steamName: $steamName) {
      steamName
    }
  }
`;

export const UPDATE_PLAYSTATION = gql`
  mutation updatePlaystation($playstationName: String!) {
    updatePlaystation(playstationName: $playstationName) {
      playstationName
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $toDelete: String) {
    uploadFile(file: $file, toDelete: $toDelete) {
      _id
      filename
    }
  }
`;

export const ADD_LFG = gql`
mutation addLfg($gameTitle: String!,$title: String!, $capacity:String!, $creator: String!){
  addLfg(gameTitle: $gameTitle, title: $title, capacity: $capacity, creator: $creator){
    lfgList{
      title
      capacity
      players
    }
  }
}
`;


