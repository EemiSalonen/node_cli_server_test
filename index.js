const { Control } = require("./interface/control");
const { runMenu } = require("./interface/cli");
const { serverStart } = require("./server-engine")

const control = new Control();

runMenu(control);

serverStart(control);