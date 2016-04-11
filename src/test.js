var script = document.createElement('script');
script.src = "lib/createjs.js";
document.body.appendChild(script);
var stage ;
script.onload = function (){
	// main createjs test begin
	console.log("main method begins...");

	console.log("create canvas...");
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
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

    //screen fit test
    var clienWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;

	console.log("windowscaling... " + clienWidth + " : " + clientHeight);

	var ratio = canvas.width / canvas.height;
	var iWidth = window.innerWidth;
	var iHeight = window.innerHeight;
	var windowRatio = iWidth / iHeight;
	if(ratio > windowRatio){
		canvas.style.width = iWidth;
		canvas.style.height = iHeight * ratio;
	}else{
		canvas.style.height = iHeight;
		canvas.style.width = iWidth / ratio;
	}

	//var newScale = clienWidth / stage.canvas.width > clientHeight / stage.canvas.height ? clientHeight / stage.canvas.height:clienWidth / stage.canvas.width;
	//console.log("new scale is " + newScale);
	//stage.scaleX = stage.scaleY = newScale;
	//canvas.width 	*= newScale;
	//canvas.height 	*= newScale;
	stage.update();
};

function tick(event){
	stage.update(event);
}
