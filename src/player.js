/*
 * Player class
 */
function Player()
{
    console.log('Player constructed')
    this._super = GameObject.prototype;
    this.sprite = this.buildSprite();
}
Player.prototype = new GameObject();
Player.prototype.buildSprite = function()
{
    var mc = PIXI.extras.MovieClip.fromFrames(['player_idle_0.png', 'player_idle_1.png']);
    mc.anchor.x = mc.anchor.y = 0.5;
    mc.animationSpeed = 0.25;
    mc.play();
    return mc;
};
Player.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    this.handleInput();
};
Player.prototype.handleInput = function()
{
    if (Input.keyPressed(Keys.A))
    {
        this.gPos.x -= 1;
    }
    if (Input.keyPressed(Keys.D))
    {
        this.gPos.x += 1;
    }
    if (Input.keyPressed(Keys.W))
    {
        this.gPos.y -= 1;
    }
    if (Input.keyPressed(Keys.S))
    {
        this.gPos.y += 1;
    }
};