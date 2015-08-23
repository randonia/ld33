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
    var mag = this.magnitude();
    this.x = this.x / mag;
    this.y = this.y / mag;
    return this;
};
Vec2.prototype.magnitude = function()
{
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
};
Vec2.prototype.sqrMagnitude = function() {
    return (this.x * this.x) + (this.y * this.y);
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
Vec2.prototype.sub = function(otherVec)
{
    this.x -= otherVec.x;
    this.y -= otherVec.y;
};
Vec2.prototype.minus = function(otherVec)
{
    return Vec(this.x - otherVec.x, this.y - otherVec.y);
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
Vec2.prototype.clone = function() {
    return Vec(this.x, this.y);
};
// a.b= a1b1 + a2b2
Vec2.dot = function(a, b)
{
    return a.x * b.x + a.y * b.y;
};
// cos(a) = (v * w) / (||v|| ||w||)
// cosine angle equals v dot w divided by the product of their magnitudes 
Vec2.angleBetween = function(v, w)
{
    var magV = v.magnitude();
    var magW = w.magnitude();
    var vDotw = Vec2.dot(v, w);
    return rad2Deg(Math.acos(vDotw / (magV * magW)));
};

function rad2Deg(rad)
{
    return rad * 180 / Math.PI;
}
function deg2Rad(deg)
{
    return deg / 180 * Math.PI;
}