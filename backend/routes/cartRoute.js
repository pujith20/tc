import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "MY_SECRET_TOKEN", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Add item to cart
router.post("/add", authenticate, async (req, res) => {
  try {
    const { productId, title, price, rating } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart;
    const item = cart.get(productId);
    if(item){
      item.quantity += 1;
    }
    else{
      cart.set(productId, {quantity: 1,price,title,rating});
    }

    user.cart = cart;
    await user.save();

    console.log("Item added to cart:", { productId, title, price, rating }); // Debug log
    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.log("Error adding item to cart:", err); // Debug log
    res.status(500).json({ error: "Server error" });
  }
});

// Get user cart
router.get("/get-items", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ cart: user.cart });
  } catch (err) {
    console.log("Error fetching cart items:", err); // Debug log
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart;
    const item = cart.get(id);
    if (item) {
      item.quantity = quantity;
      cart.set(id, item);

      user.cart = cart;
      await user.save();

      console.log("Item quantity updated in cart:", { id, quantity }); // Debug log
      res.json({ message: "Item quantity updated in cart" });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (err) {
    console.log("Error updating item quantity in cart:", err); // Debug log
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
router.delete("/remove", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart;
    cart.delete(productId);

    user.cart = cart;
    await user.save();

    console.log("Item removed from cart:", productId); // Debug log
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.log("Error removing item from cart:", err); // Debug log
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
