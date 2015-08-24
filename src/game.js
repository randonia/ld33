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
var pod_targets = [];
var LEVELS = ['LEVEL0', 'LEVEL1', 'LEVEL2'];
var curr_level = 0;
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
var GameState = {
    'PLAYING': 0x01,
    'DEAD': 0x02,
    'LEVEL_END': 0x04
};
var state = GameState.PLAYING;
var sound_bgm;
var sound_gunshot;
var sound_pod_fx;

function onAssetsComplete()
{
    build_world(0);
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
    sound_bgm = document.getElementById('bgm');
    if (sound_bgm)
    {
        sound_bgm.play();
    }
    sound_gunshot = document.getElementById('gun_shot');
    sound_gunshot.loop = false;
    sound_pod_fx = document.getElementById('pod_fx');
    sound_pod_fx.loop = false;
}
var grid;
var player;
// Collision manager
var cmgr;

function build_world(level_id)
{
    world = new PIXI.Container();
    DEBUGGFX.position = world.position;
    world.position.x = WIDTH * 0.5;
    world.position.y = HEIGHT * 0.5;
    var level_str = sprintf('LEVEL%s', this.curr_level);
    var keys = this[sprintf('%s_KEYS', level_str)];
    var map = this[sprintf('%s_MAP', level_str)];
    grid = new Grid(map, keys);
    world.addChild(grid.sprite);
    build_avatars(level_str);
    cmgr = new CollisionManager();
}

function build_avatars(level_str)
{
    // Don't forget to add their sprite to the world
    var entities = this[sprintf('%s_ENTITIES', level_str)];
    grid.build_entities(entities);
    for (var i = 0; i < game_objects.length; ++i)
    {
        world.addChild(game_objects[i].spriteContainer);
    };
}

function reset_references()
{
    player = undefined;
    for (var i in game_objects)
    {
        var go = game_objects[i];
        world.removeChild(go.spriteContainer);
        delete game_objects[i];
    }
    game_objects = [];
    pod_targets = [];
    for (var eid in gui_elements)
    {
        gui_elements[eid].visible = false;
    }
    state = GameState.PLAYING;
}

function build_gui()
{
    GUI = new PIXI.Container();
    // You died gui
    build_dead_gui();
    // Victory gui
    build_victory_gui();
}

function build_victory_gui()
{
    var victory_gui = new PIXI.Container();
    victory_gui.position.x = WIDTH * 0.5;
    victory_gui.position.y = HEIGHT * 0.5;
    var shade = new PIXI.Graphics();
    shade.beginFill(0x003300, 0.2);
    shade.drawRect(0, 0, WIDTH, HEIGHT);
    shade.position.x = -victory_gui.position.x;
    shade.position.y = -victory_gui.position.y;
    victory_gui.addChild(shade);
    var winColor = 0x00e62e;
    var vic_gui_opts = {
        font: '32px Trebuchet MS',
        align: 'center',
        fill: winColor,
        stroke: 'black',
        strokeThickness: 3,
        wordWrapWidth: 400,
        wordWrap: true
    }
    var win_str = (this.curr_level < LEVELS.length - 1) ? 'All citizens in this zone converted' : 'All citizens converted';
    var win_text = new PIXI.Text(win_str + '\nGood work.', vic_gui_opts);
    win_text.position.x = -Math.floor(win_text.width * 0.5);
    victory_gui.addChild(win_text);
    var continue_gui_opts = {
        font: '18px Trebuchet MS',
        size: 20,
        align: 'center',
        fill: winColor,
        stroke: 'black',
        strokeThickness: 3,
        wordWrapWidth: 350,
        wordWrap: true
    }
    var continue_str;
    if (this.curr_level < LEVELS.length - 1)
    {
        continue_text = new PIXI.Text('Press [E] to Go to next level', continue_gui_opts);
    }
    else
    {
        win_text.position.y = -200;
        continue_text = new PIXI.Text('Press [E] to End the game and restart', continue_gui_opts);
        var gg_opts = {
            font: '18px Trebuchet MS',
            size: 20,
            align: 'center',
            fill: winColor,
            stroke: 'black',
            strokeThickness: 3,
            wordWrapWidth: 600,
            wordWrap: true
        }
        var gg_str = 'Made by @zambini845\nThanks for playing!\nIf you would like to build levels, check out the README.\nHope you had fun and got to make a great game during #LDJAM!';
        var gg_text = new PIXI.Text(gg_str, gg_opts);
        gg_text.position.x = -Math.floor(gg_text.width * 0.5);
        gg_text.position.y = continue_text.position.y + 100;
        victory_gui.addChild(gg_text);
    }
    continue_text.position.x = -Math.floor(continue_text.width * 0.5);
    continue_text.position.y = win_text.position.y + 150;
    victory_gui.addChild(continue_text);
    victory_gui.visible = false;
    GUI.addChild(victory_gui);
    gui_elements['victory_gui'] = victory_gui;
}

function build_dead_gui()
{
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
        case GameState.PLAYING:
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
        case GameState.DEAD:
            if (this.waitingForTween)
            {
                break;
            }
            if (Input.keyPressed(Keys.R))
            {
                console.log('Restart the game');
                restartGame(this.curr_level);
            }
            break;
        case GameState.LEVEL_END:
            if (this.waitingForTween)
            {
                break;
            }
            if (Input.keyPressed(Keys.E))
            {
                if (curr_level == LEVELS.length - 1)
                {
                    // At the end of level queue
                    restartGame();
                }
                else
                {
                    loadLevel(curr_level + 1);
                }
            }
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

function endGame(victory)
{
    if (victory)
    {
        // Do next level or full win
        build_victory_gui()
        gui_elements['victory_gui'].visible = true;
        gui_elements['victory_gui'].alpha = 0;
        state = GameState.LEVEL_END;
        // Tween that mofo in
        this.waitingForTween = true;
        var tweenIn = new TWEEN.Tween(
        {
            'alpha': 0
        }).to(
        {
            'alpha': 1
        }, 1200).easing(TWEEN.Easing.Quadratic.In).onUpdate(function()
        {
            gui_elements['victory_gui'].alpha = this.alpha;
        }).onComplete(function()
        {
            waitingForTween = false;
        }).start();
    }
    else
    {
        gui_elements['dead_gui'].visible = true;
        gui_elements['dead_gui'].alpha = 0;
        state = GameState.DEAD;
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
}

function loadLevel(level_index)
{
    reset_references();
    this.curr_level = level_index;
    build_world(this.curr_level);
}

function restartGame(level)
{
    reset_references();
    this.curr_level = (level) ? level : 0;
    loadLevel(this.curr_level);
    state = GameState.PLAYING;
}

function checkVictory()
{
    if (pod_targets.length == 0)
    {
        console.log('victory!');
        endGame(true);
    }
}

function animate(delta)
{
    requestAnimationFrame(animate);
    renderer.render(world);
    renderer.render(GUI);
    //renderer.render(DEBUGTEXT);
    renderer.render(DEBUGGFX);
}