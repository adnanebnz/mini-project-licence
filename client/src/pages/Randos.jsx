import React, { useState } from "react";
import styled from "styled-components";
import Destination4 from "../assets/Destination4.png";
import Destination5 from "../assets/Destination5.png";
import Destination6 from "../assets/Destination6.png";
import jijel from "../assets/jijel.jpg";
import annaba from "../assets/annaba.jpg";
import phare from "../assets/phare.jpg";

import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
import { Typography } from "@mui/material";

export default function Randos() {
    const data = [
        {
            image: jijel,
            title: "Jijel",
            subTitle: "Magnifique plage bla bla bla",
            cost: "1200 DZD",
            duration: "1 jour",
        },
        {
            image: phare,
            title: "Le phare Mostaganem",
            subTitle: "blablablabla",
            cost: "2000 DZD",
            duration: "2 jours",
        },
        {
            image: annaba,
            title: "Annaba",
            subTitle: "Annaba plage bla bla bla",
            cost: "3000 DZD",
            duration: "3 jours",
        },
        {
            image: Destination4,
            title: "New Zealand",
            subTitle: "New Zealand is an island country in the",
            cost: "24100 DZD",
            duration: "5 jours",
        },
        {
            image: Destination5,
            title: "Bora Bora",
            subTitle: "Bora Bora is a small South Pacific island northwest of",
            cost: "954000 DZD",
            duration: "10 jours",
        },
        {
            image: Destination6,
            title: "London",
            subTitle: "London, the capital of England and the United",
            cost: "38800 DZD",
            duration: "3 jours",
        },
    ];
    const [active, setActive] = useState(1);
    return (
        <Section id="recommend">
            <div className="title">
                <Typography variant="h2" fontSize="22px" fontWeight="600" marginTop="2.5rem">
                    Randonnées Disponibles
                </Typography>
            </div>
            <div className="destinations mt-16">
                {data.map((destination) => {
                    return (
                        <div className="destination">
                            <img src={destination.image} alt="" />
                            <h3>{destination.title}</h3>
                            <p>{destination.subTitle}</p>
                            <div className="info">
                                <div className="services">
                                    <img src={info1} alt="" />
                                    <img src={info2} alt="" />
                                    <img src={info3} alt="" />
                                </div>
                                <h4>{destination.cost}</h4>
                            </div>
                            <div className="distance">
                                <span>10 KM</span>
                                <span>{destination.duration}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.1rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
