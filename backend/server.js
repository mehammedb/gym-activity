require("dotenv").config();
const express = require("express");
const workouteRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/workouts", workouteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then((s) => {
    console.log(s.ok, " mongoose connected");
  })
  .catch((error) => {
    console.log(error.ok, " mongoose not connected");
  });

app.listen(process.env.PORT || 4000, () => {
  console.log("server is listening on port: " + process.env.PORT);
});
