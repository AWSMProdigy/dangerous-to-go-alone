const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    games: [Game]
    friends: [String]
    description: String
    fromTime: String
    toTime: String
    platform: String
    discord: String
    xboxName: String
    steamName: String
    playstationName: String
  }

  type Game {
    _id: ID
    title: String
    developer: String
    releaseYear: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users(useGames: Boolean!, useAvailability: Boolean!, usePlatform: Boolean!): [User]
    user(username: String!): User
    games(username: String!): [Game]
    game(gameId: String!): Game
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(friendName: String!): User
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
  }
`;

module.exports = typeDefs;
