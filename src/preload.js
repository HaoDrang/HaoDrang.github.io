var CANVAS_W = 490;
var CANVAS_H = 700;

function Preload(){
	
}
Preload.prototype = new createjs.Container();
Preload.prototype.container_initialize = Preload.prototype.initialize;

Preload.prototype.initialize = function(){
	this.container_initialize();
	//create a gameCanvas
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.id 		= "gameCanvas";
	canvas.width 	= CANVAS_W;
	canvas.height 	= CANVAS_H;

	console.log("game canvas created...");

	var stage = new createjs.Stage(canvas);

	console.log("stage is ready...");

	resizeCanvas(stage);

//background test
	var background = new createjs.Shape();
	background.graphics.beginFill(createjs.Graphics.getRGB(200, 200, 200, 0.5)).drawRect(0,0,canvas.width, canvas.height);
	stage.addChild(background);
	stage.update();
};