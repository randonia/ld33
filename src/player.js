/*
 * Player class
 */
function Player()
{
    this._super = GameObject.prototype;
    this.sprite = this.buildMovieClip(['player_idle_0.png', 'player_idle_1.png']);
}
Player.prototype = new GameObject();
Player.prototype.update = function(delta)
{
    this._super.update.call(this, delta);
    switch (this.state)
    {
        case GameObjectState.IDLE:
            if (this.handleInput())
            {
                this.state = GameObjectState.MOVING;
            }
            break;
        case GameObjectState.MOVING:
            if (!this.deltaMovement)
            {
                this.state = GameObjectState.IDLE;
            }
            break;
        case GameObjectState.DEAD:
            break;
    }
};
Player.prototype.handleInput = function()
{
    var movement = false;
    if (Input.keyDown(Keys.A))
    {
        this.gPos.x -= 1;
        movement = true;
    }
    if (Input.keyDown(Keys.D))
    {
        this.gPos.x += 1;
        movement = true;
    }
    if (Input.keyDown(Keys.W))
    {
        this.gPos.y -= 1;
        movement = true;
    }
    if (Input.keyDown(Keys.S))
    {
        this.gPos.y += 1;
        movement = true;
    }
    // Prepare for more actions
    return {
        'movement': movement
    };
};