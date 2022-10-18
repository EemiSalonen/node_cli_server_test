const rds = require("readline-sync");
const fs = require("fs");

class Control {
    rds;
    fs;
    indexFile; // used to load the first page 
    files; // used to load all other pages
    styleFile; // used to load styles
    path;
    tempPath;

    constructor() {
        this.files = [];
        this.rds = rds;
        this.fs = fs;
        this.path = "./pages/";
        this.tempPath = "./temp/"
    }

    setIndex(file) {
        this.indexFile = this.tempPath + file;
    }
    addHtml(file,r) {
        this.files.push(
        {
            location: this.tempPath + file,
            route: r
        }
        );
    }
    setStyle(file) {
        this.styleFile = this.tempPath + file;
    }

    formatCss(css) {
        const string = "<style> " + css + " </style>";
        return string;
    }
    
    insertStyles(html,css) {
        const htmlStr = this.fs.readFileSync(html).toString();
        const cssStr = this.fs.readFileSync(css).toString();
        const formatedCss = this.formatCss(cssStr);

        let firstHalf = htmlStr.slice(0,htmlStr.indexOf("d") + 2);
        firstHalf = firstHalf.concat(formatedCss);
        const secondHalf = htmlStr.slice(htmlStr.indexOf("d") + 2);
        const merged = firstHalf.concat(secondHalf);
    
        return merged;
    }

    createProdFile (html, css, location) {
        const merged = this.insertStyles(html,css);
        this.fs.writeFileSync(location, merged);
    }

    init() {
        if(this.fs.existsSync(this.tempPath)) this.fs.rmdirSync(this.tempPath, { recursive:true, force:true });
        this.fs.mkdirSync(this.tempPath);

        console.log("Initialize server");
        console.log("------------------------------ \n");

        console.log("Set style file: ");
        const styleFile = this.rds.question("") + ".css";
        this.setStyle(styleFile);
        console.log("------------------------------ \n");

        console.log("Set index file: ")
        const indexFile = this.rds.question("") + ".html";
        this.setIndex(indexFile);
        this.createProdFile(this.path + indexFile, this.path + styleFile, this.tempPath + indexFile);
        console.log("------------------------------ \n");

        while(true) {
            console.log("Add files: ");
            const file = rds.question("") + ".html";
            console.log("Add route: ")
            const route = "/" + rds.question("");

            this.addHtml(file, route);
            this.createProdFile(this.path + file, this.path + styleFile, this.tempPath + file);
            
            if(!rds.keyInYN("Press Y to add more, N to stop")) {        
                break;
            }
            console.log("------------------------------ \n");
        }
    }

}

module.exports = { Control };