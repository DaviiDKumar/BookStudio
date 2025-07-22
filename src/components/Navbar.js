"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faBookOpen, // Updated icon for "Search Google Books"
  faCrown,    // Updated icon for "Best Sellers"
  faEnvelope,
  // Removed faBars and faTimes as we're using CSS bars now
} from "@fortawesome/free-solid-svg-icons";
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: faHome },
    { name: "Shop", href: "/shop", icon: faShoppingBag },
    { name: "Search Google Books", href: "/search", icon: faBookOpen },
    { name: "Best Sellers", href: "/about", icon: faCrown },      // Changed icon to faCrown
    { name: "Contact", href: "/contact", icon: faEnvelope },
  ];

  // Function to close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <div className="navbar__logo">
            <Link href="/" onClick={closeMenu}>

              <h1> <MenuBookIcon className="svg"/>B<span>est</span> B<span>ooks</span> G<span>uide</span></h1>
            </Link>

          </div>

          <nav id="main-navigation" className={`navbar__menu ${menuOpen ? "open" : ""}`}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={closeMenu}>
                    <FontAwesomeIcon icon={link.icon} className="nav-icon" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`navbar__toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="navbar__overlay" onClick={closeMenu}></div>
      )}
    </>
  );
}