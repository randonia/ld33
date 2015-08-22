/*
 * Player class
 */
function Player()
{
    this.sprite = this.buildSprite();
}
Player.prototype = new GameObject();
Player.prototype.buildSprite = function()
{
    var mc = PIXI.extras.MovieClip.fromFrames(["player_idle_0.png", "player_idle_1.png"]);
    mc.anchor.x = mc.anchor.y = 0.5;
    mc.animationSpeed = 0.25;
    mc.play();
    return mc;
};