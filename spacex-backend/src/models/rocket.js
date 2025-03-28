import mongoose from "mongoose";

const RocketSchema = new mongoose.Schema({
  rocket_id: {
    type: mongoose.ObjectId, 
    required: false,
  },
  rocket_name: {
    type: String,
    required: false,
  },
  rocket_type: {
    type: String,
    required: false,
  },
  cost_each_launch: {
    type: Number,
    required: false,
  },
  success_rate: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  first_flight: {
    type: Date,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  diameter: {
    type: Number,
    required: false,
  },
});

export const Rocket = mongoose.model("Rocket", RocketSchema);
