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
      // setDog(data);
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
      // Nu, uppdatera varje vald väns vänlista för att inkludera den nya hunden
      // const friendUpdates = dogData.friends.map((friendId) =>
      //   axios.put(`/api/dogs/${friendId}/friends`, { friendId: newDog._id })
      // );
      // // Vänta tills alla vänuppdateringar är klara
      // await Promise.all(friendUpdates);

      // setFriends((prevFriends) => [...prevFriends, data]);
    } catch (error) {
      console.error("Error adding dog profile:", error);
    }
  };

  const removeDogProfile = async (id) => {
    try {
      await axios.delete(`/api/dogs/${id}`);
      setDogs((prev) => prev.filter((dog) => dog._id !== id));
      fetchAllDogs();
    } catch (error) {
      console.error("Error removing dog profile:", error);
    }
  };

  // const addFriend = async (dogId, friendId) => {
  //   try {
  //     await axios.put(`/api/dogs/${dogId}/friends`, { friendId });
  //     fetchAllDogs(); // Refresh data
  //   } catch (error) {
  //     console.error("Error adding friend:", error);
  //   }
  // };

  // const removeFriend = async (dogId, friendId) => {
  //   try {
  //     await axios.delete(`/api/dogs/${dogId}/friends/${friendId}`);
  //     fetchAllDogs(); // Refresh data
  //   } catch (error) {
  //     console.error("Error removing friend:", error);
  //   }
  // };
  const updateDogProfile = async (id, dogData) => {
    try {
      const response = await axios.patch(`/api/dogs/${id}`, dogData);
      if (response.data) {
        setDogs(response.data);
        return response.data; // Returnera den uppdaterade hunden för vidare användning
      }
    } catch (error) {
      console.error("Error updating dog profile:", error);
    }
  };
  // Add more functions as needed

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

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const DogContext = createContext();

// export const useDogs = () => useContext(DogContext);

// export const DogProvider = ({ children }) => {
//   const [dogs, setDogs] = useState([]);
//   const [dog, setDog] = useState({});
//   const [dogImage, setDogImage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchAllDogs = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("/api/dogs");
//       setDogs(response.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchAllDogs();
//   }, []);

//   const fetchDogImage = async () => {
//     try {
//       const response = await axios.get(
//         "https://dog.ceo/api/breeds/image/random"
//       );
//       setDogImage(response.data.message);
//       return response.data.message;
//     } catch (error) {
//       console.error("Error fetching dog image:", error);
//       return "";
//     }
//   };

//   const fetchDogById = async (id) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`/api/dogs/${id}`);
//       setDog(response.data);
//     } catch (error) {
//       console.error("Error fetching dog by id:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addDogProfile = async (dogData) => {
//     const imageUrl = await fetchDogImage();
//     const newDogData = { ...dogData, imageUrl };
//     try {
//       const response = await axios.post("/api/dogs", newDogData);
//       setDogs((prevDogs) => [...prevDogs, response.data]);
//     } catch (error) {
//       console.error("Error adding dog profile:", error);
//     }
//   };

//   const addFriend = async (id, friendId) => {
//     try {
//       const response = await axios.put(`/api/dogs/${id}/friends/${friendId}`);
//       // Logik för att hantera vänskapsrelationer här
//     } catch (error) {
//       console.error("Error adding friend:", error);
//     }
//   };

//   const removeFriend = async (id, friendId) => {
//     try {
//       await axios.delete(`/api/dogs/${id}/friends/${friendId}`);
//       // Uppdatera state/logik för att hantera borttagning av vänner
//     } catch (error) {
//       console.error("Error removing friend:", error);
//     }
//   };
//     const removeDogProfile = async (id) => {
//       console.log(id);
//       try {
//         await axios.delete(`/api/dogs/${id}`);
//         setDogs((prevDogs) => prevDogs.filter((dog) => dog._id !== id));
//       } catch (error) {
//         console.error("Error removing dog profile:", error);
//       }
//     };

//   const updateDogProfile = async (id, dogData) => {
//     try {
//       const response = await axios.patch(`/api/dogs/${id}`, dogData);
//       setDogs((prevDogs) =>
//         prevDogs.map((dog) =>
//           dog._id === id ? { ...dog, ...response.data } : dog
//         )
//       );
//     } catch (error) {
//       console.error("Error updating dog profile:", error);
//     }
//   };

//   return (
//     <DogContext.Provider
//       value={{
//         dog,
//         dogs,
//         dogImage,
//         isLoading,
//         fetchAllDogs,
//         fetchDogById,
//         addDogProfile,
//         removeDogProfile,
//         updateDogProfile,
//         fetchDogImage,
//         addFriend,
//         removeFriend,
//       }}
//     >
//       {children}
//     </DogContext.Provider>
//   );
// };
// export { DogContext };
