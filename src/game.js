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
var GUI;
var gui_elements = {};
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
var GameSate = {
    'PLAYING': 0x01,
    'DEAD': 0x02
};
var state = GameSate.PLAYING;

function onAssetsComplete()
{
    build_world();
    build_gui();
    requestAnimationFrame(animate);
    var FPS = 60;
    var start_frame = +new Date;
    var last_frame = start_frame;
    setInterval(function()
    {
        var curr_frame = +new Date;
        var delta = (curr_frame - last_frame) * 0.001;
        TWEEN.update(curr_frame - start_frame);
        update(delta);
        last_frame = curr_frame;
    }, 1000 / FPS);
}
var grid;
var player;
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
    build_avatars();
    cmgr = new CollisionManager();
}

function build_avatars()
{
    // Don't forget to add their sprite to the world
    grid.build_entities(LEVEL1_ENTITIES);
    for (var i = 0; i < game_objects.length; ++i)
    {
        world.addChild(game_objects[i].spriteContainer);
    };
}

function reset_references()
{
    player = undefined;
}

function build_gui()
{
    GUI = new PIXI.Container();
    var dead_gui = new PIXI.Container();
    dead_gui.position.x = WIDTH * 0.5;
    dead_gui.position.y = HEIGHT * 0.5;
    var shade = new PIXI.Graphics();
    shade.beginFill(0x000000, 0.4);
    shade.drawRect(0, 0, WIDTH, HEIGHT);
    shade.position.x = -dead_gui.position.x;
    shade.position.y = -dead_gui.position.y;
    dead_gui.addChild(shade);
    var dead_gui_opts = {
        font: '32px Trebuchet MS',
        fill: '#a4001e',
        stroke: 'black',
        strokeThickness: 3
    }
    var dead_text = new PIXI.Text('You were caught', dead_gui_opts);
    dead_text.position.x = -Math.floor(dead_text.width * 0.5);
    dead_gui.addChild(dead_text);
    var continue_gui_opts = {
        font: '18px Trebuchet MS',
        size: 20,
        fill: '#a4001e',
        stroke: 'black',
        strokeThickness: 3
    }
    var continue_text = new PIXI.Text('Press [R] to Restart', continue_gui_opts);
    continue_text.position.x = -Math.floor(continue_text.width * 0.5);
    continue_text.position.y = dead_text.position.y + 50;
    dead_gui.addChild(continue_text);
    dead_gui.visible = false;
    GUI.addChild(dead_gui);
    gui_elements['dead_gui'] = dead_gui;
}

function update(delta)
{
    DEBUGTEXT.text = Input.toDebugString();
    DEBUGGFX.clear();
    switch (state)
    {
        case GameSate.PLAYING:
            cmgr.clearTheGrid();
            for (var i = game_objects.length - 1; i >= 0; i--)
            {
                cmgr.addToTheGrid(game_objects[i]);
            };
            // Oh baby this is a big line
            DEBUGTEXT.text += sprintf('\nPlayer N: [%s]\nPlayer E: [%s]\nPlayer S: [%s]\nPlayer W: [%s]', cmgr.gridCheck(player.gPos.plus(Vec(0, -1))), cmgr.gridCheck(player.gPos.plus(Vec(1, 0))), cmgr.gridCheck(player.gPos.plus(Vec(0, 1))), cmgr.gridCheck(player.gPos.plus(Vec(-1, 0))));;
            for (var i = game_objects.length - 1; i >= 0; i--)
            {
                game_objects[i].update(delta);
            };
            DEBUGTEXT.text += sprintf('\nPlayer grid position: %s', player.gPos.toString());
            DEBUGTEXT.text += sprintf('\nPlayer position: %s', player.pos.toString());
            break;
        case GameSate.DEAD:
            if (this.waitingForTween)
            {
                break;
            }
            else
            {
                if (Input.keyPressed(Keys.R))
                {
                    console.log('Restart the game');
                    restartGame();
                }
            }
            break;
    }
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

function endGame()
{
    gui_elements['dead_gui'].visible = true;
    gui_elements['dead_gui'].alpha = 0;
    state = GameSate.DEAD;
    // Tween that mofo in
    this.waitingForTween = true;
    var tweenIn = new TWEEN.Tween(
    {
        'alpha': 0
    }).to(
    {
        'alpha': 1
    }, 2000).easing(TWEEN.Easing.Quadratic.In).onUpdate(function()
    {
        gui_elements['dead_gui'].alpha = this.alpha;
    }).onComplete(function()
    {
        waitingForTween = false;
    }).start();
}

function restartGame()
{
    for (var i in game_objects)
    {
        var go = game_objects[i];
        world.removeChild(go.spriteContainer);
        delete game_objects[i];
    }
    game_objects = [];
    gui_elements['dead_gui'].visible = false;
    reset_references();
    build_avatars();
    state = GameSate.PLAYING;
}

function animate(delta)
{
    requestAnimationFrame(animate);
    renderer.render(world);
    renderer.render(GUI);
    renderer.render(DEBUGTEXT);
    renderer.render(DEBUGGFX);
}