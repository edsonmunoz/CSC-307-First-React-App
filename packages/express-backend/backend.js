import express from "express";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Mac",
            job: "Bartender"
        }
    ]
};

app.use(express.json());

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByJob = (job) => {
    return users.users_list.filter(
        (user) => user.job === job
    );
};

//implicit return in this function 
//single line expressions can omit {} and automatically return resul
const findUserById = (id) => 
    users["users_list"].find((user) => user["id"] === id);

//curly braces indicate explicit return
//multi line functions require a {} and require an explicit return statement
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (id) => {
    let index = users["users_list"].findIndex((user) => user["id"] ===id);
    users.users_list.splice(index, 1);
    return id;
}
//users["user_list"] and users.user_list mean the same thing

//add user POST function
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

//recieves a POST request with user id and deletes the user
app.post("/users/:id", (req, res) => {
    const userToDeleteId = req.params["id"]
    let result = findUserById(userToDeleteId);
    if(result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        deleteUser(userToDeleteId)
        res.send()
    }
})

app.get("/users", (req, res) => {
    const name = req.query.name
    const job = req.query.job
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else if(job != undefined) {
        let result = findUserByJob(job);
        result = { user_list: result};
        res.send(result);
    } 
    else {
      res.send(users);
    }
});
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});
  

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//app.get("/users", (req, res) => {
  //  res.send(users);
//});

app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    ); 
});