const AccountModel = require("../db/accountSchema");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await AccountModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (password === user.password) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

