const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { graphqlUploadExpress } = require('graphql-upload');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));

const Grid = require('gridfs-stream');
// Grid.mongo = mongo;




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


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/hello", function(req, res){ 
  gfs = Grid(db);
  var readstream = gfs.createReadStream({filename: req.params.filename}); 
  readstream.on("error", function(err){
      res.send("No image found with that title"); 
  });
  readstream.pipe(res);
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
