/*
 * Player class
 */
var AnimationState = {
    'list': ['IDLE', 'WALKING']
};
for (var as in AnimationState.list)
{
    AnimationState[AnimationState.list[as]] = 0x1 << as;
    // This one needs to go back and forth
    AnimationState[0x1 << as] = AnimationState.list[as];
}
delete AnimationState.list;

function Player()
{
    this._super = GameObject.prototype;
    this.animations = {};
    for (var d in Direction.list)
    {
        var dir = Direction.list[d].toLowerCase();
        var idles = [];
        var walkings = [];
        var animIdleName = sprintf('player_idle_%s', dir);
        var animWalkName = sprintf('player_walking_%s', dir);
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
Player.prototype = new GameObject();
Player.prototype.getCardObj = function(dir)
{
    return cmgr.gridCheck(this.gPos.plus(dir));
};
Player.prototype.isDirPassable = function(dir)
{
    var newGpos = this.gPos.plus(DirVec[Direction[dir]]);
    return grid.tileIsPassable(newGpos.x, newGpos.y);
};
Player.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    var ret;
    switch (this.state)
    {
        case GameObjectState.IDLE:
            if ((ret = this.handleInput()) && ret['movement'])
            {
                var targetObj;
                this.facingDirection = ret['dir'];
                this.animationState = AnimationState.WALKING;
                var dir = Direction[ret['dir']];
                if ((targetObj = this.getCardObj(dir)) || !(targetObj = this.isDirPassable(ret['dir'])).passable)
                {
                    console.log(sprintf('Blocked by %s to the %s', targetObj, 'NORTH'));
                }
                else
                {
                    switch (ret['dir'])
                    {
                        case Direction.NORTH:
                            this.gPos.y -= 1;
                            break;
                        case Direction.EAST:
                            this.gPos.x += 1;
                            break;
                        case Direction.SOUTH:
                            this.gPos.y += 1;
                            break;
                        case Direction.WEST:
                            this.gPos.x -= 1;
                            break;
                    }
                    this.updateAnimation();
                }
                if (!targetObj)
                {}
                this.state = GameObjectState.MOVING;
            }
            break;
        case GameObjectState.MOVING:
            if (!this.deltaMovement)
            {
                this.state = GameObjectState.IDLE;
                this.animationState = AnimationState.IDLE;
                this.updateAnimation();
            }
            break;
        case GameObjectState.DEAD:
            break;
    }
};
Player.prototype.moveDir = function(dir)
{
    this.gPos.add(DirVec[Direction[this.facingDirection]]);
};
Player.prototype.handleInput = function()
{
    var result = {};
    if (Input.keyDown(Keys.A))
    {
        result['movement'] = true;
        result['dir'] = Direction.WEST;
    }
    if (Input.keyDown(Keys.D))
    {
        result['movement'] = true;
        result['dir'] = Direction.EAST
    }
    if (Input.keyDown(Keys.W))
    {
        result['movement'] = true;
        result['dir'] = Direction.NORTH
    }
    if (Input.keyDown(Keys.S))
    {
        result['movement'] = true;
        result['dir'] = Direction.SOUTH
    }
    // Prepare for more actions. Result should be an object of actionable items
    return result;
};
Player.prototype.updateAnimation = function()
{
    var dirStr = Direction[this.facingDirection].toLowerCase();
    var animStr = AnimationState[this.animationState].toLowerCase();
    this.animationName = sprintf('%s_%s', animStr, dirStr);
    this.setSprite(this.animations[this.animationName]);
};