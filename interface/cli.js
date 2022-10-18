const { Control } = require("./control");
const rds = require("readline-sync");

function runMenu(control) {
    console.log("-----------------------")
    console.log("Node Server for console");
    console.log("-----------------------\n");

    while(true) {
        console.log("(0) Start server\n(1) Initialize server\n(2) Change index file\n(3) Change stylesheet\n(4) Add files");
        const input = Number(rds.question(""));

        switch (input) {
            case 0:
                return;
            case 1:
                control.init();
                console.log("Server initialized")
                break;
            case 2:
                const newIndex = rds.question("New index file: ");
                break;
            case 3: 
                const newStylesheet = rds.question("New stylesheet: ");
                break;
        }
    }
};

module.exports = { runMenu };