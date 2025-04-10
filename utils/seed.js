import mongoose from 'mongoose';
import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';

const seedUsers = [
  {
    username: 'alice',
    email: 'alice@example.com',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
  },
  {
    username: 'charlie',
    email: 'charlie@example.com',
  },
];

const seedThoughts = [
  {
    thoughtText: "Just finished watching a cool documentary!",
    username: 'alice',
  },
  {
    thoughtText: "I need coffee. Again.",
    username: 'bob',
  },
  {
    thoughtText: "Working on my coding challenge 😎",
    username: 'charlie',
  },
];

const runSeed = async () => {
  try {
    await db.dropDatabase();

    const users = await User.insertMany(seedUsers);

    const thoughts = await Promise.all(
      seedThoughts.map(async (thought) => {
        const created = await Thought.create(thought);
        await User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: created._id } }
        );
        return created;
      })
    );

    // Add friends
    await User.findOneAndUpdate(
      { username: 'alice' },
      { $addToSet: { friends: users[1]._id } } // alice friends bob
    );
    await User.findOneAndUpdate(
      { username: 'bob' },
      { $addToSet: { friends: users[2]._id } } // bob friends charlie
    );

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();
