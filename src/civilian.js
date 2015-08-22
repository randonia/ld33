/*
 * Non-shooting thing. This is what the player wants.
 */
function Civilian()
{
    this._super = GameObject.prototype;
    this.sprite = this.buildMovieClip(['civilian_idle_0.png', 'civilian_idle_1.png']);
}
Civilian.prototype = new GameObject();