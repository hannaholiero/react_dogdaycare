import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // Säkerställ att detta är rätt sökväg till din CSS-modul

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        Hem
      </Link>
      <Link to="/profile" className={styles.navLink}>
        Våra hundar
      </Link>
      <Link to="/create" className={styles.navLink}>
        Lägg till ny hund
      </Link>
    </nav>
  );
};

export default Navbar;
