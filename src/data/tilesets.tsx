import Tileset from "../Tileset";
import TileType from "../TileType";

const tilesets: Tileset[] = [
	new Tileset("Basic", [
		new TileType("tile1", (tileData) => <rect width={1} height={1} fill={tileData.color} />),
		new TileType("tile2", (tileData) => <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 Z`} fill={tileData.color} />),
		new TileType("tile3", (tileData) => <path d={`M1,0 L1,1 L0,1 Z`} fill={tileData.color} />),
		new TileType("tile4", (tileData) => <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 A 0.5,0.5 0 0 1 0.5,0 Z`} fill={tileData.color} />),
		new TileType("tile5", (tileData) => <path d={`M1,0 L1,1 L0,1 A 1,1 0 0 1 1,0 Z`} fill={tileData.color} />),
		new TileType("tile6", (tileData) => <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 A 0.5,0.5 0 0 0 0.5,0 Z`} fill={tileData.color} />),
		new TileType("tile7", (tileData) => <path d={`M1,0 L1,1 L0,1 A 1,1 0 0 0 1,0 Z`} fill={tileData.color} />),
		new TileType("tile8", (tileData) => <circle cx={0.5} cy={0.5} r={0.5} fill={tileData.color} />),
		new TileType("tile9", (tileData) => (
			<g>
				<path d={`M0,0.5 L0,0 L0.5,0 A 0.5,0.5,0 0 0 0 0.5,Z`} fill={tileData.color} />
				<path d={`M1,0.5 A 0.5,0.5 0 0 0 0.5,0 L1,0 Z`} fill={tileData.color} />
				<path d={`M1,0.5 L1,1 L0.5,1 A 0.5,0.5 0 0 0 1,0.5 Z`} fill={tileData.color} />
				<path d={`M0,0.5 A 0.5,0.5 0 0 0 0.5,1 L0,1 Z`} fill={tileData.color} />
			</g>
		)),
		new TileType("tile10", (tileData) => <polygon points={`0.5,0 1,1 0,1`} fill={tileData.color} />),
		new TileType("tile11", (tileData) => (
			<g>
				<polygon points={`0.25,0 0.5,1 0,1`} fill={tileData.color} />
				<polygon points={`0.75,0 1,1 0.5,1`} fill={tileData.color} />
			</g>
		)),
		new TileType("tile12", (tileData) => <polygon points={`0.5,0.5 1,1 0,1`} fill={tileData.color} />),
		new TileType("tile13", (tileData) => (
			<g>
				<polygon points={`0.25,0.5 0.5,1 0,1`} fill={tileData.color} />
				<polygon points={`0.75,0.5 1,1 0.5,1`} fill={tileData.color} />
			</g>
		)),
		new TileType("tile14", (tileData) => <polygon points={`0,0 0.5,1 1,0 1,1 0,1`} fill={tileData.color} />),
		new TileType("tile15", (tileData) => <polygon points={`0,0 0.25,1 0.5,0 0.75,1 1,0 1,1 0,1`} fill={tileData.color} />),
		new TileType("tile16", (tileData) => <polygon points={`0,0 0.5,0.5 1,0 1,1 0,1`} fill={tileData.color} />),
		new TileType("tile17", (tileData) => <polygon points={`0,0 0.25,0.5 0.5,0 0.75,0.5 1,0 1,1 0,1`} fill={tileData.color} />)
	])
];
export default tilesets;
