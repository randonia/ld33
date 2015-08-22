/*
 * GameObject class. All displayed items use this.
 */
function GameObject()
{
    this.pos = Vec(0, 0);
    this.gPos = Vec(0, 0);
    this.size = Vec(3, 3);
    this.sprite = this.buildSprite();
}
GameObject.prototype.buildSprite = function()
{
    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('assets/default.png'));
    sprite.anchor.x = sprite.anchor.y = 0.5;
    return sprite;
};
GameObject.prototype.update = function(delta)
{
    this.pos.x = grid.gridToWorld('x', this.gPos.x);
    this.pos.y = grid.gridToWorld('y', this.gPos.y);
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
};