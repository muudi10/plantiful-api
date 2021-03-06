const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const PlantSchema = new mongoose.Schema(
  {
    plantId: {
      type: String,
     
    },
    latinName: {
      type: String,
      required: true,
      unique: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    humidity: {
      type: String,
      required: true,
    },
    watering: {
      type: String,
      required: true,
    },
    toxicity: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    airPurifyer: {
      type: String,
      required: true,
    },
    childPetSafe: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: false,
    },
    userId: [{ type: Schema.Types.ObjectId, ref: "User"}],
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);