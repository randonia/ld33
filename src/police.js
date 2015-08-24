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
    switch (this.state)
    {
        case GameObjectState.IDLE:
            if (player.state != GameObjectState.DEAD && (ret = this.perception.canSeeTarget(player)))
            {
                if (this.testLineOfSight(player))
                {
                    this.shoot(player);
                }
            }
            this.perception.debugDraw();
            break;
        case GameObjectState.ATTACKING:
            // some stuff
            break;
    }
};
Police.prototype.testLineOfSight = function(target)
{
    // Let's just skip this for now
    return true;
};
Police.prototype.shoot = function(target)
{
    this.state = GameObjectState.ATTACKING;
    this.animationName = sprintf('shoot_%s', Direction[this.facingDirection].toLowerCase());
    this.setSprite(this.animations[this.animationName]);
    // Play shoot sound
    // Set up target
    if (target instanceof Player)
    {
        target.getShot();
        if (sound_gunshot)
        {
            sound_gunshot.play();
        }
    }
};