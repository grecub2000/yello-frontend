import logo from './logo.svg';
import './App.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import React, { createContext, useEffect } from "react";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import {HomePage, NewUserPage} from "./components/home/Home.jsx";
import {NotFoundPage} from "./components/404/404.jsx";
import {ProfilePage} from "./components/profile/Profile"
import {ProjectPage} from "./components/projects/Project.jsx"
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import {LoginRedirect} from "./components/auth/AuthRedirect";
import CompleteRegisterForm from "./components/auth/CompleteRegisterForm";
import {useUser} from "./components/auth/AuthUser.jsx"
import { Navbar, goLogin, goRegister } from "./components/navbar/Navbar";
import { ChakraProvider } from '@chakra-ui/react';
import PrivateRoute from "./helpers/PrivateRoute";
import { useKeycloak } from "@react-keycloak/web";
// import UserHelper from "./helpers/UserHelper";

export const UserContext = createContext(null);

function App() {
    const context = useUser();
    const history = useHistory();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const Registered = localStorage.getItem("Registered");
    // const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
      // let token = localStorage.getItem("JWTToken");
      // console.log("local jwt", token);
      // console.log("userlocal", ui);
      // context.getUserData();
      if(history.location.state == "/complete-register"){
        return;
      }
      // let userInfo = JSON.parse(localStorage.getItem("userInfo")) 
      context.setUserInfo(userInfo);
      // console.log(localStorage.getItem("userInfo"));
      // console.log("user info", userInfo);
      if(Registered == false){
        // check user info endpoint
        console.log("Redirect to register");

        // in this function, if response = 200, update user info,
        // else if response is 404, redirect to register 
      }
      // console.log(context);
    }, []);

  return (
    // <UserHelper>
    <ChakraProvider>
      <ReactKeycloakProvider authClient={keycloak}>
        <div className="App">
          <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: 'url("/img/background.jpg")'
          }}>
            <Switch>
                {/* {console.log("here")} */}
                <Route exact path="/">
                    <Navbar/>
                    <HomePage />
                </Route>
                <Route exact path="/login">
                  <LoginRedirect/>
                </Route>
                <Route exact path="/complete-register">
                  <CompleteRegisterForm /> 
                </Route>
              <Route exact path="/profile">
                <PrivateRoute>
                  <Navbar/>
                  <ProfilePage />
                </PrivateRoute>
              </Route>
              <Route exact path="/projects">
                <PrivateRoute>
                  <Navbar/>
                    <ProjectPage />
                </PrivateRoute>
              </Route>
              <Route exact path="*">
                <Navbar/>
                <NotFoundPage />
              </Route>
            </Switch>
            </div>
        </div>
      </ReactKeycloakProvider>
  </ChakraProvider>
  // </UserHelper>
  );
}


export default App;
