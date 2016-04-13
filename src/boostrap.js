/* by
*  4/11/2016
*  load engine and create a preload panel 
*/
var LIB_CREATEJS = "src/lib/createjs.js"; //const is not standard
var LIB_JQUERY	 = "src/lib/jq.js";
var PRELOAD 	 = "src/preload.min.js";

(function Boostrap(){

	appendScript(LIB_CREATEJS, function(){
		appendScript(LIB_JQUERY, function(){
			appendScript(PRELOAD, function(){
				initialize();
			});
		});
	});

})();

function appendScript(scriptSrc, callback){
	var script = document.createElement('script');
	script.type="text/javascript";
	document.body.appendChild(script);
	script.src = scriptSrc;
	script.onload = callback;
}
// when engine is ready and preload.js is ready, create a new stage
function initialize(){
	var preload = new Preload();
	preload.initialize();
}