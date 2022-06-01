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
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { useHistory, useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";


const nullDetails = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
    }


const CompleteRegisterForm = () => {

    
    const context = useContext(UserContext);
    const [details, setDetails] = useState(nullDetails);
    const [error, setError] = useState("");
    const { keycloak, initialized } = useKeycloak();
    const history = useHistory();
    

    const userKeycloak = {
      username: keycloak?.idTokenParsed?.preferred_username,
      email: keycloak?.idTokenParsed?.email,
      firstName: keycloak?.idTokenParsed?.given_name,
      lastName: keycloak?.idTokenParsed?.family_name,
    }
    // console.log(userKeycloak)
    // const [details, setDetails] = useState(userKeycloak);
    // console.log("token", keycloak.idTokenParsed);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (details.profilePicture != "test") {
        //   console.log("details", details);
        //   console.log(context);
          signUp(details,(_)=>setError(_))

        }
        else
            setError("Eroare");
    };

    const signUp = async (details, setError) => {

      let url = "http://localhost:5000/api/user/register";
      // console.log(details)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + keycloak.idToken
        },
      };
      try{
          const user = {
              username: details.username,
              email: details.email,
              firstName: details.firstName,
              lastName: details.lastName,
              profilePicture: details.profilePicture
          }
          // if(!details.profilePicture){
          //   console.log("nopp")
          // }
          // console.log("user to register", user);
          const res = await axios.post(url, user, config).catch((error) => {
              console.log(error.response);
              if (error.response.status == 400) {
                setError("Failed to register")
              }
              else {
                  setError("Unknown Error")
              }
          })
          console.log(res);
          localStorage.setItem("Registered", true);
          localStorage.setItem("userInfo", JSON.stringify(user));
          history.push("/");
      }
      catch(err){
          console.log(err)
          return;
      }
    };


    useEffect(async () => {
      if(userKeycloak){
        // console.log("setting details");
        setDetails(userKeycloak);
        // console.log("User set");
      }
      
    },[keycloak.idToken]);

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
                  Complete Register
                </Text>
                <FormControl>
                  <FormLabel htmlFor="username">Yello Username:</FormLabel>
                  {/* <Text>If you change the username, you will still need to login with the old Keycloak username on the app</Text> */}
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
                  <FormLabel htmlFor="link">Profile Picture:</FormLabel>
                  <Input
                    // required={true}
                    size="md"
                    variant="filled"
                    type="link"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setDetails({ ...details, profilePicture: e.target.value });
                    }}
                    value={details.profilePicture}
                  />
                </FormControl>
                {error != "" && (
                  <Text fontSize="lg" color={"red.600"}>
                    {error}
                  </Text>
                )}
                <Button mt={4} colorScheme="yellow" size="md" type="submit">
                  Register
                </Button>
              </Container>
            </form>
          </div>
      );
    };
    
export default CompleteRegisterForm;