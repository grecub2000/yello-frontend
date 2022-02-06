import {
    Avatar,
    AvatarBadge,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Text,
    Image,
    Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App.js";
import { useHistory, useParams } from "react-router-dom";



export const ProfilePage = () => {
    const context = useContext(UserContext);
    const [userData, setUserData] = useState();
    const uId = useParams().id;
    const history = useHistory();
    const defaultPP = "https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg"

    // const [details, setDetails] = useState();



    const getUserData = async () => {
        let url = "http://localhost:5000/api/users/" + uId

        
        const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
        };

        const res = await axios.get(url, config);
        // let token = res.data.accessToken;
        // console.log(token)
        console.log(res)
        console.log("data",res.data)
        if (res.status != 200){
            history.push("/");
            history.push("/404")
        }
        const user = {
            username: res.data.username,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            profilePicture: res.data.profilePicture
        }
        setUserData(user);
        
    }

    useEffect(() => {
        getUserData()
        // console.log("userdatarff", userData)
    },[]);

    const goEdit = () => {
		history.push("./edit/"+uId);
	};

    const goHome = () => {
		history.push("/");
	};


    return (
        <>  
        <div
            style={{
              width: "100vw",
            //   height: "90vh",
              display: "flex",
              justifyContent: "center",
            //   alignItems: "center",
            }}
          >
            <Container
                width="min(800px,100vw)"
                boxShadow="2xl"
                p="10"
                borderRadius="5"
                centerContent={true}
                border="1px"
                borderColor="#7A7400"
                backgroundColor="#3B3806"
                margin= "10px"
              >
                {console.log("userdata", userData)}
                {/* <Text color="yellow">
                    idul  userului {context?.userInfo?.userId} {uId} 
                </Text> */}
                {/* <br /> */}
                {userData?.profilePicture != defaultPP ? (
                <Avatar
                size="xl"
                name={userData?.firstName + " " + userData?.lastName}
                src={
                    userData?.profilePicture
                }
                // src='https://bit.ly/broken-link'
                // src='https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1'
                > 
                </Avatar>
                ):
                <Avatar
                size="xl"
                name={userData?.firstName + " " + userData?.lastName}
                > 
                </Avatar>
                }               
                <Text color="yellow">{userData?.username}</Text>
                <br />
                <Divider />
                <br />
                <Text color="#E0D616" align="left">First Name: {userData?.firstName} </Text>
                <Text color="#E0D616" align="left">Last Name: {userData?.lastName} </Text>
                {/* <Text color="#E0D616" align="left">: {userData?.firstName} </Text> */}
                <Text color="#E0D616" align="left">Email: {userData?.email} </Text>
                <br/>
                <div>
                    <Button mt={4} size="lg" colorScheme="yellow" mx={1} onClick={goEdit}>
                        Edit Profile
                    </Button>
                    <Button mt={4} size="lg" colorScheme="red" mx={1} onClick={goHome}>
                        Delete account
                    </Button>
                </div>
                <br />
            </Container>
            
        </div>
        </>

    );


};


export default ProfilePage;