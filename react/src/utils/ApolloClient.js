import ApolloClient from "apollo-boost";
import {getCookie} from "./cookie";

const client = new ApolloClient({
    headers: {
        'X-CSRFToken': getCookie('csrftoken')
    }
});

export default client;