/*
 * Non-shooting thing. This is what the player wants.
 */
function Civilian()
{
    this._super = GameObject.prototype;
    this.setSprite(this.buildMovieClip('civilian_idle_north', ['civilian_idle_0.png', 'civilian_idle_1.png']));
    this.tag |= Tag.CIVILIAN;
    this.perception = new Perception(this);
}
Civilian.prototype = new GameObject();
Civilian.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    var ret;
    if (ret = this.perception.canSeeTarget(player))
    {
        // can see!
    }
    this.perception.debugDraw();
};