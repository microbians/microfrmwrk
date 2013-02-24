/* 
* microfrmrk - Framework for modern HTML5/CSS3 browsers - microbians.com
* version 0.1
* Released under the MIT license.
* Based on jQuery, Zpeto, ...
*/ 

// Core basic functions

microfrmwrk={};
microfrmwrk.load = function(js) {
	js=js.replace(/\./g,'\/');
	var script = document.createElement('script');
	
	// From meouw at StackOverflow
	var scriptEls = document.getElementsByTagName( 'script' );
	var thisScriptEl = scriptEls[0];
	var scriptPath = thisScriptEl.src;
	var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf( '/' )+1 );
	    
	document.write('<script language="javascript" type="text/javascript" src="'+scriptFolder+js+'.js"><\/script>');
}

// Core loading
microfrmwrk.load('core.debug');
microfrmwrk.load('core.main');

console.log("loaded: microfrmwrk.load")