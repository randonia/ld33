/*
 * GameObject class. All displayed items use this.
 */
var GameObjectState = {
    'IDLE': 0,
    'MOVING': 1,
    'DEAD': 2,
};
var MOVE_STOP_THRESHOLD = 1;

function GameObject()
{
    this.pos = Vec(0, 0);
    this.gPos = Vec(0, 0);
    this.size = Vec(3, 3);
    this.sprite = this.buildSprite();
    this.state = GameObjectState.IDLE;
    this.moveSpeed = 2 * 32; // 1/2 a second per grid
}
GameObject.prototype.buildSprite = function()
{
    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('assets/default.png'));
    sprite.anchor.x = sprite.anchor.y = 0.5;
    return sprite;
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
        var dir = Vec(dX, dY).normalize();
        this.pos.add(dir.mult(this.moveSpeed * delta));
        DEBUGTEXT.text += sprintf('\nPlayerDir: %s', dir.toString());
        DEBUGTEXT.text += sprintf('\nDeltas: [%f,%f]', dX, dY);
    }
    else
    {
        this.pos = dest;
    }
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
};