//File : src/core/coreMethods/x.core.serialize.js

(function(x){
	'use strict';
	/**
	 * [serialize description]
	 * @param  {[type]} data
	 * @return {[type]}
	 */
	x.core.serialize = function(data){
		var result = '';
		for(var field in data){
			result +=field+'='+data[field];
		}
		data = encodeURI(data);
	};
})(this.x);
