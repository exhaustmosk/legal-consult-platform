const User = require('../models/User');

// Hardcoded admin
const admin = {
  email: 'admin1@example.com',
  password: 'adminpass',
  type: 'admin'
};

const loginUser = async (req, res) => {
  const { email, password, type } = req.body;

  // 👉 If logging in as admin
  if (type === 'admin') {
    if (email === admin.email && password === admin.password) {
      return res.json({ success: true, email, type: 'admin' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  }

  // 👉 Else login as user from DB
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (foundUser.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    return res.json({ success: true, email: foundUser.email, type: 'user' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { loginUser };
