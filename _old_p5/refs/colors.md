# Colors / colours - but most coding uses US spelling :-(

The colors in p5play are those from the "p5.js" library
- https://p5js.org/


## Where to use colors in your page

When writing code fro  Sprite you can change the colors for:
- inside fill (color)
- outline (stroke) 
- text (textColor)

e.g.

```javascript
sprite.color = "blue"; // filled blue
sprite.stroke = "yellow"; // yellow outline
sprite.textColor = "blue"; // red text 
```




## Common colors

- Basics
    - red, orange, yellow, green, blue, purple, pink, brown, black, white, gray

- Reds/pinks
    - crimson, salmon, coral, tomato, firebrick, hotpink, deeppink, lightpink

- Oranges/yellows
    - gold, goldenrod, darkorange, orangered, khaki, lemonchiffon

- Greens
    - lime, limegreen, lightgreen, seagreen, forestgreen, darkgreen, olive, springgreen, teal

- Blues
    - cyan, aqua, skyblue, lightblue, deepskyblue, dodgerblue, royalblue, navy, steelblue, turquoise

- Purples
    - violet, magenta, fuchsia, orchid, plum, lavender, indigo, mediumpurple, darkviolet

- Browns/neutrals
    - tan, beige, chocolate, sienna, peru, sandybrown, ivory, silver, dimgray, slategray


## Full list of CSS (web standards) colors
 
see: https://developer.mozilla.org/en-US/docs/Web/CSS/named-color


## HEX color codes

These are hexadecimal (base 16) color codes amounts of RBG- Red Green Blue,  from 00 (none) to FF (255 - maximum)

You can create  your own shades with HEX codes like this:


```javascript
sprite.color = '#FF64FF';
sprite.color = '#FF0000'; // all red, no green, no blue
sprite.color = '#0000FF'; // no red / no green / all blue
```

HINTS:
- don't forget the '#' hash symbol and quotes...
- hover and click over a HEX color codfe in Celbridge editor, and you'll get a nice colour picker, which will write the HEX code for you :-)

## p5 color objects (amounts of RBG- Red Green Blue)

Since p5play uses P% `color` objects, you can also use integer values (0..255) to declare P5 color objects.

The function name is `color` and you pass in values for red, green and blue (just like for HEX, but with integers).

```javascript
let pink = color(255, 100, 255);
sprite.color = pink;
```



  - You can also use hex strings ( or a p5 color object (sprite.color = color(255, 87, 51);) for exact shades.
  - If you don't set a color, p5play gives each sprite a random one.
  - Related properties take the same values: sprite.stroke (outline color) and sprite.textColor.


## Color table

All the named colors, with their HEX codes (see also [color_table.html](color_table.html)):


