//File : src/core/coreMethods/x.core.repeatIterator.js

(function(x){
	'use strict';
  /**
   * [repeatIterator description]
   * @param  {[type]} statement
   * @param  {[type]} data
   * @param  {[type]} template
   * @param  {[type]} element
   * @param  {[type]} controller
   * @return {[type]}
   */
	x.core.repeatIterator = function(statement,data,template,element,controller){

    var tmplVars = template.match(/\{\{.*\}\}/g);
    var result = '';

    controller[data].forEach(function(data,index){
      var iteration = template;
      data.$index = index;
      for(var field in tmplVars){
        var tmplVar = tmplVars[field].replace(/}}|{{/g,'');
        iteration = iteration.replace(tmplVars[field],x.core.extractField(tmplVar,data));
      }

      result = result+iteration;
    });

    element.innerHTML = result;

    x.core.parse('events',element,controller);
	};


})(this.x);