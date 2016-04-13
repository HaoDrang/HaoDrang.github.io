// need to be load with preload file, package them into one file
function resizeCanvas(stage){
	var canvas = stage.canvas;

	var w = 0;
	var h = 0;
	var canvasWidth = CANVAS_W;
	var canvasHeight = CANVAS_H;

	w = jQuery(window).width();
	h = jQuery(window).height();

	var ratio = 1;
	if (w / h < canvasWidth / canvasHeight) {
		ratio = w / canvasWidth;
		canvas.width = w;
		canvas.height = (ratio * canvasHeight);
		
	} else {
		ratio = h / canvasHeight;
		canvas.height = h;
		canvas.width = (ratio * canvasWidth);
	}

	rescaleStage(stage, ratio);
}

function rescaleStage(stage, ratio){
	stage.scaleX = stage.scaleY = ratio;
	//console.log("stage scale ready, stage scale:" + scale);
	stage.update();
}