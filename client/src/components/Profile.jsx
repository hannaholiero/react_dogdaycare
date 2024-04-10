import React from "react";
import { useDogs } from "../DogContext";
import Card from "./Card";
import "./index.css"; // Importera din CSS-fil här

const Profile = () => {
  const { dogs, isLoading, removeDogProfile, addFriend, removeFriend } =
    useDogs();
  const [selectedFriendId, setSelectedFriendId] = useState("");

  // Hanterar borttagning av hundprofil
  const handleRemove = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
      removeDogProfile(id);
    }
  };

  if (isLoading) {
    // Visar laddningstext medan data laddas
    return <div>Laddar...</div>;
  }

  return (
    <div className="cardsWrapper">
      {dogs.map((dog) => (
        <Card
          key={dog._id}
          dog={dog}
          dogs={dogs} // Här skickar vi ner dogs-arrayen som en prop till Card
          onRemove={handleRemove} // Använder den definierade funktionen för att hantera borttagning
          addFriend={addFriend}
          removeFriend={removeFriend}
        />
      ))}
    </div>
  );
};

export default Profile;
