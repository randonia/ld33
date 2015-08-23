/*
 * Shooting thing. This is what the player doesn't wantses.
 */
function Police()
{
    this._super = GameObject.prototype;
    this.tag |= Tag.CIVILIAN;
    this.perception = new Perception(this);
    for (var d in Direction.list)
    {
        var dir = Direction.list[d].toLowerCase();
        var idles = [];
        var walkings = [];
        var animIdleName = sprintf('police_idle_%s', dir);
        var animWalkName = sprintf('police_walking_%s', dir);
        for (var idx = 0; idx <= 1; ++idx)
        {
            idles.push(sprintf('%s_%d.png', animIdleName, idx));
            walkings.push(sprintf('%s_%d.png', animWalkName, idx));
        }
        this.animations[sprintf('idle_%s', dir)] = this.buildMovieClip(animIdleName, idles);
        this.animations[sprintf('walking_%s', dir)] = this.buildMovieClip(animWalkName, walkings);
        var shootName = sprintf('shoot_%s', dir);
        this.animations[shootName] = this.buildMovieClip(shootName, [sprintf('police_shoot_%s_0.png', dir)]);
    }

    this.animationName = 'idle_south';
    this.setSprite(this.animations[this.animationName]);
    this.animationState = AnimationState.IDLE;
}
Police.prototype = new GameObject();
Police.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    var ret;
    if (ret = this.perception.canSeeTarget(player))
    {
        // can see!
    }
    this.perception.debugDraw();
};