import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productsRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import emailRoute from "./routes/emailRoute.js";

const PORT = process.env.PORT || 5000;

const mongoDBUrl = process.env.MONGODB_URL || 
  "mongodb+srv://pujithkumar16:sudhakar49@tastycorner.s42s1yd.mongodb.net/tastycorner?retryWrites=true&w=majority&appName=tastycorner";

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Routes
app.use("/user", userRouter);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/confirm",emailRoute);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Database Connection and Server Start
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("App Connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
