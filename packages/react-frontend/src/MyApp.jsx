// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) =>  res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );
    
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
        return promise;
    }

    function postforRemoval(person) {
        const promise = fetch("Http://localhost:8000/users/"+person.id, {
            method: "DELETE", //must match the type of function in backend e.g app.delete 
            body: JSON.stringify(person),
        });
        return promise
    }

    function removeOneCharacter(index) {
        let person = characters[index]
        postforRemoval(person)
            .then(function(response){
                if(response.status === 204){
                    const updated = characters.filter((character, i) => {
                    return i !== index;
                    setCharacters(updated);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //function updateList(person) {
    //    setCharacters([...characters, person]);
    //}

    function updateList(person) { 
        postUser(person)
            .then(function(response){ 
                if(response.status === 201) 
                    return response.json(); 
            })
            .then(function(person) {
                setCharacters([...characters, person])
            /*.then((response) => {
                console.log(response.json())*/

                /*if(response.status === 201) {
                    setCharacters([...characters, person])
                }*/
            })
            .catch((error) => {
            console.log(error);
          })
    }
    

    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter = {removeOneCharacter}
            />
            <Form handleSubmit = {updateList} />
        </div>
    );
    
}

export default MyApp;