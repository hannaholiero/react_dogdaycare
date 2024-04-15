import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DogContext } from "../DogContext"; // Korrekt import av DogContext
import Logo from "./Logo";

const Create = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    birthday: "",
    favoriteSnack: "",
    gender: "",
    isNeutered: false,
    isPresent: false,
    description: "",
    friends: [],
  });
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigate = useNavigate();
  const { addDogProfile, fetchDogImage, dogs, fetchAllDogs } =
    useContext(DogContext);

  useEffect(() => {
    fetchAllDogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCheckboxChange = (event) => {
    console.log("change2");
    const { checked, value } = event.target;
    if (checked) {
      setSelectedFriends((prev) => [...prev, value]);
    } else {
      setSelectedFriends((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await fetchDogImage();
    const completeFormData = {
      ...formData,
      friends: selectedFriends,
      imageUrl,
    };
    try {
      await addDogProfile(completeFormData);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to add dog profile:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-img">
          <Logo />
        </div>

        <h3 className="form-title">Lägg till hund</h3>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            NAMN
          </label>
          <input
            className="form-input"
            type="text"
            name="firstname"
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
            value={formData.favoriteSnack}
            onChange={handleChange}
            placeholder="Ostbågar kanske?"
          />
        </div>
        <div className="radio-row">
          <div className="radio">
            <label htmlFor="gender" className="form-label"></label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">KÖN</option>
              <option value="hona">Hona</option>
              <option value="hane">Hane</option>
            </select>
          </div>
          <div className="radio">
            <label htmlFor="isNeutered" className="form-label">
              KASTRERAD?
              <input
                className="radio"
                type="checkbox"
                name="isNeutered"
                checked={formData.isNeutered}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="radio">
            <label htmlFor="isPresent" className="form-label">
              PÅ PLATS IDAG
              <input
                className="radio"
                type="checkbox"
                name="isPresent"
                checked={formData.isPresent}
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
          <h4 className="form-label">
            <legend>VÄLJ VÄNNER:</legend>
          </h4>
          {dogs.map((friendDog) => (
            <label className="friendslist" key={friendDog._id}>
              <input
                type="checkbox"
                className="friends-checkbox"
                id={friendDog._id}
                value={friendDog._id}
                checked={selectedFriends.includes(friendDog._id)}
                onChange={handleCheckboxChange}
              />
              <div className="friends-name">{friendDog.firstname}</div>
            </label>
          ))}
        </div>

        <button type="submit" className="btn btn-block">
          Lägg till hund
        </button>
      </form>
    </>
  );
};

export default Create;
