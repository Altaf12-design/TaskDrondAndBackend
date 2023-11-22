const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const db = require("./models");
const config = require("./config/db.config");
const userRoutes = require("./routes/user.routes");
const loginRoute = require("./routes/login.routes");
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoutes);
app.use(loginRoute);
mongoose
  .connect("mongodb+srv://azhaan:azhaan123@cluster0.tt9fmfb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
