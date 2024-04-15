import express from "express";
import Dog from "./dogModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find().populate("friends");

    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new dog
router.post("/", async (req, res) => {
  try {
    const { friends = [], ...dogDetails } = req.body;
    console.log(req.body);
    const newDog = new Dog({ friends, ...dogDetails });
    const savedDog = await newDog.save();

    const friendUpdates = friends.map((friendId) =>
      Dog.findByIdAndUpdate(
        friendId,
        { $addToSet: { friends: savedDog._id } },
        { new: true }
      )
    );
    await Promise.all(friendUpdates);

    res.status(201).json(savedDog);
  } catch (error) {
    console.error("Error adding dog profile:", error);
    res.status(400).json({ message: error.message });
  }
});

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

router.patch("/:id", async (req, res) => {
  const updateData = req.body;
  const friends = updateData.friends;
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("friends");

    if (friends) {
      await Dog.updateMany(
        { friends: req.params.id },
        { $pull: { friends: req.params.id } }
      );

      await Dog.updateMany(
        { _id: { $in: friends } },
        { $addToSet: { friends: req.params.id } }
      );
    }

    const dogs = await Dog.find().populate("friends");
    res.json(dogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
