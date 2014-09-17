//File : src/core/coreMethods/x.core.addController.js

(function(x){
'use strict';
/**
 * [addController description]
 * @param {[type]} controllerName
 * @param {[type]} htmlElement
 */
x.core.addController = function(controllerName,htmlElement){

	if (x.controllers[controllerName] === undefined){
		x.controllers[controllerName] = new x.Controller(controllerName,htmlElement);
	}
	x.core.mapper.map(htmlElement,x.controllers[controllerName]);
	
	return x.controllers[controllerName];
};

})(this.x);
