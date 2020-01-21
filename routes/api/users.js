const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");

//Load authentication middleware
const auth = require("../../middleware/auth");

// @route GET api/users/test
// @description tests cards route
// @access Public
router.get("/test", (req, res) => res.send("testing user route!"));

// @route GET api/users
// @description add/save user
// @access Public
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// @route GET api/users
// @description login user
// @access Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// @route GET api/users/me
// @description Get single user
// @access Private
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

// @route GET api/users/me/logout
// @description Forget single token for user
// @access Private
router.get("/me/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// @route GET api/users/me/logoutall
// @description Forget all tokens for user
// @access Private
router.get("/me/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
