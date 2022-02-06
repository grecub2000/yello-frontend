import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import https from "https";
// import { isContext } from "vm";


export const useUser = () => {
//   const [refreshToken, setRefreshToken] = useState("");

  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState("");
//   const [pageToDisplay, setPageToDisplay] = useState("login");




  const logIn = async (details, setError) => {
        let url = "http://localhost:5000/api/users/login"

        console.log(details.username)
        console.log(details);

        const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
        };

        try{
            const res = await axios.post(url, details, config).catch((error) => {
                console.log(error.response);
                if (error.response.status == 401) {
                  setError("Username or password are incorrect")
                }
                else {
                    setError("Unknown Error")
                }
            })
            let token = res.data.accessToken;
            // console.log(token)
            console.log(res.data)
            const user = JSON.stringify({
              profilePicture: res.data.profilePicture,
              userName: res.data.username,
              userId: res.data.id
            });
            const parsedUserObj = JSON.parse(user)
            await localStorage.setItem("JWTToken", token);
            await localStorage.setItem("userInfo", user);
            setJwt(token);
            setUserInfo(parsedUserObj);
            // console.log("userobj",parsedUserObj)
            // setUserInfo(parsedUserObj);
            
            history.push("/");
        }
        catch(err){
            console.log(err)
            return;
        }
        
  };

  const signUp = async (details, setError) => {

    let url = "http://localhost:5000/api/users/register";
    console.log(details)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try{
        const user = {
            username: details.username,
            email: details.email,
            firstName: details.firstName,
            lastName: details.lastName,
            password: details.password
        }
        console.log(user)
        const res = await axios.post(url, user, config).catch((error) => {
            console.log(error.response);
            if (error.response.status == 400) {
              setError("Failed to register")
            }
            else {
                setError("Unknown Error")
            }
        })
        
        // history.push("/");
    }
    catch(err){
        console.log(err)
        return;
    }
  };



  const logOut = () => {
    console.log("logging out");
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("userInfo");
    setJwt(null);
    setUserInfo(null);
  };



  return {
    jwt,
    setJwt,
    // refreshToken,
    // setRefreshToken,
    // refreshAuthToken,
    userInfo,
    setUserInfo,
    error,
    signUp,
    setError,
    // pageToDisplay,
    // setPageToDisplay,
    logOut,
    logIn,
  };
};