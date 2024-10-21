import express from "express";
import cors from "cors";
import User from "./model/user-services.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// const deleteUser = (id) => {
//     let index = users["users_list"].findIndex((user) => user["id"] ===id);
//     users.users_list.splice(index, 1);
//     return id;
// }
//users["user_list"] and users.user_list mean the same thing

//add user POST function
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    User.addUser(userToAdd)
    .then(function(response){
        console.log(response)
        res.status(201).send(response)
    })
    .catch((error) => {console.log(error); });
});

//recieves a DELETE request with user id and deletes the user
app.delete("/users/:_id", (req, res) => {
    const userToDeleteId = req.params["_id"]
    User.deleteUser(userToDeleteId)
    .then(function(response){
        res.sendStatus(204)
    })
    .catch((error) => {console.log(error); });
});

app.get("/users", (req, res) => {
    const { name, job } = req.query
    User.getUsers(name, job)
    .then(function(response){
        console.log(response)
        res.send(response)
    })
    .catch((error) => {console.log(error); });
});
  
app.get("/users/:_id", (req, res) => {
    const id = req.params["_id"]; //or req.params.id
    console.log(id)
    User.findUserById(id)
   .then((response) => {
        res.send(response)
   })
   .catch((error) => {console.log(error); })
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    ); 
});