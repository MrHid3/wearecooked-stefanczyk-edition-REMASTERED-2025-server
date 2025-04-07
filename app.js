const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.set('port', port);

let people = [{
        name: "John",
        password: "Doe"
    }]

app.post("/sendPeople", function (req, res) {
    console.log(people)
    if(req.body.name == undefined || req.body.name.length == 0){
        res.status(400).send("NONAME")
        return
    }
    if(req.body.password == undefined || req.body.password.length == 0){
        res.status(400).send("NOPASSWORD")
        return
    }
    for(let i = 0; i < people.length; i++){
        if(people[i].name === req.body.name){
            res.status(400).send("USEREXISTS")
            return;
        }
    }
    people.push({
        name: req.body.name,
        password: req.body.password
    })
    res.status(200).send("OK")
})

app.get("/", (req, res) => {
    res.send("siema");
})

app.post("/getPeople", function (req, res) {
    console.log(people)
    res.send(JSON.stringify(people));
})

app.listen(port, function () {
    console.log("start serwera na porcie " + port )
})

// app.use(express.static('static'));