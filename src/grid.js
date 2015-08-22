/*
 * Grid class for managing player's movement
 */
function Grid(width, height)
{
    this.pos = Vec(0, 0);
    this.gridSize = Vec(32, 32);
    this.gridSize.hX = this.gridSize.x * 0.5;
    this.gridSize.hY = this.gridSize.y * 0.5;
    this.width = width;
    this.hWidth = this.width * 0.5;
    this.height = height;
    this.hHeight = this.height * 0.5;
    this.sprite = this.buildDebugSprite();
}
// Pass in {'x':0, 'y':0}
Grid.prototype.gridToWorld = function(prop, val)
{
    if (prop == 'x' || prop == 'y')
    {
        return this.pos[prop] + val * this.gridSize[prop] + (this.gridSize[prop] * 0.5)
    }
    return 0;
};
Grid.prototype.buildDebugSprite = function()
{
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 0xF0F0F0, 0.25);
    for (var x = -this.hWidth; x <= this.hWidth; ++x)
    {
        graphics.moveTo(x * this.gridSize.x, -this.hHeight * this.gridSize.y);
        graphics.lineTo(x * this.gridSize.x, this.hHeight * this.gridSize.y);
    }
    for (var y = -this.hHeight; y <= this.hHeight; ++y)
    {
        graphics.moveTo(-this.hWidth * this.gridSize.x, y * this.gridSize.y);
        graphics.lineTo(this.hWidth * this.gridSize.x, y * this.gridSize.y);
    }
    return graphics;
};
Grid.prototype.update = function(delta)
{
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
};