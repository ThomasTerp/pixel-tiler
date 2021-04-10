import App from "./app.js"

$(document).ready(() =>
{
	window.app = new App($("#app-container"));
	app.initialize();
});
