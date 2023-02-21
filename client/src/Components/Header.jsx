import React, { useState } from "react";
import styled from "styled-components";
import logoo from "../assets/logoo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const [navbarState, setNavbarState] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container" onClick={() => navigate("/")}>
            <img src={logoo} alt="" style={{ height: "50px" }} />
            DZHIKERS
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <Link to="/">Acceuil</Link>
          </li>
          <li>
            <Link to="/randos">Randonnées</Link>
          </li>
          <li>
            <Link to="/boutique">Boutique</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex gap-4">
          <button onClick={() => navigate("/login")}>Se connecter</button>
          <button onClick={() => navigate("/register")}>Créer un compte</button>
        </div>
      </Nav>
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <Link to="/" onClick={() => setNavbarState(false)}>
              Acceuil
            </Link>
          </li>
          <li>
            <Link to="/randos" onClick={() => setNavbarState(false)}>
              Randonnées
            </Link>
          </li>
          <li>
            <Link to="/boutique" onClick={() => setNavbarState(false)}>
              Boutique
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setNavbarState(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setNavbarState(false)}>
              Se connecter
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={() => setNavbarState(false)}>
              Créer un Compte
            </Link>
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #1e90ff;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #0077b6;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    button {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "90px" : "-400px")};
  background-color: white;
  height: 40vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
`;
