import App from "./app.js"
import Tileset from "./tileset.js";
import Tile from "./tile.js";

$(document).ready(() =>
{
	const tileset = new Tileset("Default");
	tileset.setTile("tile1", new Tile((size, color) =>
	{
		return `<rect width="${size}" height="${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile2", new Tile((size, color) =>
	{
		return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} Z" fill="${color}" />`;
	}));
	tileset.setTile("tile3", new Tile((size, color) =>
	{
		return `<path d="M${size},0 L${size},${size} L0,${size} Z" fill="${color}" />`;
	}));
	tileset.setTile("tile4", new Tile((size, color) =>
	{
		return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 1 ${size * 0.5},0 Z" fill="${color}" />`;
	}));
	tileset.setTile("tile5", new Tile((size, color) =>
	{
		return `<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 1 ${size},0 Z" fill="${color}" />`;
	}));
	tileset.setTile("tile6", new Tile((size, color) =>
	{
		return `<path d="M${size * 0.5},0 L${size},0 L${size},${size} L0,${size} L0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 Z" fill="${color}" />`;
	}));
	tileset.setTile("tile7", new Tile((size, color) =>
	{
		return `<path d="M${size},0 L${size},${size} L0,${size} A ${size},${size} 0 0 0 ${size},0 Z" fill="${color}" />`;
	}));
	tileset.setTile("tile8", new Tile((size, color) =>
	{
		return `<circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.5}" fill="${color}" />`;
	}));
	tileset.setTile("tile9", new Tile((size, color) =>
	{
		return `
			<path d="M0,${size * 0.5} L0,0 L${size * 0.5},0 A ${size * 0.5},${size * 0.5},0 0 0 0 ${size * 0.5},Z" fill="${color}" />
			<path d="M${size},${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},0 L${size},0 Z" fill="${color}" />
			<path d="M${size},${size * 0.5} L${size},${size} L${size * 0.5},${size} A ${size * 0.5},${size * 0.5} 0 0 0 ${size},${size * 0.5} Z" fill="${color}" />
			<path d="M0,${size * 0.5} A ${size * 0.5},${size * 0.5} 0 0 0 ${size * 0.5},${size} L0,${size} Z" fill="${color}" />
		`;
	}));
	tileset.setTile("tile10", new Tile((size, color) =>
	{
		return `<polygon points="${size * 0.5},0 ${size},${size} 0,${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile11", new Tile((size, color) =>
	{
		return `
			<polygon points="${size * 0.25},0 ${size * 0.5},${size} 0,${size}" fill="${color}" />
			<polygon points="${size * 0.75},0 ${size},${size} ${size * 0.5},${size}" fill="${color}" />
		`;
	}));
	tileset.setTile("tile12", new Tile((size, color) =>
	{
		return `<polygon points="${size * 0.5},${size * 0.5} ${size},${size} 0,${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile13", new Tile((size, color) =>
	{
		return `
			<polygon points="${size * 0.25},${size * 0.5} ${size * 0.5},${size} 0,${size}" fill="${color}" />
			<polygon points="${size * 0.75},${size * 0.5} ${size},${size} ${size * 0.5},${size}" fill="${color}" />
		`;
	}));
	tileset.setTile("tile14", new Tile((size, color) =>
	{
		return `<polygon points="0,0 ${size * 0.5},${size} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile15", new Tile((size, color) =>
	{
		return `<polygon points="0,0 ${size * 0.25},${size} ${size * 0.5},0 ${size * 0.75},${size} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile16", new Tile((size, color) =>
	{
		return `<polygon points="0,0 ${size * 0.5},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
	}));
	tileset.setTile("tile17", new Tile((size, color) =>
	{
		return `<polygon points="0,0 ${size * 0.25},${size * 0.5} ${size * 0.5},0 ${size * 0.75},${size * 0.5} ${size},0 ${size},${size} 0,${size}" fill="${color}" />`;
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
