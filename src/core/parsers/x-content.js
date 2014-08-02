//File : src/core/parsers/x-content.js

(function(x){
	'use strict';
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
				for(var field in tmplVars){
					var tmplVar = tmplVars[field].replace('{{','').replace('}}','');
					iteration = iteration.replace(tmplVars[field],extractField(tmplVar,data));
				}
				result = result+iteration;
			});
			element.innerHTML = result;

			x.core.parse('events',element,controller);
		}});
		
		function extractField(stringField,object){
			var fieldPath = '';
			if (stringField.indexOf('.') > 0){
				fieldPath = stringField.split('.');
				stringField = stringField.replace(fieldPath[0]+'.','');
				return extractField(stringField,object[fieldPath[0]]);
			}else if(stringField.indexOf('][') > 0){
				fieldPath = stringField.split('][');
				console.log(fieldPath);
			}else if(stringField.indexOf('[') > 0){
				fieldPath = stringField.split('[');
				console.log(fieldPath);
			}else{
				return object[stringField];
			}
		}
	});
})(this.x);