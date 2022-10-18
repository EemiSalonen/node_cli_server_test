const express = require("express");

function serverStart(control) {
    const app = express();

    app.listen(80,"localhost",() => {
        console.log("Listening on port 80");
    });

    // Set up index page
    app.get("/", (req,res) => {
        console.log("Connected to root");
        res.sendFile(control.indexFile,{ root: __dirname })
    })

    // Set up other pages
    for(let file of control.files) {
        app.get(file.route,(req, res) => {
            console.log(`Connecting to ${file.route}`)
            res.sendFile(file.location,{ root:__dirname});
        })
    }
}

module.exports = { serverStart };