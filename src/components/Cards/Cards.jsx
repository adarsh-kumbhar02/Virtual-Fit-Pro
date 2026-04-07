import React, { useEffect, useState } from "react";
import "./Cards.css";
import { CardsData } from "../../Data/Data";
import Card from "../Card/Card";

const Cards = (props) => {

  const cardData = props.data;

  return (
    <div className="Cards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              key={id}
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={cardData[id]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
