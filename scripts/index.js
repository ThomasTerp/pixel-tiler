import App from "./app.js"
import Tileset from "./tileset.js";
import Tile from "./tile.js";

$(document).ready(() =>
{
	const tileset = new Tileset("Default");
	tileset.addTile("tile1", new Tile((size) =>
	{
		return $(`<rect width="${size}" height="${size}" fill="black" />`);
	}));
	tileset.addTile("tile2", new Tile((size) =>
	{
		return $(`<circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.5}" fill="black" />`);
	}));
	tileset.addTile("tile3", new Tile((size) =>
	{
		return $(`<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} Z" fill="black" />`);
	}));
	tileset.addTile("tile4", new Tile((size) =>
	{
		return $(`<path d="M${size},0 L${size},${size} L0,${size} Z" fill="black" />`);
	}));
	tileset.addTile("tile5", new Tile((size) =>
	{
		return $(`<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 1 ${size * 0.5},0 Z" fill="black" />`);
	}));
	tileset.addTile("tile6", new Tile((size) =>
	{
		return $(`<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 1 ${size},0 Z" fill="black" />`);
	}));
	tileset.addTile("tile7", new Tile((size) =>
	{
		return $(`<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 Z" fill="black" />`);
	}));
	tileset.addTile("tile8", new Tile((size) =>
	{
		return $(`<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 0 ${size},0 Z" fill="black" />`);
	}));
	tileset.addTile("tile9", new Tile((size) =>
	{
		return $(`<polygon points="${size * 0.5},0 ${size},${size} 0,${size}" fill="black" />`);
	}));
	tileset.addTile("tile10", new Tile((size) =>
	{
		return $(`
			<polygon points="${size * 0.25},0 ${size * 0.5},${size} 0,${size}" fill="black" />
			<polygon points="${size * 0.75},0 ${size},${size} ${size * 0.5},${size}" fill="black" />
		`);
	}));
	tileset.addTile("tile11", new Tile((size) =>
	{
		return $(`<polygon points="${size * 0.5},${size * 0.5} ${size},${size} 0,${size}" fill="black" />`);
	}));
	tileset.addTile("tile12", new Tile((size) =>
	{
		return $(`
			<polygon points="${size * 0.25},${size * 0.5} ${size * 0.5},${size} 0,${size}" fill="black" />
			<polygon points="${size * 0.75},${size * 0.5} ${size},${size} ${size * 0.5},${size}" fill="black" />
		`);
	}));
	tileset.addTile("tile13", new Tile((size) =>
	{
		return $(`
			<path d="M0,${size * 0.5} L0,0 L${size * 0.5},0 A ${size * 0.5},${size * 0.5},0 0 0 0 ${size * 0.5},Z" fill="black" />
			<path d="M${size},${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 L${size},0 Z" fill="black" />
			<path d="M${size},${size * 0.5} L${size},${size} L${size * 0.5},${size} A ${size * 0.5},${size * 0.5} 0 0 0 ${size},${size * 0.5} Z" fill="black" />
			<path d="M0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},${size} L0,${size} Z" fill="black" />
		`);
	}));
	tileset.addTile("tile14", new Tile((size) =>
	{
		return $(`<polygon points="0,0 ${size * 0.5},${size} ${size},0 ${size},${size} 0,${size}" fill="black" />`);
	}));
	tileset.addTile("tile15", new Tile((size) =>
	{
		return $(`<polygon points="0,0 ${size * 0.25},${size} ${size * 0.5},0 ${size * 0.75},${size} ${size},0 ${size},${size} 0,${size}" fill="black" />`);
	}));
	tileset.addTile("tile16", new Tile((size) =>
	{
		return $(`<polygon points="0,0 ${size * 0.5},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="black" />`);
	}));
	tileset.addTile("tile17", new Tile((size) =>
	{
		return $(`<polygon points="0,0 ${size * 0.25},${size * 0.5} ${size * 0.5},0 ${size * 0.75},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="black" />`);
	}));

	window.app = new App($("#app-container"), [
		tileset
	]);
	app.initialize();
});

/*
<canvas id="canvas" width="800" height="400"></canvas>
<div id="png-container"></div>

var svgString = new XMLSerializer().serializeToString($(".grid")[0]);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var DOMURL = self.URL || self.webkitURL || self;
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
var url = DOMURL.createObjectURL(svg);
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    var png = canvas.toDataURL("image/png");
    document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
    DOMURL.revokeObjectURL(png);
};
img.src = url;
*/
