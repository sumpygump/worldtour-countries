const Handlebars = require('handlebars');
const fs = require('fs');
const pnfs = require("pn/fs");
const svg2png = require("svg2png");

const MAP_TEMPLATE = 'maps/templates/_map-world-template.svg';
const DEST_DIR_SVG = 'maps/';
const DEST_DIR_PNG = '../media/maps/';

const mapdata = require("./map-data.json");
 
var source = fs.readFileSync(MAP_TEMPLATE, 'utf8');

const COLOR_GREY = '#d2d2d2';
const COLOR_DARK_GREY = '#706f6f';
const COLOR_PINK = '#e22781';
const COLOR_YELLOW = '#fbc90d';

// prepend with id (e.g. '#ai .landxx { ... }')
const CSS_CIRCLE_LAND = ' .landxx { fill: #e22781; stroke-width: 1px; stroke: #e22781; }';

// prepend with id (e.g. '#ai_ { ... }')
const CSS_CIRCLE_CIRC = '_ { opacity: 0.5; stroke: #e22781; fill: transparent; }';

var default_context = {
  viewBox: '0 0 2560 1314',
  width: 1260,
  height: 1000,
  overrideCss: '',
  region_fills: {
      'africa': COLOR_GREY, 
      'asia': COLOR_GREY, 
      'east_asia': COLOR_GREY, 
      'west_asia': COLOR_GREY, 
      'russia': COLOR_GREY, 
      'europe': COLOR_GREY, 
      'north_america': COLOR_GREY, 
      'central_america': COLOR_GREY, 
      'south_america': COLOR_GREY, 
      'oceania': COLOR_GREY, 
  }
};

function renderMap (country) {
    var dest_svg_filename = DEST_DIR_SVG + 'world-' + country.name + '-map.svg';
    var dest_png_filename = DEST_DIR_PNG + 'world-' + country.name + '-map.png';

    // If the png already exists, skip
    if (fs.existsSync(dest_png_filename)) {
        return;
    }
    process.stdout.write(" - " + country.name + "...");

    var template = Handlebars.compile(source);
    // Doing it this way to get fresh context obj each pass.
    var context = JSON.parse(JSON.stringify(default_context));

    // Set the viewBox from the defined region if exists
    if (country.vbregion) {
        context.viewBox = mapdata.regions[country.vbregion].viewBox;
        if (mapdata.regions[country.vbregion].width) {
            context.width = mapdata.regions[country.vbregion].width;
        }
        if (mapdata.regions[country.vbregion].height) {
            context.height = mapdata.regions[country.vbregion].height;
        }
    }

    // Highlight any targeted class names (codes)
    if (country.codes) {
        for (var code of country.codes) {
            context.overrideCss += "." + code + "{ fill:" + COLOR_PINK + ";}\n"; 
        }
    }

    // Highlight single targeted country class name (code)
    if (country.code) {
        context.overrideCss += "." + country.code + "{ fill:" + COLOR_PINK + ";}\n"; 
    }

    if (country.in) {
        context.region_fills[country.in] = COLOR_DARK_GREY;
    }

    if (country.in && !country.vbregion) {
        context.viewBox = mapdata.regions[country.in].viewBox;
        if (mapdata.regions[country.in].width) {
            context.width = mapdata.regions[country.in].width;
        }
        if (mapdata.regions[country.in].height) {
            context.height = mapdata.regions[country.in].height;
        }
    }

    // Set viewBox dims if exist
    if (country.viewBox) {
        context.viewBox = country.viewBox;
    }

    // If we need to circle the country, do so
    if (country.circle) {
        var css = "#" + country.circle + CSS_CIRCLE_LAND
            + '#' + country.circle + CSS_CIRCLE_CIRC;
        context.overrideCss += css;
    }

    process.stdout.write('.');

    // Generate the SVG with context updates
    var generated = template(context);
    process.stdout.write('.');

    fs.writeFileSync(dest_svg_filename, generated);
    process.stdout.write('.');

    var input = fs.readFileSync(dest_svg_filename);
    var output = svg2png.sync(input);
    process.stdout.write('.');
    fs.writeFileSync(dest_png_filename, output);
    process.stdout.write('.');
    console.log('done!');
}

// First get a count of how many we need to generate
var count = 0;
for (var country of mapdata.countries) {
    var dest_png_filename = DEST_DIR_PNG + 'world-' + country.name + '-map.png';
    if (!fs.existsSync(dest_png_filename)) {
        count++;
    }
}
console.log(count + " maps to generate.");

// Generate them!
for (var country of mapdata.countries) {
    renderMap(country);
}
