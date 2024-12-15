const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute");
const orderRouter = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path')


const _dirname = path.resolve();
const port = process.env.PORT || 5000;
const mongo_url = `${process.env.mongo_uri}`;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/order", orderRouter);

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("MongoDB Connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("could not connect to MongoDB because...");
    console.log(error);
  }
};

connectDB();
