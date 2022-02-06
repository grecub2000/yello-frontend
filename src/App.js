import logo from './logo.svg';
import './App.css';
import React, { createContext, useEffect } from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {HomePage, NewUserPage} from "./components/home/Home.jsx";
import {NotFoundPage} from "./components/404/404.jsx";
import {ProfilePage} from "./components/profile/Profile"
import {ProjectPage} from "./components/projects/Project.jsx"
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import {useUser} from "./components/auth/AuthUser.jsx"
import { Navbar } from "./components/navbar/Navbar";
import { ChakraProvider } from '@chakra-ui/react';

export const UserContext = createContext(null);

function App() {
    const context = useUser();

    useEffect(() => {
      let token = localStorage.getItem("JWTToken");
      // console.log("local jwt", token);
      // let ui = JSON.parse(localStorage.getItem("userInfo"))
      // console.log("userlocal", ui)
      if (token != null) {
        if (!context.jwt) {
          context.setJwt(token);
          context.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        }
      }
      // console.log("cont userinfo", context.userInfo);
    }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: 'url("/img/background.jpg")'
        }}>
        <UserContext.Provider value={context}>
        {/* {console.log("context", context)} */}
        {context.jwt!="" && context.jwt!=null ? (
           <Switch>
           <Route exact path="/">
           {/* {console.log("context", context)} */}
             <Navbar/>
               <HomePage />
           </Route>
           <Route exact path="/user/:id">
           {/* {console.log("context", context.userInfo)} */}
             <Navbar/>
               <ProfilePage />
           </Route>
           <Route exact path="/projects">
           {/* {console.log("context", context.userInfo)} */}
             <Navbar/>
               <ProjectPage />
           </Route>
           <Route exact path="*">
             <Navbar />
               <NotFoundPage />
           </Route>
         </Switch>
        ):
        <Switch>
            <Route exact path="/">
            <Navbar/>
                <NewUserPage />
            </Route>
            <Route exact path="/login">
              {/* {console.log(context)} */}
                <LoginForm />
            </Route>
            <Route exact path="/register">
                <SignupForm />
            </Route>
            {/* <Route exact path="/">
              <LoginForm />
            </Route> */}
            <Route exact path="*">
              {/* <Redirect to="/"/> */}
            </Route>
          </Switch>
         }
          </UserContext.Provider>
          </div>
      </div>
  </ChakraProvider>
  );
}


export default App;
