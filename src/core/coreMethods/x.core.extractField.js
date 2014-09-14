//File : src/core/coreMethods/x.core.extractField.js

(function(x){
	'use strict';
/**
 * Find an object field by string 
 * @param      {String}   dependenciesNames
 */
x.core.extractField = function(stringField,object,index){
	stringField = stringField.replace(/\}\}/g,'').replace(/\{\{/g,'').trim();

	if (object){
		var fieldPath = '';
		if (stringField.indexOf('.') > 0){
			fieldPath = stringField.split('.');
			stringField = stringField.replace(fieldPath[0]+'.','');
			return x.core.extractField(stringField,object[fieldPath[0]]);
			}else if(stringField.indexOf('][') > 0){
				fieldPath = stringField.split('][');
			}else if(stringField.indexOf('[') > 0){
				fieldPath = stringField.split('[');
		}else{
			return object[stringField];
		}
	}
};
}(this.x));