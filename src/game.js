// Game Constants
var HEIGHT = 480;
var WIDTH = 640;
// Init PIXI
var game_container = document.getElementById('game-container');
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
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

function build_world()
{
    world = new PIXI.Container();
    // Create the game objects
    var player = new Player();
    player.pos.x = WIDTH * 0.5;
    player.pos.y = HEIGHT * 0.5;
    var go = new GameObject();
    game_objects.push(player);
    game_objects.push(go);
    // Don't forget to add their sprite to the world
    world.addChild(go.sprite);
    world.addChild(player.sprite);
}

function update(delta)
{
    for (var i = game_objects.length - 1; i >= 0; i--)
    {
        game_objects[i].update(delta);
    };
}

function animate(delta)
{
    requestAnimationFrame(animate);
    renderer.render(world);
}