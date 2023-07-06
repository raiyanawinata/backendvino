const express = require('express');
const cors = require('cors');
const { createSignup, postSignin } = require("./controller/SignUp");

const { sequelize } = require("../be/model/Signup");

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

app.post("/signup", createSignup);
app.post("/signup/findOne", postSignin);

// Start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to synchronize models with database', error);
  });
