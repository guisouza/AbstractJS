//File : src/core/parsers/x-ajax.js

(function(x){
	'use strict';
	x.core.addParser('x-ajax',function(element,controller){
		var URL = element.getAttribute('x-ajax');

		if (element.tagName.toUpperCase() == 'FORM'){

			if (element.getAttribute('x-model')){

				var name = element.getAttribute('x-model');

				if (!controller[name]){
					controller.appendModel(new x.Model(controller,element));

				}else{
					controller[name].appendDom(element);
				}

			}

			element.addEventListener('submit', function(e) {
				e.preventDefault();
			});

		}else{

		}

	});
})(this.x);