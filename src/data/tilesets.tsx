import Tileset from "../Tileset";

const tilesets: Tileset[] = [
	new Tileset("Basic", [
		{
			tileID: "tile1",
			renderTile: (size: number, color: string) =>
			{
				return `<rect width="${size}" height="${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile2",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile3",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size},0 L${size},${size} L0,${size} Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile4",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 1 ${size * 0.5},0 Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile5",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 1 ${size},0 Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile6",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile7",
			renderTile: (size: number, color: string) =>
			{
				return `<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 0 ${size},0 Z" fill="${color}" />`;
			}
		},
		{
			tileID: "tile8",
			renderTile: (size: number, color: string) =>
			{
				return `<circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.5}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile9",
			renderTile: (size: number, color: string) =>
			{
				return `
					<path d="M0,${size * 0.5} L0,0 L${size * 0.5},0 A ${size * 0.5},${size * 0.5},0 0 0 0 ${size * 0.5},Z" fill="${color}" />
					<path d="M${size},${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 L${size},0 Z" fill="${color}" />
					<path d="M${size},${size * 0.5} L${size},${size} L${size * 0.5},${size} A ${size * 0.5},${size * 0.5} 0 0 0 ${size},${size * 0.5} Z" fill="${color}" />
					<path d="M0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},${size} L0,${size} Z" fill="${color}" />
				`;
			}
		},
		{
			tileID: "tile10",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="${size * 0.5},0 ${size},${size} 0,${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile11",
			renderTile: (size: number, color: string) =>
			{
				return `
					<polygon points="${size * 0.25},0 ${size * 0.5},${size} 0,${size}" fill="${color}" />
					<polygon points="${size * 0.75},0 ${size},${size} ${size * 0.5},${size}" fill="${color}" />
				`;
			}
		},
		{
			tileID: "tile12",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="${size * 0.5},${size * 0.5} ${size},${size} 0,${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile13",
			renderTile: (size: number, color: string) =>
			{
				return `
					<polygon points="${size * 0.25},${size * 0.5} ${size * 0.5},${size} 0,${size}" fill="${color}" />
					<polygon points="${size * 0.75},${size * 0.5} ${size},${size} ${size * 0.5},${size}" fill="${color}" />
				`;
			}
		},
		{
			tileID: "tile14",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="0,0 ${size * 0.5},${size} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile15",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="0,0 ${size * 0.25},${size} ${size * 0.5},0 ${size * 0.75},${size} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile16",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="0,0 ${size * 0.5},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
			}
		},
		{
			tileID: "tile17",
			renderTile: (size: number, color: string) =>
			{
				return `<polygon points="0,0 ${size * 0.25},${size * 0.5} ${size * 0.5},0 ${size * 0.75},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
			}
		}
	])
];
export default tilesets;
