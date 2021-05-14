import Tileset from "../Tileset";

const tilesets: Tileset[] = [
	new Tileset("Basic", [
		{
			tileID: "tile1",
			renderTile: (color: string) =>
			{
				return <rect width={1} height={1} fill={color} />;
			}
		},
		{
			tileID: "tile2",
			renderTile: (color: string) =>
			{
				return <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile3",
			renderTile: (color: string) =>
			{
				return <path d={`M1,0 L1,1 L0,1 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile4",
			renderTile: (color: string) =>
			{
				return <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 A 0.5,0.5 0 0 1 0.5,0 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile5",
			renderTile: (color: string) =>
			{
				return <path d={`M1,0 L1,1 L0,1 A 1,1 0 0 1 1,0 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile6",
			renderTile: (color: string) =>
			{
				return <path d={`M0.5,0 L1,0 L1,1 L0,1 L0,0.5 A 0.5,0.5 0 0 0 0.5,0 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile7",
			renderTile: (color: string) =>
			{
				return <path d={`M1,0 L1,1 L0,1 A 1,1 0 0 0 1,0 Z`} fill={color} />;
			}
		},
		{
			tileID: "tile8",
			renderTile: (color: string) =>
			{
				return <circle cx={0.5} cy={0.5} r={0.5} fill={color} />;
			}
		},
		{
			tileID: "tile9",
			renderTile: (color: string) =>
			{
				return (
					<g>
						<path d={`M0,0.5 L0,0 L0.5,0 A 0.5,0.5,0 0 0 0 0.5,Z`} fill={color} />
						<path d={`M1,0.5 A 0.5,0.5 0 0 0 0.5,0 L1,0 Z`} fill={color} />
						<path d={`M1,0.5 L1,1 L0.5,1 A 0.5,0.5 0 0 0 1,0.5 Z`} fill={color} />
						<path d={`M0,0.5 A 0.5,0.5 0 0 0 0.5,1 L0,1 Z`} fill={color} />
					</g>
				);
			}
		},
		{
			tileID: "tile10",
			renderTile: (color: string) =>
			{
				return <polygon points={`0.5,0 1,1 0,1`} fill={color} />;
			}
		},
		{
			tileID: "tile11",
			renderTile: (color: string) =>
			{
				return (
					<g>
						<polygon points={`0.25,0 0.5,1 0,1`} fill={color} />
						<polygon points={`0.75,0 1,1 0.5,1`} fill={color} />
					</g>
				);
			}
		},
		{
			tileID: "tile12",
			renderTile: (color: string) =>
			{
				return <polygon points={`0.5,0.5 1,1 0,1`} fill={color} />;
			}
		},
		{
			tileID: "tile13",
			renderTile: (color: string) =>
			{
				return (
					<g>
						<polygon points={`0.25,0.5 0.5,1 0,1`} fill={color} />
						<polygon points={`0.75,0.5 1,1 0.5,1`} fill={color} />
					</g>
				);
			}
		},
		{
			tileID: "tile14",
			renderTile: (color: string) =>
			{
				return <polygon points={`0,0 0.5,1 1,0 1,1 0,1`} fill={color} />;
			}
		},
		{
			tileID: "tile15",
			renderTile: (color: string) =>
			{
				return <polygon points={`0,0 0.25,1 0.5,0 0.75,1 1,0 1,1 0,1`} fill={color} />;
			}
		},
		{
			tileID: "tile16",
			renderTile: (color: string) =>
			{
				return <polygon points={`0,0 0.5,0.5 1,0 1,1 0,1`} fill={color} />;
			}
		},
		{
			tileID: "tile17",
			renderTile: (color: string) =>
			{
				return <polygon points={`0,0 0.25,0.5 0.5,0 0.75,0.5 1,0 1,1 0,1`} fill={color} />;
			}
		}
	])
];
export default tilesets;
