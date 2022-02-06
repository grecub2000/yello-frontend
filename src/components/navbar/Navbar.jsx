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
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import * as icons from "@chakra-ui/icons";
export const Navbar = () => {
	const history = useHistory();

	const context = useContext(UserContext);

	const goHome = () => {
		history.push("/");
	};

    const goLogin = () => {
		history.push("/login");
	};


    const goRegister = () => {
		history.push("/register");
	};

    const goProfile = () => {
		history.push("/user/" + context.userInfo.userId);
	};

    const goProjects = () => {
		{context.jwt!="" && context.jwt!=null ? (history.push("/projects")): history.push("/login")}
    };

	const handleLogout = () => {
		context?.logOut();
		history.push("/");
	};


	return (
		<Flex
			width="100vw"
			height="60px"
			borderBottom="2px solid black"
			justifyContent="space-between"
            backgroundColor = "yellow"
			alignItems="center">
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
            {context.jwt!="" && context.jwt!=null ? (

			<Menu>
                

				<MenuButton as={Button} mx={4} colorScheme="yellow">
                    <icons.HamburgerIcon color="black" alignSelf="center"/>	
				</MenuButton>

				<MenuList>
					<Flex width="100%" alignItems="center" direction="column">

                    <Avatar
							size="lg"
							src={
								context?.userInfo?.profilePicture
							}
						/>
						<Text fontWeight="bold" fontSize="18px" my={3}>
							{
								context?.userInfo?.userName
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
								Log out
							</Text>
						</MenuItem>
                        
					</Flex>
				</MenuList>
			</Menu>
            ):
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

            }

		</Flex>
	);
};