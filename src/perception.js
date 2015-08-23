/*
 * Perception object for actors. Just does simple detection of the player
 */
function Perception(parent)
{
    this.parent = parent;
    // Total vision of this unit
    this.visionDistance = 150;
    this.visionAngle = 40;
    this.canSee = false;
    this.target = undefined;
    this.distanceToTarget = Infinity;
}
Perception.prototype.canSeeTarget = function(otherObj)
{
    var inDistance = otherObj.pos.minus(this.parent.pos).sqrMagnitude() < Math.pow(this.visionDistance, 2);
    var angleBetween;
    if (inDistance)
    {
        angleBetween = Vec2.angleBetween(otherObj.pos.minus(this.parent.pos), DirVec[Direction[this.parent.facingDirection]]);
        this.canSee = angleBetween <= this.visionAngle;
    }
    if (!inDistance || !this.canSee)
    {
        this.target = null;
        this.distanceToTarget = Infinity;
        this.canSee = false;
        return null;
    }
    this.target = otherObj;
    this.distanceToTarget = otherObj.pos.minus(this.parent.pos).sqrMagnitude();
    return {
        'angleBetween': angleBetween,
        'target': this.target,
        'distance': this.distanceToTarget
    }
};
Perception.prototype.debugDraw = function()
{
    var visionDir = DirVec[Direction[this.parent.facingDirection]].mult(this.visionDistance);
    DEBUGGFX.lineStyle(1, 0xFFFFFF, 0.25);
    DEBUGGFX.moveTo(this.parent.pos.x, this.parent.pos.y);
    DEBUGGFX.lineTo(this.parent.pos.x + visionDir.x, this.parent.pos.y + visionDir.y);
    if (this.target)
    {
        DEBUGGFX.lineStyle(1, (this.canSee) ? 0xFF0000 : 0xFFFFFF);
        DEBUGGFX.moveTo(this.parent.pos.x, this.parent.pos.y);
        DEBUGGFX.lineTo(this.target.pos.x, this.target.pos.y);
    }
};