//File : src/core/coreMethod/x.core.render.js

(function(x){

	'use strict';
	/**
	 * [render description]
	 * @param  {[type]} obj
	 * @param  {[type]} fields
	 * @return {[type]}
	 */
	x.core.render = function(obj,fields){
		var text = obj.originalText;
		for (var field in fields){
			text = text.replace(new RegExp(field,'g'),fields[field]);
		}
		return text;
	};

})(this.x);
