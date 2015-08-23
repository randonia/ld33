/*
 * GameObject class. All displayed items use this.
 */
// Some trixie hacky setup of enums
var GameObjectState = {
    'list': ['IDLE', 'MOVING', 'FLEEING', 'ATTACKING', 'DEAD'],
    'NONE': 0x00
};
for (var i in GameObjectState.list)
{
    GameObjectState[GameObjectState.list[i]] = 0x01 << i;
};
delete GameObjectState.list;
var Tag = {
    'list': ['PLAYER', 'POLICE', 'TERRAIN', 'CIVILIAN'],
    'NONE': 'NONE',
    'IGNORE': 0xFF
};
delete Tag.list;
for (var p in Tag.list)
{
    Tag[Tag.list[p]] = 0x01 << p;
}
var Direction = {
    'list': ['NORTH', 'EAST', 'SOUTH', 'WEST']
};
for (var d in Direction.list)
{
    Direction[Direction.list[d]] = 0x01 << d;
    // This one needs to go back and forth too
    Direction[0x01 << d] = Direction.list[d];
}
var DirVec = {
    'NORTH': Vec(0, -1),
    'EAST': Vec(1, 0),
    'SOUTH': Vec(0, 1),
    'WEST': Vec(-1, 0)
};
var MOVE_STOP_THRESHOLD = 1;

function GameObject()
{
    this.tag = Tag.NONE;
    this.pos = Vec(0, 0);
    this.gPos = Vec(0, 0);
    this.size = Vec(3, 3);
    this.spriteContainer = new PIXI.Container();
    this.setSprite(this.buildSprite());
    this.state = GameObjectState.IDLE;
    this.moveSpeed = 2 * 32; // 1/2 a second per grid
    this.deltaMovement = null;
    this.facingDirection = Direction.SOUTH;
    // Take that, entropy!
    this.animationName = sprintf('%f%f%f', Math.random(), Math.random(), Math.random());
    this.animations = {};
}
GameObject.prototype.buildSprite = function()
{
    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('assets/default.png'));
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.name = 'default';
    return sprite;
};
GameObject.prototype.buildMovieClip = function(anim_name, mc_frames)
{
    var mc = PIXI.extras.MovieClip.fromFrames(mc_frames);
    mc.name = anim_name;
    mc.anchor.x = mc.anchor.y = 0.5;
    mc.animationSpeed = 0.125;
    return mc;
};
GameObject.prototype.setSprite = function(sprite)
{
    if (this.animationName == sprite.animationName)
    {
        return;
    }
    // Clean up current
    var currSprite = this.sprite;
    if (currSprite instanceof PIXI.extras.MovieClip)
    {
        currSprite.stop();
    }
    // Do some testing?
    this.spriteContainer.removeChild(currSprite);
    this.sprite = sprite;
    if (sprite instanceof PIXI.extras.MovieClip)
    {
        this.sprite = sprite;
        this.spriteContainer.position.x = this.pos.x;
        this.spriteContainer.position.y = this.pos.y;
        this.sprite.gotoAndPlay(0);
    }
    this.spriteContainer.addChild(this.sprite);
};
GameObject.prototype.update = function(delta)
{
    switch (this.state)
    {
        case GameObjectState.IDLE:
            this.tickIdle(delta);
            this.tickUpdatePosition(delta);
            break;
        case GameObjectState.MOVING:
            this.tickUpdatePosition(delta);
            break;
        case GameObjectState.DEAD:
            break
    }
};
GameObject.prototype.tickIdle = function(delta)
{
    // Should be implemented by child
};
GameObject.prototype.tickUpdatePosition = function(delta)
{
    var dest = Vec(grid.gridToWorld('x', this.gPos.x), grid.gridToWorld('y', this.gPos.y));
    var dX = dest.x - this.pos.x;
    var dY = dest.y - this.pos.y;
    if (Math.abs(dX) > MOVE_STOP_THRESHOLD || Math.abs(dY) > MOVE_STOP_THRESHOLD)
    {
        this.deltaMovement = Vec(dX, dY);
        var dir = Vec(dX, dY).normalize();
        this.pos.add(dir.mult(this.moveSpeed * delta));
    }
    else
    {
        this.pos = dest;
        this.deltaMovement = null;
    }
    this.spriteContainer.position.x = this.pos.x;
    this.spriteContainer.position.y = this.pos.y;
};