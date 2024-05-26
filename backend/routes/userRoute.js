import express from "express";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
const router = express.Router();

// Get User
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ username });
    if (!foundUser || foundUser.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: foundUser._id }, "MY_SECRET_TOKEN", {
      expiresIn: "1h",
    });

    // Include email in the response
    res.json({ userId: foundUser._id, email: foundUser.gmail, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/add-user", async (req, res) => {
  try {
    const { mail, username, password } = req.body;
    if (!mail.endsWith("@gmail.com") || !username || !password) {
      return res.status(500).send("Send All the required fields");
    }
    const userDetails = {
      gmail: mail,
      username,
      password,
    };
    const newUser = await user.create(userDetails);
    return res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
  }
});

// Update User

router.put("/update/:id", async (req, res) => {
  try {
    const { mail, username, password } = req.body;
    if (!mail || !username || !password) {
      return res.status(500).send("Send All the required fields");
    }
    const updateUser = await user.findByIdAndUpdate(req.params.id, req.body);
    if (!updateUser) {
      return res.status(404).send("User Not Found");
    }
    return res.status(200).send("User updated");
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:"Server error"});
  }
});

export default router;
