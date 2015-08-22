/*
 * Math helpers
 */
function Vec(x, y)
{
    return {
        'x': x,
        'y': y,
        'toString': function()
        {
            return sprintf('{%f,%f}', this.x, this.y)
        },
        'normalize':function()
        {
            var mag = Math.sqrt((x*x)+(y*y));
            this.x = this.x / mag;
            this.y = this.y / mag;
            return this;
        },
        'add':function(otherVec)
        {
            this.x += otherVec.x;
            this.y += otherVec.y;
        },
        'scale':function(scalar) // self modifying
        {
            this.x *= scalar
            this.y *= scalar;
        },
        'mult':function(scalar) // new instantiation
        {
            return Vec(this.x * scalar, this.y * scalar);
        }
    }
}