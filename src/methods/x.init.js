//File : src/methods/x.init.js
(function(x,world){
	'use strict';
	/**
	 * Check and load Controller dependencies
	 * @param      {Array}   dependenciesNames
	 */
	x.methods.init = function(){
		x.core.parse();
	};
	document.addEventListener('DOMContentLoaded', x.methods.init, false);
})(this.x,this);