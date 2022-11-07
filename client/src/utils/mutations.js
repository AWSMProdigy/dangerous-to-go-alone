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
mutation addLfg($gameTitle: String!,$title: String!, $capacity:Int!, $creator: String!, $playstyle: String!){
  addLfg(gameTitle: $gameTitle, title: $title, capacity: $capacity, creator: $creator, playstyle: $playstyle){
    lfgList{
      title
      creator
      capacity
      playstyle
    }
  }
}
`;

export const UPDATE_LFG =  gql`
mutation updateLfg($gameTitle: String!, $_id: ID!,$add: Boolean!, $player: String!){
  updateLfg(gameTitle: $gameTitle, _id: $_id, add: $add, player: $player){
    lfgList{
      players
    }
  }
}
`

export const CLOSE_LFG = gql`
mutation closeLfg($gameTitle:String!, $_id: String!){
  closeLfg(gameTitle: $gameTitle, _id: $_id){
    lfgList{
      title
      capacity
      players
    }
  }
}
`

export const UPDATE_ME = gql`
  mutation updateMe($description: String!, $platform: String!, $fromTime: String!, $toTime: String!, $discord: String!, $xboxName: String!, $steamName: String!, $playstationName: String!, $playstyle: String!) {
    updateMe(description: $description, platform: $platform, fromTime: $fromTime, toTime: $toTime, discord: $discord, xboxName: $xboxName, steamName: $steamName, playstationName: $playstationName, playstyle: $playstyle) {
      description
      platform
      fromTime
      toTime
      discord
      xboxName
      steamName
      playstationName
      playstyle
    }
  }
`;


