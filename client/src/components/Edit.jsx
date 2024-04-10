import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Wrapper from "../wrappers/DogProfileForm";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    birthday: "",
    favoriteSnack: "",
    gender: "",
    isNeutered: false,
  });

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await fetch(`/api/dogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dog data");
        }
        const dog = await response.json();
        setFormData({
          firstname: dog.firstname || "",
          birthday: dog.birthday ? dog.birthday.split("T")[0] : "", // Anpassar datumsformatet
          favoriteSnack: dog.favoriteSnack || "",
          gender: dog.gender || "",
          isNeutered: dog.isNeutered || false,
        });
      } catch (error) {
        console.error("Error fetching dog data:", error);
        alert("Kunde inte ladda hunddata.");
      }
    };

    fetchDog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/dogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update dog");
      }
      alert("Hundprofil uppdaterad!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating dog:", error);
      alert("Kunde inte uppdatera hundprofil.");
    }
  };

  return (
    <>
      <Wrapper>
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
                <option value="female">Hona</option>
                <option value="male">Hane</option>
              </select>
            </div>

            <div className="radio">
              <label htmlFor="isNeutered" className="form-label">
                KASTRERAD?
                <input
                  className="form-checkbox"
                  type="checkbox"
                  name="isNeutered"
                  id="isNeutered"
                  checked={formData.isNeutered}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-block">
            Uppdatera Hund
          </button>
        </form>
      </Wrapper>
    </>
  );
};

export default Edit;
