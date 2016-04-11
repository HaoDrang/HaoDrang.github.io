
var CANVAS_W = 490;
var CANVAS_H = 700;

var script = document.createElement('script');
script.src = "lib/createjs.js";
document.body.appendChild(script);
var stage ;
var debugText;
script.onload = function (){

	initialize();
	debugText = new DebugLabel();
	// main createjs test begin
	console.log("main method begins...");

	console.log("create canvas...");
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.id = "gameCanvas";
	document.body.style.overflow = "hidden";
	//prevent default touch , but we can add something we need
	//maybe this can cause some touch issues, if so remember to waste this
	document.ontouchstart = function(e){ e.preventDefault(); };
	//canvas.style.display = "block";
	canvas.style.margin = "0 auto";
	canvas.width  = 490;
	canvas.height = 700;

	stage = new createjs.Stage(canvas);
	if(stage)
	{
		console.log("stage is ready ");
	}
	
	var background = new createjs.Shape();
	background.graphics.beginFill(createjs.Graphics.getRGB(200, 200, 200, 0.5)).drawRect(0,0,canvas.width, canvas.height);
	stage.addChild(background);

	var logo = new createjs.Bitmap("./images/testimg.gif");

	console.log("logo info");
	console.log(logo.x);
	console.log(logo.y);

	stage.addChild(logo);

	stage.update();
	
	//full screen test
	/*
	if (canvas.requestFullscreen) {
		console.log('1');
	  canvas.requestFullscreen();
	} else if (canvas.msRequestFullscreen) {
		console.log('2');
	  canvas.msRequestFullscreen();
	} else if (canvas.mozRequestFullScreen) {
		console.log('3');
	  canvas.mozRequestFullScreen();
	} else if (canvas.webkitRequestFullscreen) {
		console.log('4');
	  canvas.webkitRequestFullscreen();
	}
	*/

	//update test
	createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

	window.addEventListener('resize', resizeHandler, false);
	stage.update();

	stage.addChild(debugText);

	scaleCanvas();
};

function tick(event){
	stage.update(event);
}

function resizeHandler(event){
	scaleCanvas();
}

function scaleCanvas(){

	var canvas = document.getElementById("gameCanvas");

    var clienWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;

	// console.log("canvas... " + clienWidth + " : " + clientHeight);
	
	var w = 0;
	var h = 0;
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	
	if (!window.innerWidth) {
		if ((document.documentElement.clientWidth != '0')) {
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		} else {
			w = document.body.clientWidth;
			h = document.body.clientHeight;	
		}
	} else {
		w = window.innerWidth;
		h = window.innerHeight;
	}

	//w = $(window).width();
	//h = $(window).height();

	var ratio = 1;
	if (w / h > canvasWidth / canvasHeight) {
		ratio = h / canvasHeight;
		canvas.height = h;
		canvas.width = (h * canvasWidth / canvasHeight);
		
	} else {
		ratio = w / canvasWidth;
		canvas.width = w;
		canvas.height = (w * canvasHeight / canvasWidth);
	}

	debugText.log("w " + w + " : h " + h + " ratio:" + ratio);
	stage.scaleX = stage.scaleY = ratio;
	console.log("stage scale ready");
	stage.update();
}

function initialize(){

	DebugLabel.prototype = new createjs.Text();
	DebugLabel.prototype.log = function(str){
		this.text = str;
	};
}

function DebugLabel(){

}
