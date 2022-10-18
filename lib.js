function formatCss(css) {
    const string = "<style> " + css + " </style>";
    return string;
}

function insertStyles(html,css) {
    const formatedCss = formatCss(css);
    let firstHalf = html.slice(0,html.indexOf("d") + 2);
    firstHalf = firstHalf.concat(formatedCss);
    const secondHalf = html.slice(html.indexOf("d") + 2);
    const merged = firstHalf.concat(secondHalf);

    for(let i = 0; i < html.length;i++) {
        
    }
    return merged;
}

module.exports = { insertStyles };