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
import { useKeycloak } from "@react-keycloak/web";



export const LoginRedirect = () => {
    const context = useContext(UserContext);
    const [userData, setUserData] = useState();
    const uId = useParams().id;
    const history = useHistory();
    const defaultPP = "https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg"
    const { keycloak, initialized } = useKeycloak();
    const isLoggedIn = keycloak.authenticated;
    // console.log("user logged in", isLoggedIn);
    const [details, setDetails] = useState();
    // console.log("user token", keycloak.idTokenParsed);

    

    const getUserData = async () => {
        let url = "http://localhost:5000/api/user/check-user"

        const config = {
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Authorization": "Bearer " + keycloak.idToken
            }
        };
        // try{
        const res = await axios.get(url, config);
        // console.log(res);
        if(res.data == "User not found"){
            console.log("user not found")
            return "404";
        }
        // }
        // catch(err){
        //     console.log("error", err);
        //     return "401";
        // }
        const user = {
            username: res.data.username,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            profilePicture: res.data.profilePicture
        }
        setUserData(user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("jwt", JSON.stringify(keycloak.idToken));
        return "200";
    }

    useEffect(async () => {

        let response = await getUserData();
        console.log(response);
        if(response == "404"){
            // history.push("/register")
            // console.log("404444")
            localStorage.setItem("Registered", false);
            history.push("/complete-register")
        }
        else if(response == "401"){
            // console.log("40111");
        }
        else if(response == "200"){
            // console.log("200")
            localStorage.setItem("Registered", true);
            history.push("/");
        }
        // }
        // }
        // let res = getResponse().catch(console.error);
        // console.log(response, "r");
        // console.log("response", res);
        // history.push("/")
        // console.log("userdatarff cont", context)
    },[keycloak.idToken]);


    return (
        <>  
        </>

    );
 

};

export default LoginRedirect;