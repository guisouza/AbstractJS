//File : src/core/parsers/x-content.js

(function(x){
'use strict';
/**
 * [description]
 * @param  {[type]} element
 * @param  {[type]} controller
 * @return {[type]}
 */
x.core.addParser('x-content',function(element,controller){
	var URL = element.getAttribute('x-content');
	var collection = element.getAttribute('x-collection') || x.core.randomString();
	var tmpl = element.innerHTML;
	var root = 'data' || element.getAttribute('x-root');
	var result = '';
	var tmplVars = tmpl.match(/\{\{.*\}\}/g);

	x.core.ajax({
		url : URL,
		callback : function(e){

			e = JSON.parse(e);
			controller[collection] = e[root]; 

			e[root].forEach(function(data,index){
				var iteration = tmpl;
				data.$index = index;
				for(var field in tmplVars){
					var tmplVar = tmplVars[field].replace(/}}|{{/g,'');
					iteration = iteration.replace(tmplVars[field],x.core.extractField(tmplVar,data));
				}
				result = result+iteration;
			});
			element.innerHTML = result;

			x.core.parse('events',element,controller);
		}
	});
});
})(this.x);