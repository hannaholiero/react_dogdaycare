import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const DogContext = createContext();

export const DogProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllDogs();
  }, []);

  const fetchAllDogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/dogs/");
      setDogs(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDogImage = async () => {
    try {
      const { data } = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      return data.message;
    } catch (error) {
      console.error("Error fetching dog image:", error);
      return "";
    }
  };

  const fetchDogById = async (id) => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/dogs/${id}`);
      setDog(data);
      return data;
    } catch (error) {
      console.error("Error fetching dog by id:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const addDogProfile = async (dogData) => {
    try {
      const imageUrl = await fetchDogImage();
      const { data: newDog } = await axios.post("/api/dogs", {
        ...dogData,
        imageUrl,
      });
      setDogs((prevDogs) => [...prevDogs, newDog]);
      fetchAllDogs();
      console.log(dogData);
    } catch (error) {
      console.error("Error adding dog profile:", error);
    }
  };

  const removeDogProfile = async (id) => {
    try {
      await axios.delete(`/api/dogs/${id}`);
      setDogs((prev) => prev.filter((dog) => dog._id !== id));
      alert("Profilen borttagen!");
      fetchAllDogs();
    } catch (error) {
      console.error("Error removing dog profile:", error);
    }
  };

  const updateDogProfile = async (id, dogData) => {
    try {
      const response = await axios.patch(`/api/dogs/${id}`, dogData);
      if (response.data) {
        setDogs(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error updating dog profile:", error);
    }
  };

  return (
    <DogContext.Provider
      value={{
        dog,
        dogs,
        friends,
        isLoading,
        fetchAllDogs,
        fetchDogImage,
        fetchDogById,
        addDogProfile,
        removeDogProfile,
        updateDogProfile,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export { DogContext };
