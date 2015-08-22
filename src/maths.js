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
            return sprintf('{%d,%d}', this.x, this.y)
        }
    }
}