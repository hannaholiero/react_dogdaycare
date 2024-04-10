import React, { useState } from "react";
import { useDogs } from "../DogContext";
import "./index.css";

const Card = ({ dog, dogs, onRemove, addFriend }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");

  // Toggle funktion för att expandera/minimera kort
  const toggleExpand = (e) => {
    // Förhindrar att event bubblar vid klick inuti kortet
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Hanterar ändring i select för att välja en vän
  const handleSelectChange = (e) => {
    e.stopPropagation(); // Stoppar event bubbling
    setSelectedFriendId(e.target.value);
  };

  // Hanterar klick för att lägga till en vän baserat på valt vän-ID
  const handleAddFriendClick = (e) => {
    e.stopPropagation(); // Stoppar event bubbling
    if (selectedFriendId) {
      addFriend(dog._id, selectedFriendId);
      setSelectedFriendId("");
    }
  };
  const handleAddFriend = (e) => {
    if (selectedFriendId) {
      addFriend(dog._id, selectedFriendId);
      setSelectedFriendId(""); // Återställer dropdown efter lyckat tillägg
    }
  };

  return (
    <div className="cardWrapper" onClick={toggleExpand}>
      <img
        src={dog.imageUrl || "default-dog-image.jpg"}
        alt={dog.firstname}
        className="cardImg"
      />
      <div className="dogName">{dog.firstname}</div>
      <div className={`cardInfo ${isExpanded ? "show" : ""}`}>
        {/* Kortinformation här */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Förhindrar bubbling till cardWrapper
            onRemove(dog._id);
          }}
        >
          Ta bort
        </button>
        <select
          onChange={(e) => setSelectedFriendId(e.target.value)}
          value={selectedFriendId}
        >
          <option disabled value="">
            Välj en vän...
          </option>
          {/* Rendera vän-optioner här */}
        </select>
        <button onClick={handleAddFriend}>Lägg till vän</button>
      </div>
    </div>
  );
};

export default Card;
