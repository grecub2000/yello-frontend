import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    Center
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

const nullDetails = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
}


const SignupForm = () => {

    const context = useContext(UserContext);
    const [details, setDetails] = useState(nullDetails);
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (details.password == details.confirmPassword) {
            context.signUp(details,(_)=>setError(_))
        }
        else
            setError("Passwords do not match!");
    };

    return (
          <div
            style={{
              width: "100vw",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Container
                width="min(400px,100vw)"
                boxShadow="2xl"
                p="10"
                borderRadius="10"
                centerContent={true}
                border="1px"
                borderColor="teal.300"
                backgroundColor="yellow"
              >
                <Text
                  letterSpacing="5px"
                  p="5"
                  fontWeight="semibold"
                  fontSize="5xl"
                  color="teal"
                >
                  Signup
                </Text>
                <FormControl>
                  <FormLabel htmlFor="username">Username:</FormLabel>
                  <Input
                    required={true}
                    size="md"
                    variant="filled"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setDetails({ ...details, username: e.target.value });
                    }}
                    value={details.username}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">First Name:</FormLabel>
                  <Input
                    required={true}
                    size="md"
                    variant="filled"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setDetails({ ...details, firstName: e.target.value });
                    }}
                    value={details.firstName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Last Name:</FormLabel>
                  <Input
                    required={true}
                    size="md"
                    variant="filled"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setDetails({ ...details, lastName: e.target.value });
                    }}
                    value={details.lastName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email:</FormLabel>
                  <Input
                    required={true}
                    size="md"
                    variant="filled"
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setDetails({ ...details, email: e.target.value });
                    }}
                    value={details.email}
                  />
                </FormControl>
                <FormControl>
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
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Input
                    required={true}
                    size="md"
                    variant="filled"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => {
                      setDetails({ ...details, confirmPassword: e.target.value });
                    }}
                    value={details.confirmPassword}
                  />
                </FormControl>
                {error != "" && (
                  <Text fontSize="lg" color={"red.600"}>
                    {error}
                  </Text>
                )}
                <Button mt={4} colorScheme="yellow" size="md" type="submit">
                  Sign up
                </Button>
                <Link href="/login" my={2}>
                  Log in
                </Link>
              </Container>
            </form>
          </div>
      );
    };
    
export default SignupForm;