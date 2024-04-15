import React, { useContext, useEffect } from "react";
import { DogContext } from "../DogContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./index.css";

const Profile = () => {
  const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
    useContext(DogContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dogs.length === 0) {
      fetchAllDogs();
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="cardsWrapper">
      {dogs.length > 0 ? (
        dogs.map((dog) => (
          <div
            key={dog._id}
            className={`cardWrapper ${dog.isPresent ? "green" : ""}`}
          >
            <Card
              key={dog._id}
              dog={dog}
              onHandleProfile={() => navigate(`/profile/${dog._id}`)}
              onDelete={() => removeDogProfile(dog._id)}
              onEdit={() => navigate(`/edit/${dog._id}`)}
              friends={dog.friends || []}
            />
          </div>
        ))
      ) : (
        <p>Inga hundar att visa</p>
      )}
    </div>
  );
};

export default Profile;
