//File : src/methods/x.init.js
(function(x,world){
	'use strict';

	/**
	 * Check and load Controller dependencies
	 * @return {[type]}
	 */
	x.methods.init = function(){
		return x.core.parse();
	};
	document.addEventListener('DOMContentLoaded', x.methods.init, false);
})(this.x,this);
