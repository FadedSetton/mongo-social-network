import { Thought, User } from '../models/index.js';

export async function getThoughts(req, res) {
  try {
    console.log('GET /api/thoughts called');
    const thoughts = await Thought.find();
    console.log('Found thoughts:', thoughts.length);
    res.json(thoughts);
  } catch (err) {
    console.error('Error in getThoughts:', err);
    res.status(500).json({ message: 'Failed to retrieve thoughts', error: err.message });
  }
}

export async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateThought(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteThought(req, res) {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function addReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function removeReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
