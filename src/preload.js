var CANVAS_W = 490;
var CANVAS_H = 700;

function Preload(){
	var progressBar;
}
Preload.prototype = new createjs.Container();
Preload.prototype.container_initialize = Preload.prototype.initialize;

Preload.prototype.initialize = function(){
	this.container_initialize();
	//create a gameCanvas
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.id 		= "gameCanvas";
	canvas.style.display = "block";
	canvas.style.margin = "0 auto";
	canvas.width 	= CANVAS_W;
	canvas.height 	= CANVAS_H;

	console.log("game canvas created...");

	var stage = new createjs.Stage(canvas);
	stage.barBackground = "0x000000";
	console.log("stage is ready...");

	resizeCanvas(stage);

	this.buildUI(stage);

	document.addEventListener("resize", resizeCanvas(stage));

	//var loader = initLoader();
};

Preload.prototype.buildUI = function(stage) {
		var w = CANVAS_W - 10;
		var h = 30;
		var x = (CANVAS_W - w) / 2;
		var y = (CANVAS_H - h) / 2;

		progressBar = new PreloadProgressBar(x,y / 2,w,h,5,2,2,80,200,80,1);
		stage.addChild(progressBar);
		progressBar.updateProgress(0,100);
		stage.update();
		console.log("x " + progressBar.x + " y:" + progressBar.y);
		console.log("stage " + stage.canvas.height + "  " + stage.y);
		//progressBar.graphics.beginFill(createjs.Graphics.getRGB(125, 125, 125, 1)).drawRoundRect(x,y,w,h,5,5,5,5);
		//progressBar.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1)).drawRoundRect(x + 3,y + 2,w - 6,h - 4,5,5,5,5);
		//progressBar.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, 1)).drawRoundRect(x + 3,y + 2,(w - 6) / 2,h - 4,5,5,5,5);

};

function PreloadProgressBar(x,y,w,h,radius,ox,oy,r,g,b,alpha){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.radius 	 = radius;
	this.offsetx 	 = ox;
	this.offsety 	 = oy;
	this.color 		 = createjs.Graphics.getRGB(r, g, b, alpha);
	this.strokecolor = createjs.Graphics.getRGB(0, 0, 0, 1);
	this.bgcolor = createjs.Graphics.getRGB(200,200,200,1);
}
PreloadProgressBar.prototype = new createjs.Shape();
PreloadProgressBar.prototype.updateProgress = function(current, full) {
	//stroke
	this.graphics.beginFill(this.strokecolor).drawRoundRect(this.x,this.y,this.w,this.h,
		this.radius,this.radius,this.radius,this.radius);
	//background
	this.graphics.beginFill(this.bgcolor).drawRoundRect(this.x + this.offsetx,this.y + this.offsety,
		this.w - this.offsetx * 2, this.h - this.offsety * 2,
		this.radius,this.radius,this.radius,this.radius);
	//progressBar
	this.graphics.beginFill(this.color).drawRoundRect(this.x + this.offsetx,this.y + this.offsety,
		this.w - this.offsetx * 2, this.h - this.offsety * 2,
		this.radius,this.radius,this.radius,this.radius);

	this.graphics.endFill();
};