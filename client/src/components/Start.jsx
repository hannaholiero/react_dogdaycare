import { useNavigate, Link } from "react-router-dom";
import hunddagis from "../assets/logo-hunddagis.png";
import LandingPageWrapper from "../wrappers/LandingPage";

const Start = () => {
  console.log("startsida");
  return (
    <LandingPageWrapper>
      <div className="container page">
        <div className="info">
          <h1>
            <span>Majsans</span> hunddagis
          </h1>
          <Link to="/profile" className="btn register-link">
            Våra hundar
          </Link>
          <Link to="/create" className="btn ">
            Lägg till hund
          </Link>
        </div>
        <img src={hunddagis} alt="pug-large" className="img main-img" />
      </div>
    </LandingPageWrapper>
  );
};

export default Start;
