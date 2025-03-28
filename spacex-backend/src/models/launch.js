import mongoose from "mongoose";

const LaunchSchema = new mongoose.Schema({
  launch_id: {
    type: mongoose.ObjectId,
    required: false,
  },
  rocket_id: {
    type: mongoose.ObjectId,
    required: false,
  },
  launch_details: {
    type: String,
    required: false,
  },
  success: {
    type: Boolean,
    required: false,
  },
  upcoming: {
    type: Boolean,
    required: false,
  },
  article_link: {
    type: String,
    required: false
  },
  launch_date: {
    type: Date,
    required: false,
  },
});

export const Launch = mongoose.model("Launch", LaunchSchema);
