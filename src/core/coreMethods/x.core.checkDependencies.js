//File : src/core/coreMethods/x.core.checkDependencies.js

(function(x){

'use strict';
/**
 * Check and load Controller dependencies
 * @param      {Array}   dependenciesNames
 */
x.core.checkDependencies = function(dependencies){

	if (typeof dependencies !== 'object'){
    dependencies = dependencies.toString().match(/\([^/)]+\)/)[0].replace(/\(/,'').replace(/\)/,'');
    if (dependencies.indexOf(',') !== -1){
      dependencies =dependencies.split(',');

      dependencies.push(false);
      console.log(dependencies);
    }else{
      dependencies = [dependencies,false];

    }
  }
  
	var rDependencies = [];
	for(var dependencie in dependencies){
		if (dependencie < dependencies.length-1){

      console.log(x.utils);
      console.log(x.services);

			if (x.services[dependencies[dependencie]]){
				rDependencies[dependencie] = x.services[dependencies[dependencie]];
			}else if (x.utils[dependencies[dependencie]]){
        rDependencies[dependencie] = x.utils[dependencies[dependencie]];
      }else{
        throw(dependencies[dependencie]+' dependencie Not Fount =[');
      }
		}
	}

  console.log(rDependencies);
	return rDependencies;
};
})(this.x);
