const { Signup } = require("./../model/Signup.js");
const bcrypt = require('bcrypt');

exports.createSignup = async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;

  // Validate password
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  if (!isValidPassword) {
    return res.status(400).json({
      message:
        'Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newSignup = await Signup.create({
      email,
      firstName,
      lastName,
      username,
      password: hashedPassword, // Store the hashed password in the database
    });
    res.json(newSignup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.postSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Signup.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing in' });
  }
};
