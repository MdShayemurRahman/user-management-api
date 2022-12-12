import { User } from '../model/user.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req._id }).select('-password');
    res.status(200).json(user);
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: 'user was deleted',
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({
      message: 'user was updated',
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
