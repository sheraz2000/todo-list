import User from "../model/userModel.js";

// CREATE USER
export const create = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    // 1. Validate input first
    if (!name || !email || !address) {
      return res.status(400).json({
        message: "Name, email, and address are required",
      });
    }

    // 2. Check if user already exists
    const userexist = await User.findOne({ email });

    if (userexist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. Create user safely
    const newUser = await User.create({
      name,
      email,
      address,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

// GET ALL USERS
export const getallusers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

// GET USER BY ID
export const getuserbyid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

// UPDATE USER
export const update = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};