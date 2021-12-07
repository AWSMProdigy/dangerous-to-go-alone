const db = require('../config/connection');
const { User, Game } = require('../models');


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Game.deleteMany({});

    await Game.create({
      title: "Battlefield 2042",
      developer: "Dice",
      releaseYear: "2021",
      platforms: "PC Xbox Playstation"
    });
    await Game.create({
      title: "Halo Infinite",
      developer: "343",
      releaseYear: "2021",
      platforms: "PC Xbox"
    });
    await Game.create({
      title: "Stardew Valley",
      developer: "Dice",
      releaseYear: "2021",
      platforms: "PC Xbox Playstation"
    });
    await Game.create({
      title: "League of Legends",
      developer: "Riot Games",
      releaseYear: "2010",
      platforms: "PC"
    });
    await Game.create({
      title: "Forza Horizon 5",
      developer: "Playground Games",
      releaseYear: "2021",
      platforms: "PC Xbox"
    });
    await Game.create({
      title: "Black Ops 2",
      developer: "Treyarch",
      releaseYear: "2012",
      platforms: "PC Xbox Playstation"
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
