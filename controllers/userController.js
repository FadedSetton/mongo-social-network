const { User, Thought } = require('../models');

module.exports = {

    async getUsers (req, res) {
        try {
            const users = await User.find().populate('friends').populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser (req, res) {
        try{
            const user = await User.findById(req.params.userId)
            .populate('friends')
            .populate('thoughts')

            if (!user) return res.status(404).json({ message: 'No user found with that ID' });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try{
            const user = await User.create(req.body)
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try{
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true, runValidators: true }
            )

            if (!user) return res.status(404).json({ message: 'No user found with that ID' });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
          const user = await User.findByIdAndDelete(req.params.userId);
    
          if (!user) return res.status(404).json({ message: 'No user with that ID' });
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
    
          res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

    async addFriend(req, res) {
        try {
          const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          );
    
          if (!user) return res.status(404).json({ message: 'No user with that ID' });
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async removeFriend (req, res) {
        try{
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )

            if (!user) return res.status(404).json({ message: 'No user with that ID' });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
      },

}