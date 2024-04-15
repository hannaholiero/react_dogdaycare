import React from "react";
import "./index.css";
import { useEffect, useState, useContext } from "react";
import { DogContext } from "../DogContext";
import { useNavigate } from "react-router-dom";
import "./index.css";

import { Link } from "react-router-dom";

const Card = ({ dog, onDelete, onHandleProfile, onEdit, friends }) => {
  const { fetchDogById, updateDogProfile } = useContext(DogContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
      onDelete(id);
      navigate("/profile");
    }
  };

  const togglePresent = async () => {
    try {
      dog.isPresent = !dog.isPresent;
      await updateDogProfile(dog._id, dog);
    } catch (error) {}
  };

  return (
    <>
      <div className="cardHeader">
        <img
          src={dog.imageUrl || "default-dog-image.jpg"}
          alt={dog.firstname}
          className="cardImg"
        />
        <div
          style={{ flex: 3 }}
          className="dog-title"
          onClick={() => onHandleProfile(dog._id)}
        >
          <h2 className="dog-title"> {dog.firstname || "Inget namn"}</h2>
        </div>{" "}
        <div className="present" style={{ flex: 1 }}>
          <button
            onClick={togglePresent}
            className={`'btn' ${
              dog.isPresent ? "alert-success" : "alert-danger"
            }`}
          >
            <strong>{dog.isPresent ? "HÄR" : "INTE HÄR"}</strong>
          </button>
        </div>
      </div>

      <div className="cardInfo">
        <div className="card-desc">
          <p>
            <strong> Ålder:</strong>{" "}
            {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
          </p>
          <p>
            <strong>Kön:</strong> {dog.gender}
          </p>
          <p>
            <strong>Favvosnacks:</strong> {dog.favoriteSnack || "Inget"}
          </p>
          <p>
            <strong>Kastrerad:</strong> {dog.isNeutered ? "Ja" : "Nej"}
          </p>
          <p>
            <strong>Beskrivning:</strong>{" "}
            {dog.description || "Ingen beskrivning"}
          </p>
        </div>
        <div className="line"></div>
        <div className="friends-area">
          <h5 className="friends-title">{dog.firstname}'s vänner</h5>
          {friends.length > 0 ? (
            <ul className="friends center">
              {friends.map(
                (friend) =>
                  friend._id && <li key={friend._id}>{friend.firstname}</li>
              )}
            </ul>
          ) : (
            <p>Inga vänner listade.</p>
          )}
        </div>
        <div className="line"></div>
        <div className="card-buttons">
          <button className="edit-button" onClick={() => onEdit(dog._id)}>
            Redigera
          </button>
          <button
            onClick={() => handleDelete(dog._id)}
            className="delete-button"
          >
            Ta bort
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
