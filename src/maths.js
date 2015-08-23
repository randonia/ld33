/*
 * Math helpers
 */
function Vec(x, y)
{
    return new Vec2(x, y);
}

function Vec2(x, y)
{
    this.x = x;
    this.y = y;
}
Vec2.prototype.toString = function()
{
    return sprintf('{%f,%f}', this.x, this.y);
};
Vec2.prototype.normalize = function()
{
    var mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
    this.x = this.x / mag;
    this.y = this.y / mag;
    return this;
};
Vec2.prototype.add = function(otherVec)
{
    this.x += otherVec.x;
    this.y += otherVec.y;
};
Vec2.prototype.plus = function(otherVec)
{
    return Vec(this.x + otherVec.x, this.y + otherVec.y);
};
Vec2.prototype.scale = function(scalar)
{
    this.x *= scalar
    this.y *= scalar;
};
Vec2.prototype.mult = function(scalar)
{
    return Vec(this.x * scalar, this.y * scalar);
};