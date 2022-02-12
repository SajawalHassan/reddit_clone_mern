const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRouter = require("./authentication/auth");
const userRouter = require("./routes/users");
const subredditRouter = require("./routes/subreddit");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

require("dotenv").config();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes middleware
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/subreddits", subredditRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRouter);

// Connect to database
mongoose.connect(process.env.DB_KEY, () =>
  console.log("Connected to database")
);

// Create port and make server listen on port
port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
