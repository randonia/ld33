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
    this.tiles = [];
    this.sprite = this.buildSprite();
}
// Pass in {'x':0, 'y':0}
Grid.prototype.gridToWorld = function(prop, val)
{
    if (prop == 'x' || prop == 'y')
    {
        return this.pos[prop] + val * this.gridSize[prop] + (this.gridSize[prop] * 0.5)
    }
    if (val instanceof Vec2)
    {
        var x = this.pos['x'] + val * this.gridSize['x'] + (this.gridSize['x'] * 0.5)
        var y = this.pos['y'] + val * this.gridSize['y'] + (this.gridSize['y'] * 0.5)
        return Vec(x, y);
    }
};
Grid.prototype.worldToGrid = function(prop, val)
{
    if (prop == 'x' || prop == 'y')
    {
        return (val - this.pos[prop] - this.gridSize[prop] * 0.5) / (this.gridSize[prop]);
    }
    if (val instanceof Vec2)
    {
        var x = (val['x'] - this.pos['x'] - this.gridSize['x'] * 0.5) / (this.gridSize['x']);
        var y = (val['y'] - this.pos['y'] - this.gridSize['y'] * 0.5) / (this.gridSize['y']);
        return Vec(x, y);
    }
};
Grid.prototype.buildSprite = function()
{
    var worldSprite = new PIXI.Graphics();
    for (var x = -this.hWidth; x <= this.hWidth; ++x)
    {
        for (var y = -this.hHeight; y <= this.hHeight; ++y)
        {
            var tileSprite = new PIXI.Sprite(PIXI.Texture.fromImage('ground_0.png'));
            tileSprite.position.x = x * this.gridSize.x;
            tileSprite.position.y = y * this.gridSize.y;
            worldSprite.addChild(tileSprite);
            if (!this.tiles[x])
            {
                this.tiles[x] = [];
            }
            this.tiles[x][y] = tileSprite;
        }
    }
    var gridSprite = new PIXI.Graphics();
    gridSprite.lineStyle(1, 0xF0F0F0, 0.25);
    for (var x = -this.hWidth; x <= this.hWidth; ++x)
    {
        gridSprite.moveTo(x * this.gridSize.x, -this.hHeight * this.gridSize.y);
        gridSprite.lineTo(x * this.gridSize.x, this.hHeight * this.gridSize.y);
    }
    for (var y = -this.hHeight; y <= this.hHeight; ++y)
    {
        gridSprite.moveTo(-this.hWidth * this.gridSize.x, y * this.gridSize.y);
        gridSprite.lineTo(this.hWidth * this.gridSize.x, y * this.gridSize.y);
    }
    worldSprite.addChild(gridSprite);
    return worldSprite;
};
Grid.prototype.update = function(delta)
{
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
};