import {
	Button,
	Container,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import * as icons from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";


export const Card = ({card, onTglStatus}) => {
    return (
        <div className="card text-left" key={card.id}>
            <Divider />
            <br />
        <div className="row">
          <div className="col-10">
            <h4>{card.desc}</h4>
            <div className="card-meta">
                <icons.CalendarIcon color="black" alignSelf="center"/>
                - 
              {card.date}
            </div>
          </div>
  
          <div className="col-2 is-center">
            {card.complete}
            <button
              className="button icon-only clear"
              onClick={() => onTglStatus(card)}>
              {card.complete && "✅"}
              {!card.complete && "⬜"}
            </button>
          </div>
        </div>
        {/* <br /> */}
        {/* <Divider /> */}
      </div>
    );
  }

export default Card;