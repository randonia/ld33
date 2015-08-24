// {-10,-7} to {9,6}
// 20 wide
// 14 tall
LEVEL1_KEYS = {
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
LEVEL1_ENTITIES = [
    { type: 'player',   direction: Direction.SOUTH , pos: Vec(-1, 0)},
    { type: 'police',   direction: Direction.SOUTH , pos: Vec(4, -3)},
    { type: 'police',   direction: Direction.WEST , pos: Vec(8, 1)},
    { type: 'civilian', direction: Direction.SOUTH , pos: Vec(4, 0)},
]
LEVEL1_MAP = [
    'XXXXXXXXXXXXXXXXXXXXXX',
    'X00010000000000000000X',
    'X00010000000000000000X',
    'X0001000U000000000000X',
    'X000100HrJ01110000000X',
    'X000111BNB11f11111111X',
    'X0000010D010f001BBBB0X',
    'X00000111110fff100000X',
    'X00000000011111100000X',
    'X00000000000000000000X',
    'X00000000000ffffffff0X',
    'X00000000000000000000X',
    'X00000000000000000000X',
    'X00000000000000000000X',
    'X00000000000000000000X',
    'XXXXXXXXXXXXXXXXXXXXXX',
]