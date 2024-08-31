import User from "../models/User.js";

const getUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'No user found' });
    }
    res.status(200).json({
      username: user.username,
      resume: user.resume ? 'Resume available' : 'No resume uploaded'
    });
  } catch (error) {
    next(error);
  }
}

const postUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter a username and password' })
    }
    const user = await User.find({ username: username })
    if (user.length > 0) {
      if (user[0].password !== password)
        res.status(401).json({ msg: 'Wrong password' })
      else
        res.status(200).json({ id: user[0]._id })
    } else {
      const user = await User.create({
        username: username,
        password: password
      })
      res.status(200).json({ id: user._id })
    }
  } catch (error) {
    next(error)
  }
}

export { getUser, postUser }