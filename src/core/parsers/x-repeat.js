//File : src/core/parsers/x-ajax.js

var z ;

(function(x){
	'use strict';
	x.core.addParser('x-repeat',function(element,controller){
		var statement = element.getAttribute('x-repeat').trim().split('in');
		var data = statement[1].trim();
		controller.watch(data,function(){
			console.log('mudei ! =D ');
		});
		console.log(element.innerHTML);

	});
})(this.x);