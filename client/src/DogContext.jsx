import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Glöm inte att installera axios med npm eller yarn

const DogContext = createContext();

export const useDogs = () => useContext(DogContext);

export const DogProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/dogs");
        setDogs(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const fetchDogImage = async () => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      console.log(response.data.message);
      console.log(response);
      return response.data.message;
      // Returnera URL för slumpmässig hundbild
    } catch (error) {
      console.error("Error fetching dog image:", error);
      return ""; // Returnera tom sträng vid fel
    }
  };

  const addDogProfile = async (dogData) => {
    try {
      const imageUrl = await fetchDogImage();
      console.log(imageUrl); // Hämta en bild för hunden
      const newDogData = { ...dogData, imageUrl };
      console.log(newDogData);
      const response = await axios.post("/api/dogs", newDogData);
      if (response.data) {
        setDogs((prevDogs) => [...prevDogs, response.data]);
      }
    } catch (error) {
      console.error("Error adding dog profile:", error);
    }
  };
  const addFriend = async (dogId, friendId) => {
    try {
      const response = await axios.put(`/api/dogs/${id}/friends/${friendId}`);
      // Efter att vän har lagts till, du kan antingen hämta hundarna på nytt eller uppdatera state lokalt
      console.log("Vän tillagd:", response.data);
      // Här kan du välja att uppdatera din lokala state eller göra en ny fetch för att hämta uppdaterade data
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const removeFriend = async (id, friendId) => {
    try {
      const response = await axios.delete(
        `/api/dogs/${id}/friends/${friendId}`
      );
      // Hantera svaret här
      console.log("Vän borttagen", response.data);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const removeDogProfile = async (id) => {
    try {
      await axios.delete(`/api/dogs/${id}`);
      setDogs((prevDogs) => prevDogs.filter((dog) => dog._id !== id));
    } catch (error) {
      console.error("Error removing dog profile:", error);
    }
  };

  const updateDogProfile = async (id, dogData) => {
    try {
      const response = await axios.patch(`/api/dogs/${id}`, dogData);
      if (response.data) {
        setDogs(
          dogs.map((dog) =>
            dog._id === id ? { ...dog, ...response.data } : dog
          )
        );
      }
    } catch (error) {
      console.error("Error updating dog profile:", error);
    }
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        isLoading,
        addDogProfile,
        removeDogProfile,
        updateDogProfile,
        fetchDogImage,
        addFriend,
        removeFriend, // Tillhandahåller funktionen om du vill använda den direkt i komponenter
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
