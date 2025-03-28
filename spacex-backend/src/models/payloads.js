import mongoose from "mongoose";

const PayloadSchema = new mongoose.Schema({
  payload_id: {
    type: mongoose.ObjectId,
    required: false,
  },
  launch_id: {
    type: mongoose.ObjectId,
    required: false,
  },
  payload_name: {
    type: String,
    required: false,
  },
  payload_type: {
    type: String,
    required: false,
  },
  payload_weight: {
    type: Number,
    required: false,
  },
  payload_orbit: {
    type: String,
    required: false,
  },
  is_reused: {
    type: Boolean,
    required: false
  },
  reference_system: {
    type: String,
    required: false,
  },
});

export const Payload = mongoose.model("Payload", PayloadSchema);
