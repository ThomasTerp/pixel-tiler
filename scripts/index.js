import App from "./app.js"
import Tileset from "./tileset.js";
import Tile from "./tile.js";

$(document).ready(() =>
{
	const tileset = new Tileset("Default");
	tileset.addTile("tile1", new Tile((html) =>
	{
		html.append(`<rect width="300" height="100" fill="black" />`);
	}));
	tileset.addTile("tile2", new Tile(() =>
	{
		html.append(`<circle cx="50" cy="50" r="50" fill="black" />`);
	}));
	tileset.addTile("tile3", new Tile(() =>
	{
		html.append(`<path d="M50,0 L100,0 L100,100 L0,100 L0,50 Z" fill="black" />`);
	}));
	tileset.addTile("tile4", new Tile(() =>
	{
		html.append(`<path d="M100,0 L100,100 L0,100 Z" fill="black" />`);
	}));
	tileset.addTile("tile5", new Tile(() =>
	{
		html.append(`<path d="M50,0 L100,0 L100,100 L0,100 L0,50 A 50,50 0 0 1 50,0 Z" fill="black" />`);
	}));
	tileset.addTile("tile6", new Tile(() =>
	{
		html.append(`<path d="M100,0 L100,100 L0,100 A 100,100 0 0 1 100,0 Z" fill="black" />`);
	}));
	tileset.addTile("tile7", new Tile(() =>
	{
		html.append(`<path d="M50,0 L100,0 L100,100 L0,100 L0,50 A 50,50 0 0 0 50,0 Z" fill="black" />`);
	}));
	tileset.addTile("tile8", new Tile(() =>
	{
		html.append(`<path d="M100,0 L100,100 L0,100 A 100,100 0 0 0 100,0 Z" fill="black" />`);
	}));
	tileset.addTile("tile9", new Tile(() =>
	{
		html.append(`<polygon points="50,0 100,100 0,100" fill="black" />`);
	}));
	tileset.addTile("tile10", new Tile(() =>
	{
		html.append(`
			<polygon points="25,0 50,100 0,100" fill="black" />
			<polygon points="75,0 100,100 50,100" fill="black" />
		`);
	}));
	tileset.addTile("tile11", new Tile(() =>
	{
		html.append(`<polygon points="50,50 100,100 0,100" fill="black" />`);
	}));
	tileset.addTile("tile12", new Tile(() =>
	{
		html.append(`
			<polygon points="25,50 50,100 0,100" fill="black" />
			<polygon points="75,50 100,100 50,100" fill="black" />
		`);
	}));
	tileset.addTile("tile13", new Tile(() =>
	{
		html.append(`
			<path d="M0,50 L0,0 L50,0 A 50,50,0 0 0 0 50,Z" fill="black" />
			<path d="M100,50 A 50,50 0 0 0 50,0 L100,0 Z" fill="black" />
			<path d="M100,50 L100,100 L50,100 A 50,50 0 0 0 100,50 Z" fill="black" />
			<path d="M0,50 A 50,50 0 0 0 50,100 L0,100 Z" fill="black" />
		`);
	}));
	tileset.addTile("tile14", new Tile(() =>
	{
		html.append(`<polygon points="0,0 50,100 100,0 100,100 0,100" fill="black" />`);
	}));
	tileset.addTile("tile15", new Tile(() =>
	{
		html.append(`<polygon points="0,0 25,100 50,0 75,100 100,0 100,100 0,100" fill="black" />`);
	}));
	tileset.addTile("tile16", new Tile(() =>
	{
		html.append(`<polygon points="0,0 50,50 100,0 100,100 0,100" fill="black" />`);
	}));
	tileset.addTile("tile17", new Tile(() =>
	{
		html.append(`<polygon points="0,0 25,50 50,0 75,50 100,0 100,100 0,100" fill="black" />`);
	}));

	window.app = new App($("#app-container"), tileset);
	app.initialize();
});
