const Handlebars = require('handlebars');
const fs = require('fs');
const pnfs = require("pn/fs");
const svg2png = require("svg2png");
 
var source = fs.readFileSync('templates/_map-world-template.svg', 'utf8');
var template = Handlebars.compile(source);

var context = {
  viewBox: '0 0 1260 1000',
  width: 1260,
  height: 1000,
  overrideCss: '.us { fill: red }',
};

var generated = template(context);

fs.writeFileSync('temp1.svg', generated);

pnfs.readFile("temp1.svg")
    .then(svg2png)
    .then(buffer => pnfs.writeFile("dest.png", buffer))
    .catch(e => console.error(e));
