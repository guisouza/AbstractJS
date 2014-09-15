//File : src/core/coreMethods/x.core.checkDependencies.js

(function(x){

'use strict';
/**
 * Check and load Controller dependencies
 * @param      {Array}   dependenciesNames
 */
x.core.checkDependencies = function(dependencies){
	var rDependencies = [];
	for(var dependencie in dependencies){
		if (dependencie < dependencies.length-1){
			if (x.services[dependencies[dependencie]]){
				rDependencies[dependencie] = x.services[dependencies[dependencie]];
			}else{
				throw(dependencies[dependencie]+' dependencie Not Fount =[');
			}
		}
	}
	return rDependencies;
};
})(this.x);
