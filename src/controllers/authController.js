import  {User}  from '../models/User.model.js';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'User registration failed', details: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid password' });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};

