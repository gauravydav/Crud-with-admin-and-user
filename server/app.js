const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/registrationRoute");
const loginRouter = require("./routes/loginRoutes");

const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
