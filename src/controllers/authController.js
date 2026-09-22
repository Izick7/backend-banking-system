const users = require("../data/users");





















const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// Registration controller
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10)



    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: email,
      password: passwordHash,
      balance: 0,
      pin: null

    };

    users.push(newUser);

    res.status(201).json({
      message: "Account registered successfully!"
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    })

  }

};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = users.find(user => user.email === email);

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password)
    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });


  } catch (error) {

  }


}

module.exports = { register, login };

