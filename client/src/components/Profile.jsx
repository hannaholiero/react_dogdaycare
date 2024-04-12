import React, { useContext, useEffect } from "react";
import { DogContext } from "../DogContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./index.css";

const Profile = () => {
  const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
    useContext(DogContext);
  const navigate = useNavigate();
  console.log("profile-sida");
  useEffect(() => {
    if (dogs.length === 0) {
      fetchAllDogs();
    }
  }, [fetchAllDogs]);

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
          <Card
            key={dog._id}
            dog={dog}
            onDelete={() => removeDogProfile(dog._id)}
            onEdit={handleEdit}
            friends={dogs.filter((d) => dog.friends.includes(d._id))}
          />
        ))
      ) : (
        <p>Inga hundar att visa</p>
      )}
    </div>
  );
};

export default Profile;

// import React, { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css";
// import axios from "axios";

// const Profile = () => {
//   const {
//     dog,
//     dogs,
//     isLoading,
//     fetchDogById,
//     fetchAllDogs,
//     removeDogProfile,
//     updateDogProfile,
//   } = useContext(DogContext);
//   console.log(dog);
//   useEffect(() => {
//     if (dogs.length === 0) {
//       fetchAllDogs();
//     }
//   }, [fetchAllDogs, dogs.length]);

//   useEffect(() => {
//     (async () => {
//       await fetchDogById(_id);
//     })();
//   }, [dog._id]);

//   // const handleEdit = (id) => {

//   // }

//   if (isLoading) {
//     return <div>Laddar...</div>;
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => {
//           const friends = dogs.filter(
//             (d) => dog.friends && dog.friends.includes(d._id)
//           );
//           return (
//             <Card
//               key={dog._id}
//               dog={dog}
//               onDelete={() => removeDogProfile(dog._id)}
//               onEdit={updateDogProfile}
//               friends={friends}
//             />
//           );
//         })
//       ) : (
//         <p>Inga hundar att visa</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "../index.css";

// const Profile = () => {
//   const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
//     useContext(DogContext);

//   useEffect(() => {
//     if (dogs.length === 0) {
//       fetchAllDogs();
//     }
//   }, [fetchAllDogs, dogs.length]);

//   const [expandedId, setExpandedId] = useState(null);

//   const handleToggle = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading && dogs.length === 0) {
//     return <div>Laddar...</div>;
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => {
//           const friends = dogs.filter((d) => dog.friends.includes(d._id));
//           return (
//             <Card
//               key={dog._id}
//               dog={dog}
//               onToggle={handleToggle}
//               onDelete={handleRemove}
//               isExpanded={expandedId === dog._id}
//               friends={friends}
//             />
//           );
//         })
//       ) : (
//         <p>Inga hundar att visa</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css"; // Kontrollera att denna fil finns och innehåller nödvändiga stilar

// const Profile = () => {
//   const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
//     useContext(DogContext);

//   useEffect(() => {
//     fetchAllDogs(); // Hämta alla hundar när komponenten laddas
//   }, [fetchAllDogs]);

//   const [expandedId, setExpandedId] = useState(null);

//   const handleToggle = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading) {
//     return <div>Laddar...</div>; // Visar laddningstext medan data laddas
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => (
//           <Card
//             key={dog._id}
//             dog={dog}
//             dogs={dogs} // Skicka hela listan av hundar för att hantera vänner
//             isExpanded={expandedId === dog._id}
//             onToggle={() => handleToggle(dog._id)}
//             onRemove={() => handleRemove(dog._id)}
//           />
//         ))
//       ) : (
//         <p>Inga hundar att visa</p> // Visa detta meddelande om det inte finns några hundar att visa
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css"; // Kontrollera att denna fil finns och innehåller nödvändiga stilar

// const Profile = () => {
//   const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
//     useContext(DogContext);

//   useEffect(() => {
//     fetchAllDogs(); // Hämta alla hundar när komponenten laddas
//   }, [fetchAllDogs]);

//   const [expandedId, setExpandedId] = useState(null);

//   const handleToggle = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading) {
//     return <div>Laddar...</div>; // Visar laddningstext medan data laddas
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => (
//           <Card
//             key={dog._id}
//             dog={dog}
//             isExpanded={expandedId === dog._id}
//             onToggle={() => handleToggle(dog._id)}
//             onRemove={() => handleRemove(dog._id)}
//           />
//         ))
//       ) : (
//         <p>Inga hundar att visa</p> // Visa detta meddelande om det inte finns några hundar att visa
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css"; // Se till att denna fil finns och innehåller nödvändiga stilar

// const Profile = () => {
//   const { dogs, isLoading, fetchAllDogs, removeDogProfile } =
//     useContext(DogContext);

//   const [expandedId, setExpandedId] = useState(null);

//   useEffect(() => {
//     fetchAllDogs(); // Hämta alla hundar när komponenten laddas
//   }, [fetchAllDogs]);

//   const handleToggle = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading) {
//     return <div>Laddar...</div>; // Visar laddningstext medan data laddas
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => (
//           <Card
//             key={dog._id}
//             dog={dog}
//             isExpanded={expandedId === dog._id}
//             onToggle={() => handleToggle(dog._id)}
//             onRemove={() => handleRemove(dog._id)}
//           />
//         ))
//       ) : (
//         <p>Inga hundar att visa</p> // Visa detta meddelande om det inte finns några hundar att visa
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useContext, useState } from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css"; // Se till att denna fil finns och innehåller nödvändiga stilar

// const Profile = ({ dogs }) => {
//   // Använd useContext för att få tillgång till din DogContext
//   const { isLoading, fetchAllDogs, removeDogProfile } = useContext(DogContext);

//   const [expandedId, setExpandedId] = useState(null);

//   const handleToggle = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading) {
//     // Visar laddningstext medan data laddas
//     return <div>Laddar...</div>;
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.length > 0 ? (
//         dogs.map((dog) => (
//           <Card
//             key={dog._id}
//             dog={dog}
//             isExpanded={expandedId === dog._id}
//             onToggle={() => handleToggle(dog._id)}
//             onRemove={() => handleRemove(dog._id)}
//           />
//         ))
//       ) : (
//         <p>Inga hundar att visa</p> // Visa detta meddelande om det inte finns några hundar att visa
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React from "react";
// import { DogContext } from "../DogContext";
// import Card from "./Card";
// import "./index.css"; // Se till att denna fil finns och innehåller nödvändiga stilar

// const Profile = () => {
//   // Hämta funktioner och tillstånd från din DogContext med useDogs-hook
//   const { dogs, isLoading, removeDogProfile, addFriend, removeFriend } =
//     DogContext();

//   // Hanterar borttagning av hundprofil
//   const handleRemove = (id) => {
//     if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
//       removeDogProfile(id);
//     }
//   };

//   if (isLoading) {
//     // Visar laddningstext medan data laddas
//     return <div>Laddar...</div>;
//   }

//   return (
//     <div className="cardsWrapper">
//       {dogs.map((dog) => (
//         <Card
//           key={dog._id}
//           dog={dog}
//           dogs={dogs} // Här skickar vi ner dogs-arrayen som en prop till Card
//           onRemove={handleRemove} // Använder den definierade funktionen för att hantera borttagning
//           addFriend={addFriend}
//           removeFriend={removeFriend}
//         />
//       ))}
//     </div>
//   );
// };

// export default Profile;
