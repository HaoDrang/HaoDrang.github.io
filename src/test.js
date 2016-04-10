var script = document.createElement('script');
script.src = "./lib/createjs.js";
document.body.appendChild(script);
script.onload = function (){
	// main createjs test begin
	console.log("main method begins...");

	console.log("create canvas...");
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.width = 320;
	canvas.height = 200;
	/*
	var ctx = canvas.getContext("2d");
	ctx.rect(0,0,320,200);
	ctx.stroke();
	*/
	var stage = new createjs.Stage(canvas);
	if(stage)
	{
		console.log("stage is ready ");
	}
	
	var circle = new createjs.Shape();
	circle.graphics.beginFill(createjs.Graphics.getRGB(200, 200, 200, 0.5)).drawCircle(0,0,560);

	console.log("windowscale " + window.innerWidth);
	var newScale = window.innerWidth/ stage.canvas.width;
	stage.scaleX = stage.scaleY = newScale;
	canvas.width *= newScale;
	canvas.height *= newScale;

	circle.x = circle.y = 50;
	stage.addChild(circle);

	var logo = new createjs.Bitmap('images/testimg.gif');

	stage.update();

};
