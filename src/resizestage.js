// need to be load with preload file, package them into one file
function resizeCanvas(stage){
	var canvas = stage.canvas;

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

	rescaleStage(stage, ratio);
}

function rescaleStage(stage, ratio){
	stage.scaleX = stage.scaleY = ratio;
	console.log("stage scale ready");
	stage.update();
}