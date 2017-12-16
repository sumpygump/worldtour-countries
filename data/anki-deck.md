# Anki Deck Definition

This file provides details on creating the WorldTour Geography Deck from
scratch.

First, create the required note types and then create the (four) decks and then
import into those decks, selecting the correct note types for each. Use the
file countries.anki.csv to import.

## Note Types

In Anki, under Tools | Manage Note Types... create a new set of note types

Fields
 - Name
 - Code
 - Description
 - Capital
 - Flag
 - Map

There are three note types (to support separate card types for each) but they
all share the same fields above.

Note Types

- "WorldTour Geography (capitals)"
- "WorldTour Geography (flags)"
- "WorldTour Geography (maps)"

## Cards for Note Type: "WorldTour Geography (capitals)"

For this note type, create two card types: Capital and Capital R (reverse)

### Card Type Capital
Front Template:
```
{{Capital}} is the capital of...
```

Styling:
```
.card {
 font-family: arial;
 font-size: 30px;
 text-align: center;
 color: black;
}

.map {height:80%;}
.map img {width: 100%;}
.flag {height:80%;}
.flag .img {width: 100%;}
.flag .img img{border:1px solid black;height: 90%}

#answer{height:20%; }
```

Back Template:
```
{{FrontSide}}

<hr id=answer>

{{Name}}<br />
{{Description}}
```

### Card Type Capital R
Front Template:
```
The capital of {{Name}} is...
```

Styling:
```
.card {
 font-family: arial;
 font-size: 30px;
 text-align: center;
 color: black;
}

.map {height:80%;}
.map img {width: 100%;}
.flag {height:80%;}
.flag .img {width: 100%;}
.flag .img img{border:1px solid black;height: 90%}

#answer{height:20%; }
```

Back Template:
```
{{FrontSide}}

<hr id=answer>

{{Capital}}
```

## Cards for Note Type: "WorldTour Geography (flags)"

Front Template:
```
<div class="flag"><div class="img">{{Flag}}</div></div>
```

Styling:
```
.card {
 font-family: arial;
 font-size: 30px;
 text-align: center;
 color: black;
}

.map {height:80%;}
.map img {height: 100%;}
.flag {height:80%;}
.flag .img {width: 100%;}
.flag .img img{border:1px solid black;height: 90%}

#answer{height:20%; }
```

Back Template:
```
{{FrontSide}}

<div id="answer">
  <hr>
  {{Name}}<br />
  {{Description}}     
</div>
```

## Cards for Note Type: "WorldTour Geography (maps)"

Front Template:
```
<div class="map">{{Map}}</div>
```

Styling:
```
.card {
 font-family: arial;
 font-size: 30px;
 text-align: center;
 color: black;
}

.map {height:80%;}
.map img {height: 100%;}
.flag {height:80%;}
.flag .img {width: 100%;}
.flag .img img{border:1px solid black;height: 90%}

#answer{height:20%; }
```

Back Template:
```
{{FrontSide}}

<div id="answer">
  <hr>
  {{Name}}<br />
  {{Description}}     
</div>
```

## Create Decks 

Create the following decks. (The "::" will create a nested set). This will
allow users to study the maps, flags and capitals separately or together if
they choose.

- WorldTour Geography Countries
- WorldTour Geography Countries::Capitals
- WorldTour Geography Countries::Flags
- WorldTour Geography Countries::Maps

## Import Data

You will have to import the CSV file three times, one for each sub-deck above.

1. Click "Import File" and select the file.
1. Select the correct Type (note type that matches the deck you are importing
   into)
1. Select the correct Deck (matching the note type)
1. Fields are separated by commas
1. Make sure the check the box "Allow HTML in fields"
1. The table of field mapping should match the fields in the CSV as described above
