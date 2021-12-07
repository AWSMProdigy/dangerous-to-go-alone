const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // May not need this, only going to find users with certain params
    users: async (parent, {useGames, useAvailability, usePlatform}, context) => {
      let games = context.user.games;
      let availability = context.user.availability;
      let platform = context.user.platform;
      const gameParam = useGames ? { games } : {};
      const availabilityParam = useAvailability ? { availability } : {};
      const platformParam = usePlatform ? { platform } : {};
      return User.find({ gameParam, availabilityParam, availabilityParam });
    },
    // THis one can stay
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    games: async (parent, { title }) => {
      const params = title ? { title } : {};
      return Game.find(params).sort({ createdAt: -1 });
    },
    game: async (parent, { title }) => {
      return Game.findOne({ title });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addFriend: async (parent, { friendName }, context) => {
      if (context.user) {
        const friend = await User.findOne({
          username: friendName,
        });
        //Make sure character exists
        if(friend){
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendName } }
          );
        }

        return context.user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addUserGame: async (parent, { title }, context) => {
      if(context.user){
      
      const game = await Game.findOneAndUpdate(
        {title: title},
        {$addToSet: {players: context.user.username}}
      );
      if(context.user && game) {
        console.log("Resolver 86" + game);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: {games: title}},
          { new: true }
        );
        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
    },

    removeFriend: async (parent, { userName }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: userName } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

    removeGame: async (parent, { title }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { games: title } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    updateGames: async (parent, { title }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { games: title } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateAvailability: async (parent, { fromTime, toTime }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {fromTime: fromTime, toTime: toTime}
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updatePlatform: async (parent, { platform }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { platform: platform } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateDesc: async (parent, { description }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { description: description } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateDiscord: async (parent, { discord }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { discord: discord } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateXbox: async (parent, { xboxName }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { xboxName: xboxName } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateSteam: async (parent, { steamName }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { steamName: steamName } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updatePlaystation: async (parent, { playstationName }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { playstationName: playstationName } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    createGame: async (parent, { title, developer, releaseYear, src }) => {
      const game = await Game.create({title, developer, releaseYear, src});
      return game;
    }
  }
}

module.exports = resolvers;
