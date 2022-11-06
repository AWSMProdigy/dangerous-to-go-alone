const { gql } = require('apollo-server-express');

const typeDefs = gql`

  scalar Upload

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    games: [String]
    friends: [String]
    description: String
    fromTime: String
    toTime: String
    platform: String
    discord: String
    xboxName: String
    steamName: String
    playstationName: String
    profPic: String
    canLfg: Boolean
    playstyle: String
  }
  type lfg {
    _id: ID!
    creator: String!
    date: Int!
    title: String!
    capacity: Int!
    players: [String]
    playstyle: String
  }

  type Game {
    _id: ID!
    title: String
    developer: String
    releaseYear: String
    players: [String]
    src: String
    platforms: String
    lfgList: [lfg]
  }

  type gameAndUser {
    game: Game
    players: [User]
  }

  

  type Auth {
    token: ID!
    user: User
  }

  type File {
    _id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    games: [Game]
    game(gameTitle: String!): gameAndUser
    me: User
    gameUsers(gamers: [String]!): [User]
    files: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(friendName: String!): User
    createGame(title: String!, developer: String!, releaseYear: String!, src: String!): Game
    addUserGame(title: String!): Game
    removeFriend(userName: String!): User
    removeGame(title: String!): User
    updateGames(title: String!): User
    updateAvailability(fromTime: String!, toTime: String!): User
    updatePlatform(platform: String!): User
    updateDesc(description: String!): User
    updateDiscord(discord: String!): User
    updateXbox(xboxName: String!): User
    updateSteam(steamName: String!): User
    updatePlaystation(playstationName: String!): User
    uploadFile(file: Upload!, toDelete: String): File!
    uploadGameImage(file: Upload!): File!
    addLfg(gameTitle: String!, title: String!, capacity: Int!, creator: String!, playstyle: String!): Game
    updateLfg(gameTitle: String! ,_id: String!, add: Boolean!, player: String!, capacity: String!): Game
    closeLfg(gameTitle: String!, _id: String!): Game
    updateMe(description: String!, platform: String!, fromTime: String!, toTime: String!, discord: String!, xboxName: String!, steamName: String!, playstationName: String!, playstyle: String!): User
  }
`;

module.exports = typeDefs;
