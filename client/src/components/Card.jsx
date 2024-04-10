import React, { useState } from "react";
import { useDogs } from "../DogContext";
import "./index.css";

const Card = ({ dog, dogs, onRemove, addFriend }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");

  // Toggle funktion för att expandera/minimera kort
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Hanterar ändring i select för att välja en vän
  const handleSelectChange = (e) => {
    e.stopPropagation(); // Stoppar event bubbling
    setSelectedFriendId(e.target.value);
  };

  const handleAddFriend = async () => {
    if (selectedFriendId) {
      try {
        await addFriend(dog._id, selectedFriendId);
        setSelectedFriendId(""); // Återställer dropdown
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  return (
    <div className="cardWrapper">
      {/* Klickbar rubrik för att expandera/minimera kortet */}
      <div className="cardHeader" onClick={toggleExpand}>
        <img
          src={dog.imageUrl || "default-dog-image.jpg"}
          alt={dog.firstname}
          className="cardImg"
        />
        <div className="dogName">{dog.firstname}</div>
      </div>
      <div className={`cardInfo ${isExpanded ? "show" : ""}`}>
        <div>
          Ålder:{" "}
          {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
        </div>
        <div>Kön: {dog.gender}</div>
        <div>Favoritsnack: {dog.favoriteSnack || "Inget"}</div>
        <div>Kastrerad: {dog.isNeutered ? "Ja" : "Nej"}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(dog._id);
          }}
        >
          Ta bort
        </button>
        <select
          onChange={handleSelectChange}
          value={selectedFriendId}
          onClick={(e) => e.stopPropagation()}
        >
          <option disabled value="">
            Välj en vän...
          </option>
          {dogs
            .filter((d) => d._id !== dog._id)
            .map((friend) => (
              <option key={friend._id} value={friend._id}>
                {friend.firstname}
              </option>
            ))}
        </select>
        <button onClick={handleAddFriend}>Lägg till vän</button>
      </div>
    </div>
  );
};

export default Card;
