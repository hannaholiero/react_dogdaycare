import React, { useState } from "react";
import { useDogs } from "../DogContext";
import "./index.css";

const Card = ({ dog, dogs, onRemove, addFriend }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");
  const friends = dog.friends.map((friendId) =>
    dogs.find((d) => d._id === friendId)
  );

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
        <div className="dog-title">{dog.firstname}</div>
      </div>

      {/* <div>
          Ålder:{" "}
          {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
        </div>
        <div>Kön: {dog.gender}</div>
        <div>Favoritsnack: {dog.favoriteSnack || "Inget"}</div>
        <div>Kastrerad: {dog.isNeutered ? "Ja" : "Nej"}</div> */}
      <table className={`cardInfo ${isExpanded ? "show" : ""}`}>
        <table className="text">
          <tr>
            <th>Ålder</th>
            <td>
              {" "}
              {new Date().getFullYear() -
                new Date(dog.birthday).getFullYear()}{" "}
              år
            </td>
          </tr>
          <tr>
            <th>Kön</th>
            <td>{dog.gender}</td>
          </tr>
          <tr>
            <th>Favvosnacks</th>
            <td>{dog.favoriteSnack || "Inget"}</td>
          </tr>
          <tr>
            <th>Kastrerad</th>
            <td>{dog.isNeutered ? "Ja" : "Nej"}</td>
          </tr>
        </table>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(dog._id);
          }}
        >
          Ta bort
        </button>

        <div className="friends-area">
          <div className="line"></div>
          <ul className="friends-list">
            <h4 className="form-label">{dog.firstname}'s vänner</h4>
            {friends.map(
              (friend) =>
                friend ? (
                  <li className="form-label" key={friend._id}>
                    {friend.firstname}
                  </li>
                ) : null // Visa endast om vän finns i `dogs`-listan
            )}
          </ul>
          <div className="line"></div>

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
          <button className="btn hipster" onClick={handleAddFriend}>
            Lägg till vän
          </button>
        </div>
      </table>
    </div>
  );
};

export default Card;
