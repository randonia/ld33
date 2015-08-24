# Ludum Dare 33
![][20]  
Definitely Human  
[Play online][9]  
[Source][10]



## You Are The Monster ##
You are the monster. You've landed on Earth with one goal in mind: enslave humanity. Luckily, through millenia of superior gene manipulation, when you merely touch a lower life form, you immediately start the conversion process, turning them green and letting you proceed to the next level

### Goal ###
Convert every NPC. But don't get caught. You aren't bulletproof. Merely walk up behind someone and touch them to convert.

### Controls ###

   + WASD - Movement

### Release Notes ###

+ On slower machines, the end-level logic might appear to freeze. I used Tweenjs for the transitions, and that seems to not behave well sometimes. I tested this in Chrome on Windows7 on an ASUS netbook, and everything ran as expected except for the level-ending gui.

This LDJAM was all about learning JavaScript and respective libraries for game development. Granted this code is jam quality, but it serves as a good foundation for future projects in terms of what to do and not to do for production quality games.  
[Tweet @zambini845](https://twitter.com/zambini845)  
[Personal Website](http://randonia.com)



### Adding new maps ###

I ran out of time, so generating interesting and puzzling level ideas wasn't something I was able to put together in time, but it's open to extension by you (aren't game jams fun).  
Adding new maps is a simple process. There are only a few steps required. 

1) Create a new level data file in src/data/ named 'levelX.js', where X is the zero indexed number.  
2) Add to the data file three properties:  
   **LEVELX_KEYS** - dictionary of character keys for defining tiles.

      '0': {'sprite': 'ground_0', 'passable': true},      // dirt
      '1': {'sprite': 'ground_1', 'passable': true},      // grass
      'X': {'sprite': 'ground_2', 'passable': true},      // pavement

   `'0'` is the key used in LEVELX_MAP  
   `'sprite'` is the id of the sprite loaded into the spritesheet  
   `'passable'` defines whether or not this tile blocks player movement  

   **LEVELX_ENTITIES** - array holding instance definitions for the player and enemies

      { type: 'player',   direction: Direction.SOUTH , pos: Vec(-1, 0)},
      { type: 'police',   direction: Direction.WEST , pos: Vec(8, 1)},
      { type: 'civilian', direction: Direction.SOUTH , pos: Vec(4, 0)},
   `'type'` - choose from `['player', 'police', 'civilian']`  
   `'direction'` - Choose a cardinal `NORTH, EAST, SOUTH, WEST` from `Direction`  
   `'pos'` - grid coordinates of the instance's position
    
   **LEVELX_MAP** - array of strings defining the map layout. The strings use character keys defined in `LEVELX_KEYS` to determine what goes where. Ultimtately, levels are generated simply by parsing each  line of `LEVELX_MAP` and using the character value to convert it into a tile object.

       'XXXXXXXXXXXXXXXXXXXXXX',
       'X00010000000000000000X',
       'X000100HrJ01110000000X',
       'X000111BNB11f11111111X',
3) Finally, add your new level's name to `game.js`'s level array property.
        
        var LEVELS = ['LEVEL0', 'LEVEL1', 'LEVEL2', 'LEVELX'];


### Serving files locally ###
The easiest way to serve files locally is to use Python2.7. Run

    python serve2.7.py

which has a monkey patch for Windows to make it not slow

#### Libraries/Frameworks/Tools ####
* [PIXI][1]
* [sprintf][2]
* [tween.js][7]
* [Pyxel Editor][3]
* [Sublime Text][4]
* [SunVox][11]
* [TexturePacker][8]
* [Open Broadcaster Software][5]
* [Python 2.7][6] to serve locally on Windows


[1]: http://www.pixijs.com/
[2]: https://github.com/alexei/sprintf.js
[3]: http://pyxeledit.com/
[4]: http://www.sublimetext.com/
[5]: https://obsproject.com/
[6]: http://python.org
[7]: https://github.com/tweenjs/tween.js
[8]: https://www.codeandweb.com/texturepacker
[9]: http://randonia.com/ld33
[10]: https://github.com/randonia/ld33
[11]: www.warmplace.ru/soft/sunvox/

[20]: [https://raw.githubusercontent.com/randonia/ld33/screenshots/screenshots/screenshot_1.PNG]
[21]: [https://raw.githubusercontent.com/randonia/ld33/screenshots/screenshots/screenshot_2.PNG]
[22]: [https://raw.githubusercontent.com/randonia/ld33/screenshots/screenshots/screenshot_3.png]
