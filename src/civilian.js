/*
 * Non-shooting thing. This is what the player wants.
 */
function Civilian()
{
    this._super = GameObject.prototype;
    this.setSprite(this.buildMovieClip('civilian_idle_north', ['civilian_idle_0.png', 'civilian_idle_1.png']));
    this.tag |= Tag.CIVILIAN;
}
Civilian.prototype = new GameObject();