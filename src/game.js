// Game Constants
var HEIGHT = 480;
var WIDTH = 640;
// Init PIXI
var game_container = document.getElementById('game-container');
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
renderer.clearBeforeRender = false;
game_container.appendChild(renderer.view);
// Asset loading
// Sprite creation
var assets_to_load = ['assets/sheets/player.json'];
PIXI.loader.add(assets_to_load).on('progress', function(loader, resource)
{
    console.log('Loader progress on ' + resource.url + '[' + loader.progress + ']');
}).load(onAssetsComplete);
var world;
var game_objects = [];
// Build Keys.* to map to their keyCodes
Keys = {};
Input = {
    'keysCurrDown':
    {},
    'keysLastDown':
    {},
    'keyPressed': function(keyCode)
    {
        return this.keysCurrDown[keyCode] && !this.keysLastDown[keyCode]
    },
    'keyDown': function(keyCode)
    {
        return this.keysCurrDown[keyCode];
    },
    'toDebugString': function()
    {
        var result = 'CurrKeys: { ';
        for (var key in this.keysCurrDown)
        {
            result += String.fromCharCode(key) + ' ';
        }
        result += ' }\n';
        result += 'LastKeys: { ';
        for (var key in this.keysLastDown)
        {
            result += String.fromCharCode(key) + ' ';
        }
        return result + ' }';
    }
};
onkeydown = function(event)
{
    Input.keysCurrDown[event.keyCode] = true;
}
onkeyup = function(event)
{
    delete Input.keysCurrDown[event.keyCode];
}
for (var kc = 65; kc <= 90; kc++)
{
    Keys[String.fromCharCode(kc)] = kc;
};
var dbg_text_opts = {
    font: '12px Arial',
    fill: '#00ff00',
    stroke: 'black',
    strokeThickness: 3
}
var DEBUGTEXT = new PIXI.Text('Debug', dbg_text_opts);
DEBUGTEXT.position.x = 10;
DEBUGTEXT.position.y = 10;
var DEBUGGFX = new PIXI.Graphics();

function onAssetsComplete()
{
    build_world();
    requestAnimationFrame(animate);
    var FPS = 60;
    var last_frame = +new Date;
    setInterval(function()
    {
        var curr_frame = +new Date;
        var delta = (curr_frame - last_frame) * 0.001;
        update(delta);
        last_frame = curr_frame;
    }, 1000 / FPS);
}
var grid;
var player;
var civ;
var police;
// Collision manager
var cmgr;

function build_world()
{
    world = new PIXI.Container();
    DEBUGGFX.position = world.position;
    world.position.x = WIDTH * 0.5;
    world.position.y = HEIGHT * 0.5;
    grid = new Grid(LEVEL1_MAP, LEVEL1_KEYS);
    world.addChild(grid.sprite);
    // Create the game objects
    player = new Player();
    civ = new Civilian();
    civ.gPos = Vec(4, 0)
    police = new Police();
    police.gPos = Vec(4, -4);
    game_objects.push(civ);
    game_objects.push(player);
    game_objects.push(police);
    // Don't forget to add their sprite to the world
    for (var i = 0; i < game_objects.length; ++i)
    {
        world.addChild(game_objects[i].spriteContainer);
    };
    cmgr = new CollisionManager();
}

function update(delta)
{
    DEBUGTEXT.text = Input.toDebugString();
    DEBUGGFX.clear();
    cmgr.clearTheGrid();
    for (var i = game_objects.length - 1; i >= 0; i--)
    {
        cmgr.addToTheGrid(game_objects[i]);
    };
    // Oh baby this is a big line
    DEBUGTEXT.text += sprintf('\nPlayer N: [%s]\nPlayer E: [%s]\nPlayer S: [%s]\nPlayer W: [%s]', cmgr.gridCheck(player.gPos.plus(Vec(0, -1))), cmgr.gridCheck(player.gPos.plus(Vec(1, 0))), cmgr.gridCheck(player.gPos.plus(Vec(0, 1))), cmgr.gridCheck(player.gPos.plus(Vec(-1, 0))));;
    var civ2plr = Vec2.angleBetween(player.pos.minus(civ.pos), DirVec.SOUTH);
    DEBUGTEXT.text += sprintf('\nCiv->Player angle: [%f]', civ2plr);
    for (var i = game_objects.length - 1; i >= 0; i--)
    {
        game_objects[i].update(delta);
    };
    DEBUGTEXT.text += sprintf('\nPlayer grid position: %s', player.gPos.toString());
    DEBUGTEXT.text += sprintf('\nPlayer position: %s', player.pos.toString());
    // Clean up keysLastDown
    for (var key in Input.keysLastDown)
    {
        delete Input.keysLastDown[key];
    }
    for (var key in Input.keysCurrDown)
    {
        Input.keysLastDown[key] = Input.keysCurrDown[key];
    }
}

function animate(delta)
{
    requestAnimationFrame(animate);
    renderer.render(world);
    renderer.render(DEBUGTEXT);
    renderer.render(DEBUGGFX);
}