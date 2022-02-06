import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App.js";


const LoginForm = () => {

    const context = useContext(UserContext);
    const [details, setDetails] = useState({username: "", password: ""});
	const [error, setError] = useState("");

    const handleSubmit = (event) => {
		event.preventDefault();
		console.log(details);
		console.log(context);
		if (details.username && details.password)
			context.logIn(details, (_)=>setError(_));
		else
			setError("Both fields must be completed");

    };


    return (

			<div
				style={{
					width: "100vw",
					height: "90vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<form onSubmit={handleSubmit}>
					<Container
						width="min(400px,100vw)"
						boxShadow="2xl"
						p="10"
						borderRadius="10"
						centerContent={true}
						border="1px"
						borderColor="teal.300"
						backgroundColor="yellow">
						<Text
							letterSpacing="2px"
							p="5"
							fontWeight="semibold"
							fontSize="5xl"
							color="black">
							Login
						</Text>
						{error != "" && (
							<Text fontSize="lg" color={"red.600"}>
								{error}
							</Text>
						)}
						<FormControl>
							<FormLabel htmlFor="email">Username:</FormLabel>
							<Input
								required={true}
								size="md"
								variant="filled"
								type="username"
								id="username"
								onChange={(e) => {
									setDetails({ ...details, username: e.target.value });
								}}
								value={details.username}
							/>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								required={true}
								size="md"
								variant="filled"
								type="password"
								name="password"
								id="password"
								onChange={(e) => {
									setDetails({ ...details, password: e.target.value });
								}}
								value={details.password}
							/>
						</FormControl>
						<Button mt={4} size="lg" colorScheme="yellow" type="submit">
							Log in
						</Button>

						<Link href="/register" my={2}>
							Sign Up
						</Link>
					</Container>
				</form>
			</div>
	);
};


export default LoginForm;