import { useState } from "react";
import { useDogs } from "../DogContext"; // Importera useDogs hook
import Logo from "./Logo";
import Wrapper from "../wrappers/DogProfileForm";

const Create = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    birthday: "",
    favoriteSnack: "",
    gender: "",
    isNeutered: false,
  });

  const { addDogProfile, fetchDogImage } = useDogs(); // Använd fetchDogImage från context

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await fetchDogImage(); // Hämta bild-URL
    const completeFormData = { ...formData, imageUrl }; // Lägg till imageUrl i formData
    addDogProfile(completeFormData); // Använd den uppdaterade datan med bilden
  };

  return (
    <>
      <Wrapper>
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
                <option value="female">Hona</option>
                <option value="male">Hane</option>
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
          </div>
          <button type="submit" className="btn btn-block">
            Add Dog
          </button>
        </form>
      </Wrapper>
    </>
  );
};

export default Create;
