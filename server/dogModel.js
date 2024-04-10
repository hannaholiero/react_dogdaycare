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
    enum: ["female", "male"],
    required: true,
  },
  isNeutered: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    // Lägg till detta fält för att spara bild-URL
    type: String,
    required: false, // Inte obligatoriskt om du inte alltid kommer att ha en bild för varje hund
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dog", // Refererar till Dog-modellen
    },
  ],
});

// Kompilera och exportera vår modell med ovanstående definition.
const Dog = mongoose.model("Dog", DogSchema);

export default Dog;
