import mongoose from "mongoose";

const { Schema } = mongoose;

const DogSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  favoriteSnack: String,
  gender: {
    type: String,
    enum: ["hona", "hane"],
    required: true,
  },
  isNeutered: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  isPresent: {
    type: Boolean,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

const Dog = mongoose.model("Dog", DogSchema);

export default Dog;
