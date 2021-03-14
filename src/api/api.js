import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json" }
});

export const toolsApi = {
    getAll (){
        return instance.get("/tools")
    },

    create (){
        return instance.post("/tools")
    },

    put(){
        return instance.put("/tools")
    }

}