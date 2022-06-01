// import { TriangleDownIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Divider,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import * as icons from "@chakra-ui/icons";
import { useKeycloak } from "@react-keycloak/web";
import jwt from 'jwt-decode';


export const Navbar = () => {
	const defaultPP = "https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg"
	const history = useHistory();
	const { keycloak, initialized } = useKeycloak();
	const context = useContext(UserContext);
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const [isLoading, setIsLoading] = useState(false);
	// console.log("from navbar");
	// console.log("navb", keycloak.authenticated);
	const goHome = () => {
		history.push("/");
	};
    const goLogin = async () => {
		// history.push("/login");
		keycloak.login({redirectUri: "http://localhost:3000/login"});
	};


    const goRegister = () => {
		keycloak.register({redirectUri: "http://localhost:3000/login"});
	};

    const goProfile = () => {
		// let username = jwt(keycloak.idToken).preferred_username;
		history.push("/profile");
	};

    const goProjects = () => {
		{keycloak.authenticated ? (history.push("/projects")): history.push("/login")}
    };

	const handleLogout = () => {
		history.push("/");
		localStorage.removeItem("userInfo");
		localStorage.removeItem("Registered");
		keycloak.logout();
		
	};


	return (
		<Flex
			width="100vw"
			height="60px"
			borderBottom="2px solid black"
			justifyContent="space-between"
            backgroundColor = "yellow"
			alignItems="center">
				{/* {console.log(context)} */}
			<Flex>
				<Button variant="link" mx={2} onClick={goHome}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center">
						Home
					</Text>
				</Button>
                <Button variant="link" mx={2} onClick={goProjects}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="black"
						alignSelf="center">
						Projects
					</Text>
				</Button>
			</Flex>
			{!!keycloak.authenticated && (
			<Menu>
                

				<MenuButton as={Button} mx={4} colorScheme="yellow">
                    <icons.HamburgerIcon color="black" alignSelf="center"/>	
				</MenuButton>

				<MenuList>
					<Flex width="100%" alignItems="center" direction="column">
					{/* {console.log(userInfo.username)} */}

					{userInfo?.profilePicture != defaultPP ? (
						<Avatar
						size="lg"
						name={userInfo?.firstName + " " + userInfo?.lastName}
						src={
							userInfo?.profilePicture
						}
						// src='https://bit.ly/broken-link'
						// src='https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1'
						> 
						</Avatar>
						):
						<Avatar
						size="lg"
						name={userInfo?.firstName + " " + userInfo?.lastName}
						> 
						</Avatar>
						}      
						<Text fontWeight="bold" fontSize="18px" my={3}>
							{
								userInfo?.username
							}
						</Text>


						<Divider />

							<MenuItem>
								<Text
									fontSize="18px"
									width="100%"
									display="flex"
									justifyContent="center"
									onClick={goProfile}>
									Profile
								</Text>
							</MenuItem>
							<MenuItem>
								<Text
									fontSize="18px"
									width="100%"
									display="flex"
									justifyContent="center"
									onClick={handleLogout}>
									Logout
								</Text>
							</MenuItem>       

					</Flex>
				</MenuList>
			</Menu>
			)}

			{!keycloak.authenticated && (
            <Flex>
            <Button variant="link" mx={2} onClick={goLogin}>
                <Text
                    fontSize="24"
                    fontWeight="bold"
                    color="black"
                    alignSelf="center">
                    Login
                </Text>                                
            </Button>
            <Button variant="link" mx={2} onClick={goRegister}>
                <Text
                    fontSize="24"
                    fontWeight="bold"
                    color="black"
                    alignSelf="center">
                    Register
                </Text>
            </Button>
            </Flex>
			)}

		</Flex>
	);
};