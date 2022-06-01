import { useKeycloak } from "@react-keycloak/web";
import {useHistory} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let history = useHistory();
    if(localStorage.getItem("jwt")){
    // const isLoggedIn = keycloak.authenticated;
    return children;
    }


    history.push("/redirect");
    return null;
};

export default PrivateRoute;