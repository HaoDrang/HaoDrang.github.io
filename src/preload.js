var CANVAS_W = 540;
var CANVAS_H = 960;

function Preload(){
	var progressBar;
	var _stage;
}
Preload.prototype = new createjs.Container();
Preload.prototype.container_initialize = Preload.prototype.initialize;

Preload.prototype.initialize = function(){

	this.container_initialize();
	//create a gameCanvas
	var canvas = document.getElementById('gameCanvas');

	CANVAS_W = canvas.width;
	CANVAS_H = canvas.height;

	console.log("game canvas created...");

	var stage = new createjs.Stage(canvas);
	_stage = stage;
	console.log("stage is ready...");

	this.buildUI(stage);

	// Size the canvas to fill the browser viewport.
	
	resizeCanvas(stage);

	var count = 0;
	jQuery(window).resize(function(){
		resizeCanvas(stage);
		if(count)
		progressBar.updateProgress(count,100);
		console.log("width :" + stage.canvas.width + " , " + "height : " + stage.canvas.height);
	});

	//this.testfunction();
	var loader = this.initLoader(progressBar);
};
/*
var drawNet = function(stage){
	for (var i = 0; i < 10; i++) {
		for(var k = 0; k < 10; k++){
			var dot = new createjs.Shape();
			dot.graphics.beginFill(createjs.Graphics.getRGB(200, 100, 100, 1)).drawCircle(i * 100,k * 100,5);
			stage.addChild(dot);}
	}
};*/

Preload.prototype.buildUI = function(stage) {

		var w = CANVAS_W - 40;
		var h = 30;
		var x = (CANVAS_W - w) / 2;
		var y = (CANVAS_H - h) / 2;

		progressBar = new PreloadProgressBar(x,y,w,h,5,2,2,80,200,80,1);
		progressBar.scaleX = progressBar.scaleY = stage.scaleX;
		stage.addChild(progressBar);
		progressBar.updateProgress(5,100);
		stage.update();
		console.log("x " + progressBar.x + " y:" + progressBar.y);
		console.log("stage " + stage.canvas.width + "  " + stage.canvas.height);
};

var updateFun;
Preload.prototype.initLoader = function(){
	updateFun = progressBar;
	createjs.Ticker.addEventListener("tick", this.testUpdate);
	console.log("initLoader called");
	return null;
};
var tickCount = 0;
Preload.prototype.testUpdate = function(){
	if(tickCount >= 100)
	{
		tickCount = 0;
	}
	//console.log("ticking + " + tickCount++);
	updateFun.updateProgress(tickCount++, 100);
	_stage.update();
};

function PreloadProgressBar(ix,iy,w,h,radius,ox,oy,r,g,b,alpha){
	this.posX = ix;
	this.poxY = iy;
	this.w = w;
	this.h = h;
	this.radius 	 = radius;
	this.offsetx 	 = ox;
	this.offsety 	 = oy;
	this.color 		 = createjs.Graphics.getRGB(r, g, b, alpha);
	this.strokecolor = createjs.Graphics.getRGB(0, 0, 0, 1);
	this.bgcolor 	 = createjs.Graphics.getRGB(200,200,200,1);

	this.innerX		 = this.posX + this.offsetx;
	this.innerY 	 = this.poxY + this.offsety;
	this.innerW 	 = this.w - this.offsetx * 2;
	this.innerH 	 = this.h - this.offsety * 2;
}
PreloadProgressBar.prototype = new createjs.Shape();
PreloadProgressBar.prototype.updateProgress = function(current, full) {
	this.graphics.clear();
	//stroke
	this.graphics.beginFill(this.strokecolor).drawRoundRect(this.posX,this.poxY,this.w,this.h,
		this.radius,this.radius,this.radius,this.radius);

	//background
	this.graphics.beginFill(this.bgcolor).drawRoundRect(this.innerX, this.innerY, this.innerW, this.innerH,
		this.radius,this.radius,this.radius,this.radius);
	//progressBar
	this.graphics.beginFill(this.color).drawRoundRect(this.innerX, this.innerY, this.innerW * current / full, this.innerH,
		this.radius,this.radius,this.radius,this.radius);

	this.graphics.endFill();

	console.log("ProgressBar pos X:" + this.x + ", Y:" + this.y);
};