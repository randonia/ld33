// {-10,-7} to {9,6}
// 20 wide
// 14 tall
LEVEL2_KEYS = {
    '0': {'sprite': 'ground_0', 'passable': true},      // dirt
    '1': {'sprite': 'ground_1', 'passable': true},      // grass
    'X': {'sprite': 'ground_2', 'passable': true},      // pavement
    'B': {'sprite': 'buildings_0', 'passable': false},  // brick wall
    'D': {'sprite': 'buildings_1', 'passable': false},  // door wall
    'R': {'sprite': 'buildings_2', 'passable': false},  // roof horiz
    'H': {'sprite': 'buildings_3', 'passable': false},  // left roof
    'J': {'sprite': 'buildings_4', 'passable': false},  // right roof
    'N': {'sprite': 'buildings_5', 'passable': false},  // down roof
    'U': {'sprite': 'buildings_6', 'passable': false},  // top roof
    'r': {'sprite': 'buildings_7', 'passable': false},  // roof vert
    'd': {'sprite': 'buildings_8', 'passable': false},  // wall damage
    'f': {'sprite': 'objects_0', 'passable': false},  // fence
    'c': {'sprite': 'objects_1', 'passable': false},  // crate
    'b': {'sprite': 'objects_2', 'passable': false},  // drum
}
LEVEL2_ENTITIES = [
    { type: 'player',   direction: Direction.SOUTH , pos: Vec(0, -1)},
    { type: 'police',   direction: Direction.EAST  , pos: Vec(2, -1)},
    { type: 'police',   direction: Direction.WEST  , pos: Vec(-2, -1)},
    { type: 'civilian', direction: Direction.WEST  , pos: Vec(2, 0)},
    { type: 'civilian', direction: Direction.WEST  , pos: Vec(6, 0)},
    { type: 'civilian', direction: Direction.WEST  , pos: Vec(-6, -5)},
]
LEVEL2_MAP = [
    'XXHrrrrrJXXXXXXXXXXXXX',
    'X0HrrrrrJ000010000000X',
    'X0BdBDBBB001010000000X',
    'X0000100011U110000000X',
    'X000011111HrJ10000000X',
    'X000000001BrB10000000X',
    'X000000001fDf10000000X',
    'X000000001f1f10000000X',
    'X000000001f1f10000000X',
    'X00000000111110000000X',
    'X00000000001000000000X',
    'X11111111111111111111X',
    'X00000000001000000000X',
    'X00000000001000000000X',
    'X00000000001000000000X',
    'XXXXXXXXXXXXXXXXXXXXXX',
]