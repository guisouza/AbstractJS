

//File : src/controller.js

;(function(x){
  'use strict';
  /**
   * [Service description]
   */
  x.Util = function(){
  		/**
  		 * Creating the service
  		 */
      

    var dependencies = x.core.checkDependencies(arguments[1]);
    if (typeof arguments[1] === 'object'){
        x.utils[arguments[0]] = new arguments[1][arguments[1].length-1](dependencies);
     }else{
        x.utils[arguments[0]] = new arguments[1](dependencies); 
     }
  };

})(this.x);