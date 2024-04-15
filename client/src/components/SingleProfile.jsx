import Card from "./Card";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DogContext } from "../DogContext";
import "./index.css";

export default function SingleProfile() {
  const { id } = useParams();
  const { dog, dogs, isLoading, fetchDogById, removeDogProfile } =
    useContext(DogContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDogData = async () => {
      const dogData = await fetchDogById(id);
    };
    loadDogData();
  }, [id]);

  if (isLoading) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="center">
      <div className="profile-card">
        <div className="cardWrapper">
          <Card
            key={dog._id}
            dog={dog}
            onHandleProfile={() => navigate(`/profile/${dog._id}`)}
            onDelete={() => removeDogProfile(dog._id)}
            onEdit={() => navigate(`/edit/${dog._id}`)}
            friends={dog.friends || []}
          />
        </div>
        <div className="flex-center">
          <button className="btn" onClick={() => navigate(`/profile`)}>
            Gå tillbaka
          </button>
        </div>
      </div>
    </div>
  );
}
