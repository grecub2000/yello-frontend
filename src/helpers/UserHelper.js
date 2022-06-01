import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../../App.js";
import { useHistory, useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";


export const UserHelper = async () => {
    let url = "http://localhost:5000/api/user/profile"
    const [userData, setUserData] = useState();
    const uId = useParams().id;
    const history = useHistory();
    
    const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKeWsxTTVlR1gtaEdjTHNqS0tqZ1doWlVJR0JvUVJQQ0tNeUVlMkFYUGtBIn0.eyJleHAiOjE2NTQxNjYwMzcsImlhdCI6MTY1MzczNDAzNywiYXV0aF90aW1lIjoxNjUzNzM0MDM2LCJqdGkiOiJlNmYyY2M3Yy1hNjVhLTRlMGYtODkwMi0xZGU3NDU4YmM1MjQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODgvYXV0aC9yZWFsbXMvWWVsbG8iLCJhdWQiOiJ5ZWxsbyIsInN1YiI6IjIxOTgwNDgzLTdlNzUtNDYwOS05ZGI4LTYxZjU5ZGNkYWJiOCIsInR5cCI6IklEIiwiYXpwIjoieWVsbG8iLCJub25jZSI6ImNjNzRlMWVmLTUxZjAtNGUwMC04YjgxLWY2NTMzYThjYWZhNiIsInNlc3Npb25fc3RhdGUiOiIwM2VjZGZmMi04NTMzLTRiNzUtOTU4NC0zMGIyZTk0NDlhOTYiLCJhdF9oYXNoIjoiTFpUbG1YemRyb1hFRVhJRUdZdlZzZyIsImFjciI6IjEiLCJzaWQiOiIwM2VjZGZmMi04NTMzLTRiNzUtOTU4NC0zMGIyZTk0NDlhOTYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIn0.qij1avNPGL1je83XZIlXpu1xWSSQIkVl2-vT_6BBgqc-1b9NZdKZaIyYXxULzoGCs69SV-6aK7rA3eTki3dA_ghQ0yPgVahaqQt41CAkFcdZwf18oXWFqgJk8cwOmra3Uq7SbGoxFsvBzQ_90s2NCfkHMrUMmNZIta9p_srEowVbtQO6kopLjxV7dMwnAcGgrjAeTE8GEw9aTBLfEZ-tiqQrJrB2_9yq3rVNQH-5piwCED3KgWlFn79uN3xH-0zGS5X2Z7Djm7MchIhFCNbPp1SKyb_Hj9_PT6WX-9RsXBIDwm4-_NT7VMBlbE1SX6lzj4uCIgpJgE6af3wMuJh3Qg"
        },
    };

    const res = await axios.get(url, config);
    // let token = res.data.accessToken;
    // console.log(token)
    // console.log(res)
    // console.log("data",res.data)
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
    // console.log(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
    // context.setUserInfo(JSON.parse(user));
    return user;
    // console.log(localStorage.getItem("userInfo"));
    // var user = localStorage.getItem("userInfo");
    // setUserData(user);
    // // console.log(user);
    // return user;

    
}


export default UserHelper;
// useEffect(() => {
//     getUserData()
//     console.log("userdatarff", userData)
// },[]);