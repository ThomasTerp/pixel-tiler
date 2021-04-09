import App from "./app.js"

$(document).ready(() =>
{
	window.app = new App($("#appContainer"));
	app.initialize();
});
