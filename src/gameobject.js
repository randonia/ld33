/*
 * GameObject class. All displayed items use this.
 */
function GameObject()
{
    this.pos = {
        'x': 0,
        'y': 0
    };
    this.size = {
        'x': 3,
        'y': 3
    };
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
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
};