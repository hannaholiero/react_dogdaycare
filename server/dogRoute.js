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

    const newDog = new Dog({ ...dogDetails });
    const savedDog = await newDog.save();

    // Uppdatera vänlistan för varje specificerad vän
    const friendUpdates = friends.map((friendId) =>
      Dog.findByIdAndUpdate(
        friendId,
        { $addToSet: { friends: savedDog._id } },
        { new: true }
      )
    );
    await Promise.all(friendUpdates); // Väntar på att alla vänuppdateringar ska slutföras

    res.status(201).json(savedDog);
  } catch (error) {
    console.error("Error adding dog profile:", error);
    res.status(400).json({ message: error.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const newDog = new Dog(req.body);
//     const savedDog = await newDog.save();
//     res.status(201).json(savedDog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

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

// Update a dog's information

router.patch("/:id", async (req, res) => {
  //const { friends, ...updateData } = req.body;
  const updateData = req.body;
  const friends = updateData.friends;
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("friends");

    // Uppdatera vänskapsrelationer om de skickas med i begäran
    if (friends) {
      // Ta bort nuvarande hund från alla tidigare vänlistor
      await Dog.updateMany(
        { friends: req.params.id },
        { $pull: { friends: req.params.id } }
      );

      // Lägg till nuvarande hund i nya vänlistor
      await Dog.updateMany(
        { _id: { $in: friends } },
        { $addToSet: { friends: req.params.id } }
      );
    }

    // Återskapa den uppdaterade listan av hundar
    const dogs = await Dog.find().populate("friends");
    res.json(dogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedDog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // PUT /api/dogs/:dogId/friends/:friendId
// // Lägger till en vän
// router.put("/:id/:friendId/friends", async (req, res) => {
//   try {
//     const { id, friendId } = req.params;

//     // Lägg till friendId till dogId:s vänlista
//     const dog = await Dog.findByIdAndUpdate(
//       id,
//       { $addToSet: { friends: friendId } }, // Använd $addToSet för att undvika dubbletter
//       { new: true }
//     ).populate("friends");

//     // Lägg till dogId till friendId:s vänlista
//     const friend = await Dog.findByIdAndUpdate(
//       friendId,
//       { $addToSet: { friends: id } }, // Använd $addToSet för att undvika dubbletter
//       { new: true }
//     );

//     if (!dog || !friend) {
//       return res.status(404).json({ message: "Hund inte hittad" });
//     }

//     res.status(200).json({ dog, friend });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:id/friends/:friendId", async (req, res) => {
//   try {
//     const { id, friendId } = req.params;

//     // Ta bort friendId från dogId:s vänlista
//     await Dog.findByIdAndUpdate(
//       id,
//       { $pull: { friends: friendId } },
//       { new: true }
//     );

//     // Ta bort dogId från friendId:s vänlista
//     await Dog.findByIdAndUpdate(
//       friendId,
//       { $pull: { friends: id } },
//       { new: true }
//     );

//     res.status(200).json({ message: "Vän borttagen" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
