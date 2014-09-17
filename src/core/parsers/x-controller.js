//File : src/core/parsers/x-controller.js

(function(x){
'use strict';
/**
 * [description]
 * @param  {[type]} element
 * @return {[type]}
 */
x.core.addParser('x-controller',function(element){

	var controller = element.getAttribute('x-controller');
	return x.core.addController(controller,element);

});
})(this.x);