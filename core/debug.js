/* 
* microfrmrk - Framework for modern HTML5/CSS3 browsers - microbians.com
*
* core.debug.js
* All debug stuff
*
*/ 

if (!console) {
	console={}
	console.log=function(t){
	    document.write(t+"<br/>")
	}
}

console.log ("loaded: core.debug.js");
