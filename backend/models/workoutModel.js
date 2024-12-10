const mongoose = require("mongoose");

Schema = mongoose.Schema;

const workoutSchema = Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("workoutModel", workoutSchema);
