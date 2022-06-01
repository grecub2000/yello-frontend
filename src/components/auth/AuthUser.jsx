import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

// import https from "https";
// import { isContext } from "vm";


export const useUser = () => {
//   const [refreshToken, setRefreshToken] = useState("");
  
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState("");
  // const { keycloak, initialized } = useKeycloak();
  // const isLoggedIn = keycloak.authenticated;
//   const [pageToDisplay, setPageToDisplay] = useState("login");


  // const getUserData = async () => {
  // }
  //   // console.log("in userd", isLoggedIn);
  //   let url = "http://localhost:5000/api/user/check-user"

  //   // console.log("token in fct", keycloak.idToken);
  //   const config = {
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Authorization": "Bearer " + keycloak.idToken
  //       }
  //   };
  //   // try{
  //   const res = await axios.get(url, config).catch((err) => {console.log("user not found"); return "404";});
  //   // }
  //   // catch(e){
  //   //     console.log(e);
  //   //     const res = "no user";
  //   //     return "no user";
  //   // }

  //   // console.log("passed req", res);
  //   // let token = res.data.accessToken;
  //   // console.log(token)
  //   // console.log(res)
  //   // console.log("data",res.data)
  //   // console.log(res.status)
  //   if (res == "404"){
  //       return "404";
  //   }
  //   const user = {
  //       username: res.data.username,
  //       email: res.data.email,
  //       firstName: res.data.firstName,
  //       lastName: res.data.lastName,
  //       profilePicture: res.data.profilePicture
  //   }
  //   setUserInfo(user);
  //   // console.log(user);
  //   localStorage.setItem("userInfo", JSON.stringify(user));
  //   localStorage.setItem("jwt", JSON.stringify(keycloak.idToken));
  //   // context.setUserInfo(JSON.parse(user));
  //   return "200";
  //   // // console.log(localStorage.getItem("userInfo"));
  //   // var user = localStorage.getItem("userInfo");
  //   // setUserData(user);
  //   // // console.log(user);
  //   // return user;
  // }

  // const logIn = async (details, setError) => {
  //       let url = "http://localhost:5000/api/user/login"

  //       console.log(details.username)
  //       console.log(details);

  //       const config = {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //       };

  //       try{
  //           const res = await axios.post(url, details, config).catch((error) => {
  //               console.log(error.response);
  //               if (error.response.status == 401) {
  //                 setError("Username or password are incorrect")
  //               }
  //               else {
  //                   setError("Unknown Error")
  //               }
  //           })
  //           let token = res.data.accessToken;
  //           // console.log(token)
  //           console.log(res.data)
  //           const user = JSON.stringify({
  //             profilePicture: res.data.profilePicture,
  //             userName: res.data.username,
  //             userId: res.data.id
  //           });
  //           const parsedUserObj = JSON.parse(user)
  //           await localStorage.setItem("JWTToken", token);
  //           await localStorage.setItem("userInfo", user);
  //           setJwt(token);
  //           setUserInfo(parsedUserObj);
  //           // console.log("userobj",parsedUserObj)
  //           // setUserInfo(parsedUserObj);
            
  //           history.push("/");
  //       }
  //       catch(err){
  //           console.log(err)
  //           return;
  //       }
        
  // };

  const signUp = async (details, setError) => {

    let url = "http://localhost:5000/api/user/register";
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
            profilePicture: details.profilePicture
        }
        console.log("user to register", user);
        // const res = await axios.post(url, user, config).catch((error) => {
        //     console.log(error.response);
        //     if (error.response.status == 400) {
        //       setError("Failed to register")
        //     }
        //     else {
        //         setError("Unknown Error")
        //     }
        // })
        
        // history.push("/");
    }
    catch(err){
        console.log(err)
        return;
    }
  };



  // const logOut = () => {
  //   console.log("logging out");
  //   localStorage.removeItem("JWTToken");
  //   localStorage.removeItem("userInfo");
  //   setJwt(null);
  //   setUserInfo(null);
  // };



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
    // logOut,
    // logIn,
    // getUserData
  };
};