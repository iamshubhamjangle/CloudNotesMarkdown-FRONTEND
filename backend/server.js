const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); // To use process.env locally

connectDB();

const app = express();
app.use(express.json()); // To parse incoming json body
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// -------------------------- SERVER STATUS ------------------------------
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use(notFound);
app.use(errorHandler);
app.listen(`${PORT}`, console.log(`Server started on port: ${PORT}`));
