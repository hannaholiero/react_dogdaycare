import express from "express";
import Dog from "./dogModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find(); // Use .populate("friends") if you want to include friend details
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new dog
router.post("/", async (req, res) => {
  try {
    const newDog = new Dog(req.body);
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve a dog by ID, including the details of its friends
router.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id).populate("friends");
    if (!dog) {
      res.status(404).json({ message: "Dog not found" });
    } else {
      res.json(dog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a dog by ID
router.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) res.status(404).json({ message: "Dog not found" });
    else res.json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a dog's information
router.patch("/:id", async (req, res) => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/dogs/:dogId/friends/:friendId
// Lägger till en vän
router.put("/:id/friends/:friendId", async (req, res) => {
  try {
    const { dogId, friendId } = req.params;

    // Lägg till friendId till dogId:s vänlista
    const dog = await Dog.findByIdAndUpdate(
      dogId,
      { $addToSet: { friends: friendId } }, // Använd $addToSet för att undvika dubbletter
      { new: true }
    ).populate("friends");

    // Lägg till dogId till friendId:s vänlista
    const friend = await Dog.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: dogId } }, // Använd $addToSet för att undvika dubbletter
      { new: true }
    );

    if (!dog || !friend) {
      return res.status(404).json({ message: "Hund inte hittad" });
    }

    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const { dogId, friendId } = req.params;

    // Ta bort friendId från dogId:s vänlista
    await Dog.findByIdAndUpdate(
      dogId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    // Ta bort dogId från friendId:s vänlista
    await Dog.findByIdAndUpdate(
      friendId,
      { $pull: { friends: dogId } },
      { new: true }
    );

    res.status(200).json({ message: "Vän borttagen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a dog
router.delete("/:id", async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) res.status(404).json({ message: "Dog not found" });
    else res.json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
