import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import {Cards} from "./Cards.jsx";
import {CardEdit} from "./CardEdit.jsx";


export const ProjectPage = () => {


  const [cards, setCards] = useState([
    {desc: "Your First Card", id: 1, date: "2022/01/06", status: "Complete"},
    {desc: "Click the Add Card button to add your own.", id: 2, date: "2022/01/06", status: "In Progress"}
  ])
  const [showCardEdit, setShowCardEdit] = useState(false);

  const onTglStatus = (card) => {

    setCards(
    cards.map((checkCard) => {
      checkCard.complete =
        card.id === checkCard.id ? !checkCard.complete : checkCard.complete;
        return checkCard;
      })
    );
    localStorage.setItem("cards", JSON.stringify(cards))
  };
  const getUserCards = () => {
    let uCards = JSON.parse(localStorage.getItem("cards") || "[]");
    console.log("user cards", uCards)
    setCards(uCards)
  }
  const onSaveCard = ({ desc, date }) => {
    console.log("saving Cards");
    let newCards = [{ desc: desc, date: new Date().toJSON().slice(0,10).replace(/-/g,'/'), id: Date.now(), complete: false }, ...cards]
    setCards(newCards);
    // console.log("cards on save", cards)
    localStorage.setItem("cards", JSON.stringify(newCards))
  };

  useEffect(() => {
    
    getUserCards()
    // console.log("cards" , cards)
},[]);

  return (
    <div>
        <Text color="yellow" fontSize="large">Welcome to your Project Management page.</Text>
        <br />
        <Text color="yellow">Here you can create, edit and remove tasks,</Text> 
        <Text color="yellow"> to make your work more organized, and to be more productive</Text>
        <Button mt={4} size="lg" colorScheme="green" mx={1} onClick={() => setShowCardEdit(!showCardEdit)}>
            {!showCardEdit && "Add new card"}
            {showCardEdit && "➖"}
        </Button>
        <br />
        <br />
        <div
        style={{
          margin: "auto",
          width: "400px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"yellow"
        }}>
          {showCardEdit && <CardEdit task={{}} onSaveCard={onSaveCard} />}
          <Cards cards={cards} onTglStatus={onTglStatus}></Cards>
        </div>
      </div>
  );
};


export default ProjectPage;