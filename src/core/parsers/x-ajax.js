//File : src/core/parsers/x-ajax.js


(function(x){
	'use strict';
	/**
	 * [description]
	 * @param  {[type]} element
	 * @param  {[type]} controller
	 * @return {[type]}
	 */
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