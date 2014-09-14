//File : src/core/parsers/x-ajax.js

(function(x){
'use strict';
x.core.addParser('x-repeat',function(element,controller){
	var statement = element.getAttribute('x-repeat').trim().split('in');
	var data = statement[1].trim();
	var template = element.innerHTML;
	var iterations = controller[data].length;

	x.core.repeatIterator(statement,data,template,element,controller);

	controller.watch(data,function(){
		x.core.repeatIterator(statement,data,template,element,controller);
	});
});
})(this.x);