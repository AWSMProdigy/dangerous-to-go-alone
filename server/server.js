const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { graphqlUploadExpress } = require('graphql-upload');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const mongodb = require('mongodb');
const fs = require('fs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cors: {
    credentials: true,
    origin: true
  },
  uploads: false,

});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

server.applyMiddleware({ app,
  cors: {
    credentials: true,
    origin: true
  } 
});



  app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.static('public'));

app.get("/file/:filename", function(req, res){ 
  const bucket = new mongodb.GridFSBucket(db.db, {bucketName: "images"})
  bucket.openDownloadStreamByName(req.params.filename)
            .pipe(res)
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
