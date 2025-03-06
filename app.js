const cors = require('cors');
const express = require('express');
const data = require("./data/avatars.json")

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.set('port', port);

app.get("/data", function (req, res) {
    res.json(data)
})

app.listen(port, function () {
    console.log("start serwera na porcie " + port )
})

// app.use(express.static('static'));