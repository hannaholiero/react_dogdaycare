import styled from "styled-components";

export const CardWrapper = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-3);
  padding: 2rem; /* Lite utrymme runt innehållet */

  margin-bottom: 1rem; /* Marginal under kortet */
  transition: all 0.3s ease; /* En mjuk övergång för :hover-effekt */
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Större skugga på hover */
  }
`;

export const CardImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%; /* Cirkulär form */
  width: 80px; /* Storleken på avataren */
  height: 80px; /* Storleken på avataren */
  border: 2px solid #d3a588; /* Mörkare beige för cirkelns ram */
  margin: 0 auto; /* Centrera avataren i CardWrapper */
  img {
    width: 100%; /* Fyll cirkeln */
    height: 100%; /* Fyll cirkeln */
    object-fit: cover; /* Täck området utan att sträcka bilden */
  }
`;
const CardInfo = styled.div.attrs((props) => ({
  style: {
    display: props.$isExpanded ? "block" : "none",
    marginTop: "1rem",
    padding: "0.5rem 1rem", // Notera användningen av camelCase och kommatecken
    borderTop: "2px solid #d3a588",
  },
}));

export const DogName = styled.h5`
  text-align: center; /* Centrera hundens namn */
  margin: 0.5rem 0; /* Lite utrymme över och under namnet */
`;

export const InfoRow = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

export const EditButton = styled.button`
  /* Använd Button-styled component som bas */
  background: #e8b4a8; /* Ljusrosa för knappen */
  color: white; /* Vit text */
  &:hover {
    background: #d3a588; /* Mörkare beige på hover */
  }
`;

export const DeleteButton = styled.button`
  /* Använd Button-styled component som bas */
  background: #d3a588; /* Mörkare beige för knappen */
  color: white; /* Vit text */
  &:hover {
    background: #e8b4a8; /* Ljusrosa på hover */
  }
`;
