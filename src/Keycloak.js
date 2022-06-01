import Keycloak from "keycloak-js";


const keycloak = new Keycloak({
 url: "http://localhost:8088/auth",
 realm: "Yello",
 clientId: "yello",
 baseUrl: "http://localhost:3000/test"
});

export default keycloak;