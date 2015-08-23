/*
 * Collision manager class. Uses (heavily) the grid
 */
var THEGRID = {}; // a digital frontier
function CollisionManager()
{}
CollisionManager.prototype.addToTheGrid = function(gameObject)
{
    var x = gameObject.gPos.x;
    var y = gameObject.gPos.y;
    if (!THEGRID[x])
    {
        THEGRID[x] = {};
    }
    THEGRID[x][y] = gameObject;
};
CollisionManager.prototype.gridCheck = function(coords)
{
    if (!THEGRID[coords.x])
    {
        return null;
    }
    return THEGRID[coords.x][coords.y];
};
CollisionManager.prototype.clearTheGrid = function()
{
    for (var key in THEGRID)
    {
        // This is dirty
        THEGRID[key] = {};
    }
};