import React from "react";
import "./index.css";

const Card = ({ dog, onDelete, onEdit, friends }) => {
  const handleDelete = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna hund?")) {
      onDelete(id);
    }
  };
  return (
    <div className="cardWrapper">
      <div className="cardHeader">
        <img
          src={dog.imageUrl || "default-dog-image.jpg"}
          alt={dog.firstname}
          className="cardImg"
        />
        <div className="dog-title">{dog.firstname || "Inget namn"}</div>
      </div>
      <div className="cardInfo">
        <p>
          Ålder:{" "}
          {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
        </p>
        <p>Kön: {dog.gender}</p>
        <p>Favvosnacks: {dog.favoriteSnack || "Inget"}</p>
        <p>Kastrerad: {dog.isNeutered ? "Ja" : "Nej"}</p>
        <p>Beskrivning: {dog.description || "Ingen beskrivning"}</p>
        {/* <button onClick={() => onDelete(dog._id)} className="delete-button">
          Ta bort
        </button> */}
        <button onClick={() => handleDelete(dog._id)} className="delete-button">
          Ta bort
        </button>
        <button className="edit-button" onClick={() => onEdit(dog._id)}>
          Redigera
        </button>
        <div className="friends-area">
          <h4>{dog.firstname}'s vänner</h4>
          {friends.length > 0 ? (
            <ul>
              {friends.map(
                (friend) =>
                  friend._id && <li key={friend._id}>{friend.firstname}</li>
              )}
            </ul>
          ) : (
            // <ul>
            //   {friends.map((friend) => (
            //     <li key={friend._id}>{friend.firstname}</li>
            //   ))}
            // </ul>
            <p>Inga vänner listade.</p>
          )}
          {/* <h4>{dog.firstname}'s vänner</h4>
          <ul>
            {friends.map((friend) => (
              <li key={friend._id}>{friend.firstname}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Card;

// import React from "react";
// import "./index.css"; // Kontrollera att denna fil finns och innehåller nödvändiga stilar
// import axios from "axios";
// const Card = ({ dog, onDelete, onEdit, friends }) => {
//   return (
//     <div className="cardWrapper">
//       <div className="cardHeader">
//         <img
//           src={dog.imageUrl || "default-dog-image.jpg"}
//           alt={dog.firstname}
//           className="cardImg"
//         />
//         <div className="dog-title">{dog.firstname || "inget"}</div>
//       </div>
//       <div className="cardInfo">
//         {/* Information om hunden */}
//         <p>
//           Ålder:{" "}
//           {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
//         </p>
//         <p>Kön: {dog.gender}</p>
//         <p>Favvosnacks: {dog.favoriteSnack || "Inget"}</p>
//         <p>Kastrerad: {dog.isNeutered ? "Ja" : "Nej"}</p>
//         <p>Kastrerad: {dog.description || "inget"}</p>

//         <button onClick={() => onDelete(dog._id)} className="delete-button">
//           Ta bort
//         </button>

//         <button
//           className="edit-button"
//           onClick={(e) => {
//             onEdit(dog.id);
//           }}
//         >
//           Edit
//         </button>
//         <div className="friends-area">
//           <h4>{dog.firstname}'s vänner</h4>
//           <ul>
//             {friends.map((friend) => (
//               // Antag att `friend.id` är unikt för varje vän
//               <li key={friend.id}>{friend.firstname}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

// import React from "react";
// import "../index.css"; // Kontrollera att denna fil finns och innehåller nödvändiga stilar

// const Card = ({ dog, onToggle, onDelete, isExpanded, friends }) => {
//   return (
//     <div className="cardWrapper" onClick={() => onToggle(dog._id)}>
//       <div className="cardHeader">
//         <img
//           src={dog.imageUrl || "default-dog-image.jpg"}
//           alt={dog.firstname}
//           className="cardImg"
//         />
//         <div className="dog-title">{dog.firstname}</div>
//       </div>

//       {isExpanded && (
//         <div className="cardInfo">
//           <table className="text">
//             <tbody>
//               <tr>
//                 <th>Ålder</th>
//                 <td>
//                   {new Date().getFullYear() -
//                     new Date(dog.birthday).getFullYear()}{" "}
//                   år
//                 </td>
//               </tr>
//               <tr>
//                 <th>Kön</th>
//                 <td>{dog.gender}</td>
//               </tr>
//               <tr>
//                 <th>Favvosnacks</th>
//                 <td>{dog.favoriteSnack || "Inget"}</td>
//               </tr>
//               <tr>
//                 <th>Kastrerad</th>
//                 <td>{dog.isNeutered ? "Ja" : "Nej"}</td>
//               </tr>
//             </tbody>
//           </table>
//           <button
//             className="delete-button"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(dog._id);
//             }}
//           >
//             Ta bort
//           </button>
//           <div className="friends-area">
//             <h4 className="form-label">{dog.firstname}'s vänner</h4>
//             <ul className="friends-list">
//               {friends.map((friend) => (
//                 <li className="form-label" key={friend._id}>
//                   {friend.firstname}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

// import React from "react";
// import "./index.css"; // Kontrollera att denna fil finns och innehåller nödvändiga stilar

// const Card = ({ dog, dogs, isExpanded, onToggle, onRemove }) => {
//   const friends = dogs.filter(
//     (d) => dog.friends && dog.friends.includes(d._id)
//   );

//   return (
//     <div className="cardWrapper" onClick={onToggle}>
//       <div className="cardHeader">
//         <img
//           src={dog.imageUrl || "default-dog-image.jpg"}
//           alt={dog.firstname}
//           className="cardImg"
//         />
//         <div className="dog-title">{dog.firstname}</div>
//       </div>

//       {isExpanded && (
//         <div className="cardInfo">
//           <table className="text">
//             <tbody>
//               <tr>
//                 <th>Ålder</th>
//                 <td>
//                   {new Date().getFullYear() -
//                     new Date(dog.birthday).getFullYear()}{" "}
//                   år
//                 </td>
//               </tr>
//               <tr>
//                 <th>Kön</th>
//                 <td>{dog.gender}</td>
//               </tr>
//               <tr>
//                 <th>Favvosnacks</th>
//                 <td>{dog.favoriteSnack || "Inget"}</td>
//               </tr>
//               <tr>
//                 <th>Kastrerad</th>
//                 <td>{dog.isNeutered ? "Ja" : "Nej"}</td>
//               </tr>
//             </tbody>
//           </table>
//           <button
//             className="delete-button"
//             onClick={(e) => {
//               e.stopPropagation(); // Förhindrar att kortet expanderas/minimeras
//               onRemove(dog._id);
//             }}
//           >
//             Ta bort
//           </button>
//           <div className="friends-area">
//             <h4 className="form-label">{dog.firstname}'s vänner</h4>
//             <ul className="friends-list">
//               {friends.map((friend) => (
//                 <li className="form-label" key={friend._id}>
//                   {friend.firstname}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

// import React, { useState } from "react";
// import { useDogs } from "../DogContext";
// import { DogContext } from "../DogContext";
// import "./index.css";

// const Card = ({ dog, dogs, onRemove, addFriend }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFriendId, setSelectedFriendId] = useState("");
//   const friends = dog.friends.map((friendId) =>
//     dogs.find((d) => d._id === friendId)
//   );

//   // Toggle funktion för att expandera/minimera kort
//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   // Hanterar ändring i select för att välja en vän
//   const handleSelectChange = (e) => {
//     e.stopPropagation(); // Stoppar event bubbling
//     setSelectedFriendId(e.target.value);
//   };

//   const handleAddFriend = async () => {
//     if (selectedFriendId) {
//       try {
//         await addFriend(dog._id, selectedFriendId);
//         setSelectedFriendId(""); // Återställer dropdown
//       } catch (error) {
//         console.error("Error adding friend:", error);
//       }
//     }
//   };

//   return (
//     <div className="cardWrapper">
//       {/* Klickbar rubrik för att expandera/minimera kortet */}
//       <div className="cardHeader" onClick={toggleExpand}>
//         <img
//           src={dog.imageUrl || "default-dog-image.jpg"}
//           alt={dog.firstname}
//           className="cardImg"
//         />
//         <div className="dog-title">{dog.firstname}</div>
//       </div>

//       {/* <div>
//           Ålder:{" "}
//           {new Date().getFullYear() - new Date(dog.birthday).getFullYear()} år
//         </div>
//         <div>Kön: {dog.gender}</div>
//         <div>Favoritsnack: {dog.favoriteSnack || "Inget"}</div>
//         <div>Kastrerad: {dog.isNeutered ? "Ja" : "Nej"}</div> */}
//       <div className={`cardInfo ${isExpanded ? "show" : ""}`}>
//         <table className="text">
//           <tbody>
//             <tr>
//               <th>Ålder</th>
//               <td>
//                 {" "}
//                 {new Date().getFullYear() -
//                   new Date(dog.birthday).getFullYear()}{" "}
//                 år
//               </td>
//             </tr>
//             <tr>
//               <th>Kön</th>
//               <td>{dog.gender}</td>
//             </tr>
//             <tr>
//               <th>Favvosnacks</th>
//               <td>{dog.favoriteSnack || "Inget"}</td>
//             </tr>
//             <tr>
//               <th>Kastrerad</th>
//               <td>{dog.isNeutered ? "Ja" : "Nej"}</td>
//             </tr>
//           </tbody>
//         </table>
//         <button
//           className="delete-button"
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove(dog._id);
//           }}
//         >
//           Ta bort
//         </button>

//         <div className="friends-area">
//           <div className="line"></div>
//           <ul className="friends-list">
//             <h4 className="form-label">{dog.firstname}'s vänner</h4>
//             {friends.map(
//               (friend) =>
//                 friend ? (
//                   <li className="form-label" key={friend._id}>
//                     {friend.firstname}
//                   </li>
//                 ) : null // Visa endast om vän finns i `dogs`-listan
//             )}
//           </ul>
//           <div className="line"></div>

//           <select
//             onChange={handleSelectChange}
//             value={selectedFriendId}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <option disabled value="">
//               Välj en vän...
//             </option>
//             {dogs
//               .filter((d) => d._id !== dog._id)
//               .map((friend) => (
//                 <option key={friend._id} value={friend._id}>
//                   {friend.firstname}
//                 </option>
//               ))}
//           </select>
//           <button className="btn hipster" onClick={handleAddFriend}>
//             Lägg till vän
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
