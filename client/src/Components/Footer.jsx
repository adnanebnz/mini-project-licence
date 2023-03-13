import React from "react";
import styled from "styled-components";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Footer() {
  const date = new Date();
  return (
    <FooterContainer className="text-white">
      <span className="text-white">
        Copyright &copy; {date.getFullYear()} DZHIKERS. All rights reserved
      </span>
      <ul className="links text-white">
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
      <ul className="social__links">
        <li>
          <BsFacebook />
        </li>
        <li>
          <AiFillInstagram />
        </li>
        <li>
          <BsLinkedin />
        </li>
      </ul>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #0083ce;
  border-radius: 0.5rem;
  padding: 2.5rem;

  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: white;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #c7defa;
        }
      }
      svg {
        font-size: 1.3rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #c7defa;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    ul {
      flex-direction: column;
    }
    .social__links {
      flex-direction: row;
    }
  }
`;
