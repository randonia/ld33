// {-10,-7} to {9,6}
// 20 wide
// 14 tall
LEVEL0_KEYS = {
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
LEVEL0_ENTITIES = [
    { type: 'player',   direction: Direction.SOUTH , pos: Vec(0, -1)},
    { type: 'civilian', direction: Direction.SOUTH , pos: Vec(0, 0)},
]
LEVEL0_MAP = [
    'X X X X X X X X X X X X X X X X X X X X X X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 X',
    'X 1 1 1 1 1 1 1 1 0 U U U 0 1 1 1 1 1 1 1 X',
    'X 0 0 0 0 0 0 0 1 H B 0 B J 1 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 1 H B 0 B J 1 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 1 0 N N N 0 1 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 X',
    'X X X X X X X X X X X X X X X X X X X X X X',
]