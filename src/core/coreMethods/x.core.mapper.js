//File : src/core/coreMethods/x.core.mapper.js

(function(x){
	'use strict';
	x.core.mapper = (function(stringField,object){

		function checkTextNode(obj){
			if (obj.nodeType === 3 && obj.textContent.match(/\{\{.*\}\}/g)){
				return true;
			}
		}

		function extractFields(placeholders,Controller,obj){
			var fields = {};
			for (var field in placeholders){
				Controller.addPlaceholder([placeholders[field]],obj);
				fields[placeholders[field]] = x.core.extractField(placeholders[field],Controller);
			}
			return fields;
		}

		function define(DOM,Controller){
      
			var placeholders = DOM.match(/{{[^}]+}}/g);
			return{
				fields : placeholders,
				DOM : DOM
			};
		}

		function iterate(htmlElement,Controller){
			if(htmlElement.getAttribute && (htmlElement.hasAttribute('x-repeat') === false ) && (htmlElement.hasAttribute('x-content') === false)){
				for(var obj in htmlElement.childNodes){
					if (!isNaN(obj = parseInt(obj))){
						obj = htmlElement.childNodes[obj];
						interact(obj,Controller);
					}
				}
      }
		}

		function interact(obj,Controller){
			if (checkTextNode(obj)){
				obj.originalText = obj.wholeText;
				var placeholders = define(obj.originalText,Controller);
				placeholders.fields = extractFields(placeholders.fields,Controller,obj);
				obj.originalFields = placeholders.fields;
				obj.textContent = x.core.render(obj,placeholders.fields);
			}else{
				iterate(obj,Controller);
			}
		}

		return {
			map : function(htmlElement,Controller){
				iterate(htmlElement,Controller);
			}
		};
	})(x);
}(this.x));