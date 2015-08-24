/*
 * Non-shooting thing. This is what the player wants.
 */
function Civilian()
{
    this._super = GameObject.prototype;
    this._super.constructor.call(this);
    this.setSprite(this.buildMovieClip('civilian_idle_north', ['civilian_idle_0.png', 'civilian_idle_1.png']));
    this.tag |= Tag.CIVILIAN;
    this.perception = new Perception(this);
    for (var d in Direction.list)
    {
        var dir = Direction.list[d].toLowerCase();
        var idles = [];
        var walkings = [];
        var animIdleName = sprintf('civilian_idle_%s', dir);
        var animWalkName = sprintf('civilian_walking_%s', dir);
        for (var idx = 0; idx <= 1; ++idx)
        {
            idles.push(sprintf('%s_%d.png', animIdleName, idx));
            walkings.push(sprintf('%s_%d.png', animWalkName, idx));
        }
        this.animations[sprintf('idle_%s', dir)] = this.buildMovieClip(animIdleName, idles);
        this.animations[sprintf('walking_%s', dir)] = this.buildMovieClip(animWalkName, walkings);
    }
    this.animationName = 'idle_south';
    this.setSprite(this.animations[this.animationName]);
    this.animationState = AnimationState.IDLE;
}
Civilian.prototype = new GameObject();
Civilian.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    var ret;
    switch (this.state)
    {
        case GameObjectState.IDLE:
            if (ret = this.perception.canSeeTarget(player))
            {
                // can see! must flee
            }
            break;
        case GameObjectState.PODDED:
            break;
    }
    // this.perception.debugDraw();
};