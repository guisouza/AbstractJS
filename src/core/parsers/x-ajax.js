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

			console.log(element.getAttribute('action'));

			element.addEventListener('submit', function(e) {
				e.preventDefault();
				console.log('teste');
				console.log(element.getAttribute('method'));
				x.core.ajax({
					method : element.getAttribute('method'),
					url:element.getAttribute('action'),
					callback:function(){
						console.log('TODO : Simple ajax return ');
					}
				});
			});

		}else{

		}

	});
})(this.x);