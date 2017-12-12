# WorldTour Geography - Countries

This repository is for generating the data for a WorldTour Anki deck for maps
and flags of countries and territories of the world.

## Flags

## Generate Maps

Maps are generated from a SVG file of the world, with a viewBox centered in
the appropriate area and the countries "highlighted" appropriately. There are
classes attached the country paths in the SVG file that can have a fill applied
to them.

Use `svg2png` (npm install svg2png) to convert the SVG to a png.

From the `src/maps` directory run a command similar to the following:

```
$ svg2png map-anguilla.svg -o ../../media/maps/world-anguilla-map.png
```
