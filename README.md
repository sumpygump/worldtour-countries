# WorldTour Geography - Countries

This repository is for generating the data for a WorldTour Anki deck for maps
and flags of countries and territories of the world.

## Install into Anki

The easiest way to get this into Anki is to open the .apkg file. This is a
ready to go archive that will be imported directly into Anki. You can find this
file on the [releases page of this repository](https://github.com/sumpygump/worldtour-countries/releases).

You can download the deck from ankiweb as well here: https://ankiweb.net/shared/info/596859658

## Import into Anki

The instructions below are if you want to create this deck from scratch.
If you wish to make changes and then import the updates into Anki, you can
import the decks manually.

This repository contains all the required image files and a CSV of the notes
data for import into Anki.

### Copy Media Files

You need to copy the files from media/flags and media/maps into your Anki
collection.media directory.

Example (on MacOS):
```
$ cp media/flags/*.svg ~/Library/Application\ Support/Anki2/User\ 1/collection.media
$ cp media/maps/*.png ~/Library/Application\ Support/Anki2/User\ 1/collection.media
```

## Flags

The flags are all SVG files from wikipedia. These SVG files are in the public
domain and are stored in the directory media/flags in this repository.

## Maps

The maps are generated from a SVG file of the world, with a viewBox centered in
the appropriate area and the countries "highlighted" appropriately. There are
classes attached the country paths in the SVG file that can have a fill applied
to them.

First you need to have [node](https://nodejs.org/en/) installed and npm. From
the root directory of this repository, run `npm install` to install the
dependencies defined in package.json.

From the `src` directory run the following script to generate the maps:

```
$ node generate-maps.js
```

This reads definition information from the file `map-data.json` to create an
SVG file of the specific country and then a png from that svg file. It uses svg2png
library to generate the png file.

### map-data.json file

The map data file contains the following nodes:

```
{
  "general": {
    "width": "1260",
    "height": "1000"
  },
  "regions": {
    "west_asia": {"viewBox": "1450 260 480 420"},
    # ....
  },
  "countries": {
    {"name": "afghanistan", "in": "west_asia", "code": "af"},
    # ...
  }
}
```

In the `general` section are defined defaults for generating the svg file. For
now it is just the default width and height, that can be overridden by region
or country definition.

The `regions` section defines a dictionary of region names and the
corresponding viewBox properties to use for the svg. This will provide a
default focus area of the SVG that centers in on the region of the earth. The
width and height values can also be overridden per region if needed.

The `countries` section defines properties for the generation script to use for
each country. In includes the following parameters:
a name of the country (will be used to generate
the filename) and the following other option parameters:

 - `name`: name of country or territory. Will be used to generate the filename.
 - `in`: name of region that country appears in. Will be used to center the
   viewbox and highlight the countries around it. This corresponds to name of
   the region in the section defined above as well as handlebar variables in
   the map svg template (`src/maps/templates/_map-world-template.svg`).
 - `code`: The country code of the country. Used to define which class or id is
   highlighted in the SVG template.
 - `circle`: Provide a class/id name to be used to also draw the circle, for
   countries that are smaller and have a surrounding circle defined.
 - `vbregion': Specify name of region to use these viewbox settings instead.
 - `viewBox`: Override viewbox attributes (if needed to be different from
   region or vbregion).


