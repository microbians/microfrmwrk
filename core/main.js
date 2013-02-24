/* 
* microfrmrk - Framework for modern HTML5/CSS3 browsers - microbians.com
* version 0.1
* Released under the MIT license.
* Based on jQuery, Zpeto, ...
*/ 

// Main microfrmrk $ Function

$ = function(q,c){

		if ( q === undefined ) 	var q = document;
		if ( q === null ) 		throw '$(HTMLelement) is not ready';
		
		if ( typeof q === 'string' ) {
			if (c !== undefined && typeof c === 'object' ) {
				// $(query, context) <= Gets a Node List that match a query inside a context Nodes List Object
				if (c.$ !== undefined) {
					// c is a Nodes List
					var Nodes= [];
					c.each(function(){
						Nodes = Nodes.concat( Array.prototype.slice.call( this.querySelectorAll(q) ) );
					});
				} else {
					// c is other HTML element
					if (c.toString().indexOf('DOMWindow')!==-1) {
						var Nodes = [];
					} else {
						var Nodes = Array.prototype.slice.call( c.querySelectorAll(q) );
					}
				}
			} else {
				// q is "String" so can by HTML or selector
				if ( q.charAt(0) === '<' ) {
					// q is HTML string creation		
					var receptacle = document.createElement('div');
					// This dirty trick works only for SVG!
					// Test if the tag is a SVG tag
					receptacle.innerHTML = '<svg>'+q+'</svg>';
					if (receptacle.childNodes[0].childNodes[0] && receptacle.childNodes[0].childNodes[0].toString().indexOf('SVG')!=-1) {
						var Nodes = Array.prototype.slice.call( receptacle.childNodes[0].childNodes );
						// Set is a set of SVG nodes
					} else {
						receptacle.innerHTML=q;
						var Nodes = Array.prototype.slice.call( receptacle.childNodes );
					}
				} else {
					// q is selector so Nodes is an Array list of HTML Elements
					var Nodes = Array.prototype.slice.call(document.querySelectorAll(q));
				}
			}
		} else if (typeof q === 'function') {
			// q is a function must be call on DOMContentLoaded (ready)
			return $(document).ready(q);
		} else {
			if (q.$ !== undefined) {
				// q is a Nodes list... so return it ( o_o )
				return q
			} else {
				// q is HTML element
				var Nodes = [];
				Nodes.push(q);
				if (q.toString().indexOf('DOMWindow')!==-1) {
					// SPECIAL CASE FOR WINDOW and FRAMES or IFRAMES windows
					// if is a window object return it as array
					// here to add especific window functions (scroll, width, ...)
					return Nodes
				}
			}
		}
		//Add to the Array the functions (this take out IE the las reduct in webkit domination)
		Nodes.__proto__= $;
		return Nodes;
}

// Add functions to Nodes Array
/////////////////////////////////////////////////////////////////////////

$.forEach 	= Array.prototype.forEach;
$.reduce 	= Array.prototype.reduce;
$.push 		= Array.prototype.push;
$.sort 		= Array.prototype.sort;
$.indexOf 	= Array.prototype.indexOf;
$.concat 	= Array.prototype.concat;

// Find Nodes by query inside this
$.$ = $.find = $

// onReady
$.ready = function(fn) {

	this.each( function() {
		if (this.readyState==='loading') {
			this.addEventListener('DOMContentLoaded', fn, false);
		} else {
			fn.call(this);
		}
	});
	return this;
}

// Check if Nodes are SVG
$.isSVG = function() {
	return this[0].toString().indexOf('SVG')!=-1
}
	
// Add $() Nodes to the current Nodes list
$.add = function(q) {
	return $(this,q);
}

// Extend Nodes "Array" list / fn(index,arr) on witch this === element each time
$.each = function(fn) {
	this.forEach(function(el,index,arr){
		fn.call(el, index, arr);
	});
	return this
}

// Set/Get Attribute
$.attr = function(prop,val) {
	if (val !=undefined ) {
		this.each(function(){
			this.setAttribute(prop, val);
		});
	} else return this[0].getAttribute(prop);
	return this;
}

// Set css of each element in Node list or get the computed proterty
$.css = function (p,v) {
	if (typeof p === 'string' && v === undefined) {
		// Return css property
			if (this.length > 0 ) {
				var returnValues=[]; // Real Array
				this.each(function(){
					var computedStyle = window.getComputedStyle(this, null);
					if (computedStyle !== null ) {
						var propertyValue = computedStyle.getPropertyValue(p);
						if (propertyValue === null) {
							returnValues.push(undefined);
						} else {
							returnValues.push(propertyValue);
						}
					}
				});
				if (returnValues.length>1) 	return returnValues;
				else 						return returnValues[0];
			} else {
				return undefined;
			}
	} else if (typeof p !== 'object') {
		if (typeof v !== 'function') {
			// Set property "p" (string) to value "v" (string)||(number)
			v = v + (typeof v === 'number' ? 'px' : '');
			this.each(function(){ 
				this.style[p]= v;
			});
		} else {
			// v is a function that return numeric or string values (numeric+unit)
			this.each(function(index){
				var value = v(index);
				this.style[p]=value + (typeof value === 'number' ? 'px' : '');
			});
		}
	} else {
		// Set properties of "p" (Object) { property1: "value1", property2: "value2", ... }
		for ( prop in p ) {
			this.each(function(){
				if (this.style) this.style[prop]=p[prop]; 
			});
		}
	}
	return this;
}

// Append "o" as HTML string or "o" as Node list
$.append = function(o){
	this.each(function(){
		var el=this;
		// 'el' is the element on the o Nodes of DOM elements
		$(o).each(function(){el.appendChild(this)});
	});
	return this
}

console.log("loaded: main");