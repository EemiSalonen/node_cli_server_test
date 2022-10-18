const rds = require("readline-sync");
const express = require("express");
const { insertStyles } = require("./lib")

const path = "./pages/";
const tempPath = "./temp/"
const fs = require("fs");

const site = {
    files: []
};

// Creating website entry point and temporary folder to contain running files
if(fs.existsSync(tempPath)) fs.rmdirSync(tempPath, { recursive:true, force:true });
fs.mkdirSync(tempPath);
const indexName = rds.question("Give name for index file? (*.html) ");
const cssFile = rds.question("Styles file name? ");
fs.writeFileSync(tempPath + indexName, insertStyles(fs.readFileSync(path + indexName).toString(),fs.readFileSync(path + cssFile).toString()));
site.index = tempPath + indexName;

// Adding other files 
while(true) {
    const fileName = rds.question("Give file name (*.html) ")
    site.files.push({
        localPath: tempPath + fileName,
        sitePath: "/" + rds.question("Route for file? ")
    });

    const fileContent = fs.readFileSync(path + fileName).toString();
    const cssFileContent = fs.readFileSync(path + cssFile).toString();

    const formated = insertStyles(fileContent,cssFileContent);

    fs.writeFileSync(tempPath + fileName, formated);

    if(!rds.keyInYN("Press Y to add more, N to stop")) {        
        break;
    }
}

console.log("Files initialized: ");
console.log(`   Index: ${site.index}`);
for(let file of site.files) {
    console.log(`   ${file.localPath}, ${file.sitePath}`);
}

// Server 
const app = express();

app.listen(80,"localhost",() => {
    console.log("Listening on port 80");
});

// Set up index page
app.get("/", (req,res) => {
    console.log("Connected to root");
    res.sendFile(site.index,{ root: __dirname })
})

// Set up other pages
for(let file of site.files) {
    app.get(file.sitePath,(req, res) => {
        console.log(`Connecting to ${file.sitePath}`)
        res.sendFile(file.localPath,{ root:__dirname});
    })
}