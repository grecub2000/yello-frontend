import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";





export const CardEdit = ({ card, onSaveCard }) => {
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const saveCard = (e) => {
    e.preventDefault();
    onSaveCard({ desc: desc, date: date });
    setDesc("");
    setDate("");
  };
  return (
    <div>
      <h3>Add Card</h3>
      <form>
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="text-right">
        <Button mt={4} size="sm" colorScheme="green" mx={1} onClick={saveCard}>
            Save
        </Button>
        </div>
      </form>
    </div>
  );
}

export default CardEdit;