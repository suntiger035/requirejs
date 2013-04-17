var Cache = {};
var Module_cache = {};
	var doc = document,
		head = doc.getElementsByTagName('head')[0];

function Module( url ){
	this.url = url;	
	this.id = url;
}

Module.prototype = {
	constructor : Module,
	getFactory : function(){
		return Cache[this.id];	
	}
};

function define( factory ){
	var script = getCurrentScript();
	
	Cache[script.src] = factory();	
}

function getCurrentScript(){
    if(document.currentScript){
        return document.currentScript;
    }
    var els = document.getElementsByTagName("script");
    for(var i = 0, el; el = els[i++];){
        if (el.readyState === 'interactive') {
            return el
        }
    }
    return null
}

function use(urls, callback){
	var arguments_arr = [];
	//确保urls是数组
	urls = typeof urls === 'string' ? [urls] : urls;
	
	
	
	function cb( module ){
		arguments_arr.push( module.getFactory() );
		if( urls.length === 0 ){
			alert(arguments_arr);
			callback.apply(null, arguments_arr);	
		}
	}
	
	for( var i = 0, len = urls.length; i < len; i++ ){
		(function(item){
			var module = new Module(item);
			Module_cache[item] = module;
			loadJS( item, function(){
				urls.shift();
				cb(module);						  
			});						  
		})(urls[i]);
	}
}

function loadJS( url, callback ){
	
	fetch( url, callback );	
}