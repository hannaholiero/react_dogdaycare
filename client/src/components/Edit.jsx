import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DogContext } from "../DogContext";
import Logo from "./Logo";
// import Wrapper from "../wrappers/DogProfileForm";
import "./index.css";

const Edit = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { dogs, fetchDogById, updateDogProfile } = useContext(DogContext);

  const [formData, setFormData] = useState({
    firstname: "",
    birthday: "",
    favoriteSnack: "",
    gender: "",
    isNeutered: false,
    description: "",
    friends: [],
  });
  console.log("hej");
  useEffect(() => {
    const loadDogData = async () => {
      const dogData = await fetchDogById(id);
      //console.log(dogData);
      if (dogData) {
        setFormData({
          firstname: dogData.firstname || "",
          birthday: dogData.birthday ? dogData.birthday.split("T")[0] : "",
          favoriteSnack: dogData.favoriteSnack || "",
          gender: dogData.gender || "",
          isNeutered: dogData.isNeutered || false,
          description: dogData.description || "",
          friends: dogData.friends.map((friend) => friend._id) || [],
        });
        console.log(formData.friends);
        //console.log(formData.friends.map((friend) => friend._id));
      } else {
        navigate("/profile"); // Redirect if no dogData is fetched
      }
    };
    loadDogData();
  }, [id]);

  const handleFriendToggle = (friendId) => {
    setFormData((prev) => ({
      ...prev,
      friends: prev.friends.includes(friendId)
        ? prev.friends.filter((f) => f !== friendId)
        : [...prev.friends, friendId],
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDogProfile(id, formData);
      alert("Hundprofil uppdaterad!");
      navigate("/profile"); // Navigate back to profile page after update
    } catch (error) {
      console.error("Failed to update dog profile:", error);
      alert("Kunde inte uppdatera hundprofilen.");
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-img">
            <Logo />
          </div>
          <h3 className="form-title">Redigera Hundprofil</h3>
          {/* Repeterande formulärfält som i Create */}
          <div className="form-row">
            <label htmlFor="firstname" className="form-label">
              NAMN
            </label>
            <input
              className="form-input"
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="birthday" className="form-label">
              FÖDELSEDAG
            </label>
            <input
              className="form-input"
              type="date"
              name="birthday"
              id="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="favoriteSnack" className="form-label">
              FAVORITSNACKS
            </label>
            <input
              className="form-input"
              type="text"
              name="favoriteSnack"
              id="favoriteSnack"
              value={formData.favoriteSnack}
              onChange={handleChange}
              placeholder="Ostbågar kanske?"
            />
          </div>

          <div className="radio-row">
            <div className="radio">
              <label htmlFor="gender" className="form-label">
                KÖN
              </label>
              <select
                className="form-select"
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Välj...</option>
                <option value="hona">Hona</option>
                <option value="hane">Hane</option>
              </select>
            </div>

            <div className="radio">
              <label htmlFor="isNeutered" className="form-label">
                KASTRERAD?
                <input
                  type="checkbox"
                  name="isNeutered"
                  id="isNeutered"
                  checked={formData.isNeutered}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="description" className="form-label">
              BESKRIVNING
            </label>
            <input
              className="form-input"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Skriv några rader om hunden?"
            />
          </div>
          <div className="friends-area">
            <h4 className="form-label">Välj vänner:</h4>
            {dogs.map(
              (thisDog) =>
                thisDog._id !== id && ( // Så att hunden inte kan välja sig själv som vän
                  <label key={thisDog._id} className="friendslist">
                    <input
                      type="checkbox"
                      className="friends-checkbox"
                      checked={formData.friends.includes(thisDog._id)}
                      onChange={() => handleFriendToggle(thisDog._id)}
                    />
                    <div className="friends-name">{thisDog.firstname}</div>
                  </label>
                )
            )}
          </div>

          <button type="submit" className="btn btn-block">
            Uppdatera Hund
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
