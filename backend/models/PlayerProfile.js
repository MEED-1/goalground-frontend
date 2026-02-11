const mongoose = require("mongoose");

const playerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      enum: ["GK", "DEF", "MID", "ATT"],
    },
    subPosition: { type: String },
    preferredFoot: {
      type: String,
      enum: ["left", "right", "both"],
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    stats: {
      matchesPlayed: { type: Number, default: 0 },
      avgRating: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      cleanSheets: { type: Number, default: 0 },
    },
    attributeAverages: {
      reflexes: { type: Number, default: 0 },
      speed: { type: Number, default: 0 },
      passing: { type: Number, default: 0 },
      shooting: { type: Number, default: 0 },
      dribbling: { type: Number, default: 0 },
      defense: { type: Number, default: 0 },
      physical: { type: Number, default: 0 },
    },
    availability: [
      {
        day: { type: String },
        timeSlots: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerProfile", playerProfileSchema);
