import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
  Image,
  Divider,
  Center,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useKeycloak } from "@react-keycloak/web";


export const HomePage = () => {
  const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;
  return (
    <>
    {isLoggedIn ? (
    <div>
        <Text color="yellow" fontSize="3xl">Welcome to Yello!</Text>
        <Text color="yellow">To view your cards lists, access the Projects page in the navbar</Text>
    </div>
    ):
      <>
        <Text color="yellow" fontSize="3xl">Welcome to Yello!</Text>
        <br />
        
        <Text color="yellow">This is a Task Management application.</Text>
        <Text color="yellow">Here you can create, edit and remove tasks,</Text> 
        <Text color="yellow">to make your work more organized, and to be more productive.</Text>
        <br />
        <Text color="yellow">Login to your Yello account to use the features</Text>
        <Text color="yellow">Or if you are a new user, click the register button to join our community now.</Text>
        <br />
        <Divider />
        <br />
        <Center>
          <Image src="./img/cards.png"  ></Image>
        </Center>
      </>
    }
    </>
  );
};


export default HomePage;