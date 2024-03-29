const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
const { User, Game, gameAndUser } = require('../models');
const { signToken } = require('../utils/auth');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const path = require('path');
const fs = require('fs');
const mongodb = require("mongodb");
const db = require('../config/connection');


const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    // May not need this, only going to find users with certain params
    users: async (parent) => {
      return User.find();
    },
    // THis one can stay
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    gameUsers: async (parent, {gamers}) => {
      return User.find({ username: {"$in": gamers}})
    },

    games: async (parent, { title }) => {
      const params = title ? { title } : {};
      return Game.find(params).sort({ createdAt: -1 });
    },
    game: async (parent, { gameTitle }) => {
      let myGame = await Game.findOne({title: gameTitle});
      return {game: myGame, players: await User.find({ username: {"$in": myGame.players}})}
    },
    me: async (parent, args, context) => {
      console.log("Grabbing me");
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    files: async(parent, args, context) => {
      console.log(db);
      return "Hello";
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
      let me;
      if (context.user) {
        if(friendName = context.user.username){
          throw new GraphQLError("Loneliness is tough, but you can't be friends with yourself! Use Dangerous To Go Alone to find new friends!", {
            extensions: { code: '404' },
          });
        }
        const friend = await User.findOne({
          username: friendName,
        });
        //Make sure character exists
        if(friend){
          me = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendName } },
            {new: true}
          );
        }
        else{
          throw new GraphQLError("That friend does not exist", {
            extensions: { code: '404' },
          });
        }

        return me;
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

    removeFriend: async (parent, { friendName }, context) => {
      let me;
      if (context.user) {
        const friend = await User.findOne({
          username: friendName,
        });
        //Make sure character exists
        if(friend){
          me = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { friends: friendName } },
            {new: true}
          );
        }
        else{
          throw new GraphQLError("That user does not exist", {
            extensions: { code: '404' },
          });
        }

        return me;
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
    },

    uploadFile: async (parent, { file, toDelete }, context) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const bucket = new mongodb.GridFSBucket(db.db, {bucketName:"profImages"});
      const uploadStream = bucket.openUploadStream(filename);
      const cursor = bucket.find({});
      if(toDelete != undefined || toDelete != null){
      cursor.forEach(doc => {
        if(doc.filename === toDelete){
          bucket.delete(doc._id);
        }
      })
    }
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { profPic: filename } }
      );
      
      await new Promise((resolve, reject) => {
      createReadStream(`./${filename}`)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", resolve);
      });

      return { _id: uploadStream.id, filename, mimetype, encoding }
    },

    uploadGameImage: async (parent, { file, toDelete }, context) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const bucket = new mongodb.GridFSBucket(db.db, {bucketName:"gameImages"});
      const uploadStream = bucket.openUploadStream(filename);
      const cursor = bucket.find({});
      if(toDelete != undefined || toDelete != null){
      cursor.forEach(doc => {
        if(doc.filename === toDelete){
          bucket.delete(doc._id);
        }
      })
    }
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { profPic: filename } }
      );
      
      await new Promise((resolve, reject) => {
      createReadStream(`./${filename}`)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", resolve);
      });

      return { _id: uploadStream.id, filename, mimetype, encoding }
    },

    addLfg: async (parent, {gameTitle, title, capacity, creator, playstyle}, context) => {
      if (context.user){
        await User.findOne({ _id: context.user._id }).then(response => {
          console.log(response.canLfg);
          if(!response.canLfg){
            throw new GraphQLError("Cannot create new LFG with an LFG already", {
              extensions: { code: '400' },
            });
          }
        })
        await Game.findOneAndUpdate(
          {title: gameTitle},
          { $pull: {lfgList: {creator: creator}}}
        )
        let myGame = await Game.findOneAndUpdate(
          {title: gameTitle},
          { $push: {lfgList: {title: title, creator: creator, capacity: capacity, playstyle: playstyle}}},
          {new: true}
        )
        //Might be able to find a way to modify me object and not have to use this call
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$set: {canLfg: false}},
          {new: true}
        ).then(response => {
          console.log("User updated");
        });
        return myGame;
      }
      
      throw new AuthenticationError('You need to be logged in!');
    },

    updateLfg: async (parent, {gameTitle, _id, add, player}, context) =>{
      if (context.user){
        if(add){
          const game = await Game.findOneAndUpdate(
            {title: gameTitle, "lfgList._id": _id},
            {$addToSet: {"lfgList.$.players": player}},
            {new: true}
          );
          return game;
        }
        else{
          const game = await Game.findOneAndUpdate(
            {title: gameTitle, "lfgList._id": _id},
            {$pull: {"lfgList.$.players": player}},
            {new: true}
          );
          return game;
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    closeLfg: async (parent, {gameTitle, _id}, context) => {
      if(context.user){
        let myGame = await Game.findOneAndUpdate(
          {title: gameTitle},
          { $pull: {lfgList: {_id: _id}}},
          { new: true }
        )
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$set: {canLfg: true}},
          {new: true}
        )
        return myGame;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateMe: async (parent, { description, platform, fromTime, toTime, discord, xboxName, steamName, playstationName, playstyle }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { description: description,
                    platform: platform,
                    fromTime: fromTime,
                    toTime: toTime,
                    discord: discord,
                    xboxName: xboxName,
                    steamName: steamName,
                    playstationName: playstationName,
                    playstyle: playstyle
           } }
        );
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
}

module.exports = resolvers;
