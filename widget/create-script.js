// JavaScript Document
var LOADED_REGEXP = /loaded|complete/g;

function fetch(url, callback){
	var	script = doc.createElement('script');
	callback = callback || function(){};

	script.type= 'text/javascript';
	script.src = url;
	script.onload = script.onerror = script.onreadystatechange = function(){
		if( !script.readyState || ( script.readyState && LOADED_REGEXP.test( script.readyState ) )){
			callback();		
		}
		script.onload = script.onerror = script.onreadystatechange = null;
		script = null;
		head = null;
	};	
	head.appendChild( script );
}