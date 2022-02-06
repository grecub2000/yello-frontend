import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import * as icons from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import Card from "./Card"


export const Cards = ({cards, onTglStatus}) => {
    return (
      <div>
      <div className="row">
        {cards.map((card) => (
          <div className="col-12" key={card.id}>
            <Card card={card} onTglStatus={onTglStatus} />
          </div>
        ))}
      </div>
    </div>
    );
  }

export default Cards;