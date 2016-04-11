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
	canvas.style.display = "block";
	canvas.style.margin = "0 auto";
	canvas.width  = 320;
	canvas.height = 400;

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

    scaleCanvas();
	//var newScale = clienWidth / stage.canvas.width > clientHeight / stage.canvas.height ? clientHeight / stage.canvas.height:clienWidth / stage.canvas.width;
	//console.log("new scale is " + newScale);
	//stage.scaleX = stage.scaleY = newScale;
	//canvas.width 	*= newScale;
	//canvas.height 	*= newScale;
	window.addEventListener('resize', resizeHandler, false);
	stage.update();


	
	stage.addChild(debugText);
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

	stage.scaleX = stage.scaleY = ratio;
	debugText.log("data:" + [canvas.width, canvas.height, w, h]);
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
