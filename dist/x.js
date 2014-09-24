//File : src/core/x.js


(function(world){
'use strict';
NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * [x description]
 * @return {[type]}
 */
world.x = function(){ 

  return {
    methods : {

    },
    controllers : {

    },
    services : {

    },
    utils : {

    },
    core : {
      parsers : {

      }
    }
  };
}();
})(this);
//File : src/core/coreMethods/x.core.addController.js

(function(x){
'use strict';
/**
 * [addController description]
 * @param {[type]} controllerName
 * @param {[type]} htmlElement
 */
x.core.addController = function(controllerName,htmlElement){

	if (x.controllers[controllerName] === undefined){
		x.controllers[controllerName] = new x.Controller(controllerName,htmlElement);
	}
	x.core.mapper.map(htmlElement,x.controllers[controllerName]);
	
	return x.controllers[controllerName];
};

})(this.x);

//File : src/core/coreMethods/x.core.addParser.js

(function(x){
'use strict';
/**
 * Add a new DOM parser
 * @param {[type]} parserName
 * @param {[type]} parser
 */
x.core.addParser = function(parserName,parser){
  if (parserName.indexOf('.') != -1){
		parserName = parserName.split('.');
		if (!x.core.parsers[parserName[0]]){
			x.core.parsers[parserName[0]] = {};
		}
    x.core.parsers[parserName[0]][parserName[1]] = parser;
	}else{
    x.core.parsers[parserName] = parser;
	}
};
})(this.x);

//File : src/core/coreMethods/x.core.ajax.js

(function(x){
'use strict';
/**
 * Ajax calls
 * @param  {Object} args
 * @return {Boolean}
 */
x.core.ajax = function(args){
			var callback = args.callback || function(){return false;};
			var url = args.url;
			var method = args.method || 'GET';
			var data = args.data || false;

	        var xhr;
	         
	        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	        else {
	            var versions = ["MSXML2.XmlHttp.5.0", 
	                            "MSXML2.XmlHttp.4.0",
	                            "MSXML2.XmlHttp.3.0", 
	                            "MSXML2.XmlHttp.2.0",
	                            "Microsoft.XmlHttp"];
	 
	             for(var i = 0, len = versions.length; i < len; i++) {
	                try {
	                    xhr = new ActiveXObject(versions[i]);
	                    break;
	                }
	                catch(e){}
	             }
	        }
	        xhr.onreadystatechange = ensureReadiness;
	        function ensureReadiness() {
	            if(xhr.readyState < 4) {
	                return;
	            }
	            if(xhr.status !== 200) {
	                return;
	            }
	            if(xhr.readyState === 4) {
	                for (var controller in x.controllers){
	                	x.controllers[controller].xApply(callback,[xhr.response]);
	                }
	            }           
	        }

	        xhr.open(method, url, true);
	        if (method.toUpperCase() == 'POST'){
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				data = x.core.serialize(data);
				xhr.send(data);
	        }else{
				xhr.send('');     	
	        }
};
})(this.x);

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
      dependencies = dependencies.split(',');
      dependencies.push(false);
    }else{
      dependencies = [dependencies,false];

    }
  }
  
	var rDependencies = [];
	for(var dependencie in dependencies){
		if (dependencie < dependencies.length-1){

			if (x.services[dependencies[dependencie]]){
				rDependencies[dependencie] = x.services[dependencies[dependencie]];
			}else if (x.utils[dependencies[dependencie]]){
        rDependencies[dependencie] = x.utils[dependencies[dependencie]];
      }else{
        throw(dependencies[dependencie]+' dependencie Not Fount =[');
      }
		}
	}
	return rDependencies;
};
})(this.x);

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
//File : src/core/coreMethods/x.core.mapper.js

(function(x){
'use strict';
/**
 * [description]
 * @param  {[type]} stringField
 * @param  {[type]} object
 * @return {[type]}
 */
x.core.mapper = (function(stringField,object){

  /**
   * [checkTextNode description]
   * @param  {[type]} obj
   * @return {[type]}
   */
	function checkTextNode(obj){
		if (obj.nodeType === 3 && obj.textContent.match(/\{\{.*\}\}/g)){
			return true;
		}
	}



  /**
   * [extractFields description]
   * @param  {[type]} placeholders
   * @param  {[type]} Controller
   * @param  {[type]} obj
   * @return {[type]}
   */
	function extractFields(placeholders,Controller,obj){
		var fields = {};
		for (var field in placeholders){
			Controller.addPlaceholder([placeholders[field]],obj);
			fields[placeholders[field]] = x.core.extractField(placeholders[field],Controller);
		}
		return fields;
	}


  /**
   * [define description]
   * @param  {[type]} DOM
   * @param  {[type]} Controller
   * @return {[type]}
   */
	function define(DOM,Controller){
    
		var placeholders = DOM.match(/{{[^}]+}}/g);
		return{
			fields : placeholders,
			DOM : DOM
		};
	}



  /**
   * [iterate description]
   * @param  {[type]} htmlElement
   * @param  {[type]} Controller
   * @return {[type]}
   */
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



  /**
   * [interact description]
   * @param  {[type]} obj
   * @param  {[type]} Controller
   * @return {[type]}
   */
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


    
    /**
     * [map description]
     * @param  {[type]} htmlElement
     * @param  {[type]} Controller
     * @return {[type]}
     */
		map : function(htmlElement,Controller){
			iterate(htmlElement,Controller);
		}
	};
})(x);
}(this.x));




//File : src/core/coreMethods/x.core.parse.js

(function(x){

  'use strict';
  /**
   * [parse description]
   * @return {[type]}
   */
  x.core.parse = function(){

    if(typeof arguments[0] == 'string'){
      return applyParserGroup(arguments[0],arguments[1],arguments[2]);
    }else{
      var controllerElements = document.querySelectorAll('[x-controller]');
      for(var element in controllerElements){
        var index = element;
        element = controllerElements[element];
        if (element.tagName !== undefined){
          var controller = x.core.parsers['x-controller'](element);
          for(var parser in x.core.parsers){
            if (typeof x.core.parsers[parser] == 'function'){
              applyParser(parser,x.core.parsers[parser],element,controller);
            }else{
              applyParserGroup(parser,element,controller);
            }
          }
        }
      }
    }


    /**
     * [applyParserGroup description]
     * @param  {[type]} parserGroup
     * @param  {[type]} element
     * @param  {[type]} controller
     * @return {[type]}
     */
    function applyParserGroup(parserGroup,element,controller){
      for (var parser in x.core.parsers[parserGroup]){
        applyParser(parser,x.core.parsers[parserGroup][parser],element,controller);
      }
    }



    /**
     * [applyParser description]
     * @param  {[type]} selector
     * @param  {[type]} parser
     * @param  {[type]} element
     * @param  {[type]} controller
     * @return {[type]}
     */
    function applyParser(selector,parser,element,controller){
      if (parser != 'x-controller'){
        var ELs = element.querySelectorAll('['+selector+']');
        ELs.forEach(function(element){
          parser(element,controller);
        });
      }
    }
  };

})(this.x);

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

//File : src/core/parsers/x-ajax.js


(function(x){
	'use strict';
	/**
	 * [description]
	 * @param  {[type]} element
	 * @param  {[type]} controller
	 * @return {[type]}
	 */
	x.core.addParser('x-ajax',function(element,controller){
		var URL = element.getAttribute('x-ajax');

		if (element.tagName.toUpperCase() == 'FORM'){

			if (element.getAttribute('x-model')){

				var name = element.getAttribute('x-model');

				if (!controller[name]){
					controller.appendModel(new x.Model(controller,element));

				}else{
					controller[name].appendDom(element);
				}

			}

			element.addEventListener('submit', function(e) {
				e.preventDefault();
				x.core.ajax({
					method : element.getAttribute('method'),
					url:element.getAttribute('action'),
					callback:function(){
						console.log('TODO : Simple ajax return ');
					}
				});
			});

		}else{

		}

	});
})(this.x);
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
//File : src/core/parsers/x-controller.js

(function(x){
'use strict';
/**
 * [description]
 * @param  {[type]} element
 * @return {[type]}
 */
x.core.addParser('x-controller',function(element){

	var controller = element.getAttribute('x-controller');
	return x.core.addController(controller,element);

});
})(this.x);
//File : src/core/parsers/x-events.js

(function(x){
'use strict';



/**
 * [description]
 * @param  {[type]} element
 * @param  {[type]} controller
 * @return {[type]}
 */
x.core.addParser('events.x-click',function(element,controller){

  var action = element.getAttribute('x-click');
  var params = action.match(/\(.*\)/g)[0].replace('(','').replace(')','').split(',');
  for(var param in params){

    if (params[param].indexOf('function') != -1){
    }else{
      if (params[param][0] != "'" && params[param][0] != '"' && params[param][0] != '['){
        params[param] = parseInt(params[param]);
      }else if (params[param][0] == "'" || params[param][0] == '"'){
        params[param] = params[param].replace(/'/,'').replace(/"/,'');
      }
    }
  }

  action = action.match(/.*\(/g)[0].replace('(','');

    if (!controller[action]){
      throw('Method '+action+ ' not found =[');
    }

    element.addEventListener('click',function(){
      controller.xApply(controller[action],params);
    });

  });



/**
 * [description]
 * @param  {[type]} element
 * @param  {[type]} controller
 * @return {[type]}
 */
x.core.addParser('events.x-mouseover',function(element,controller){

  var action = element.getAttribute('x-mouseover');
  var params = action.match(/\(.*\)/g)[0].replace('(','').replace(')','').split(',');
  for(var param in params){

    if (params[param].indexOf('function') != -1){
    }else{
      if (params[param][0] != "'" && params[param][0] != '"' && params[param][0] != '['){
        params[param] = parseInt(params[param]);
      }else if (params[param][0] == "'" || params[param][0] == '"'){

        params[param] = params[param].replace('"','').replace("'",'').replace('"','').replace("'",'').replace('"','').replace("'",'');
      }
    }
  }

  action = action.match(/.*\(/g)[0].replace('(','');
    element.addEventListener('mouseover',function(){
      controller[action].apply(controller,params);
    });

});


})(this.x);
//File : src/core/parsers/x-ajax.js

(function(x){
'use strict';
/**
 * [description]
 * @param  {[type]} element
 * @param  {[type]} controller
 * @return {[type]}
 */
x.core.addParser('x-repeat',function(element,controller){
	var statement = element.getAttribute('x-repeat').trim().split('in');
	var data = statement[1].trim();
	var template = element.innerHTML;
	var iterations = controller[data].length;

	x.core.repeatIterator(statement,data,template,element,controller);

	controller.watch(data,function(){
		x.core.repeatIterator(statement,data,template,element,controller);
	});
});
})(this.x);



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
 x.Util('xHttp',[function(){

	var defaultMessage = 5;

	return{
		get : function(url,callback){
			var args = {};
			args.method = 'GET';
			args.url = url;
			args.callback = function(retorno){
				callback(retorno);
			};
			x.core.ajax(args);
		}		
	};
}]);

//File : src/controller.js
   
(function(x){
  'use strict';
  /**
   * [Collection description]
   */
  x.Collection = function(){};

})(this.x);

//File : src/controller.js

(function(x){
  'use strict';
/**
 * Controller definition
 * @param      {string}   controllerName
 * @param      {HTMLElement}   controllerName
 */
 x.Controller = function(){


  /**
   * Check if this controller is being generated by DOM or API
   */
   if (arguments[1].tagName || arguments[1] == 'API_CALL'){

    this.htmlElement = arguments[1];
    this.controllerName = arguments[0];
    this.watchers = [];
    this.placeholders = [];
    return {


      /**
       * [addPlaceholder description]
       * @param {[type]} field
       * @param {[type]} place
       */
       addPlaceholder : function(field,place){
        
        if (!this.placeholders)
          this.placeholders = {};
        if (!this.placeholders[field])
          this.placeholders[field] = [];

        this.placeholders[field].push(place);
      },


      /**
       * [getPlaceholders description]
       * @param  {[type]} index
       * @return {[type]}
       */
       getPlaceholders : function(index){
        return this.placeholders[index];
      },


      /**
       * [watch description]
       * @param  {[type]}   field
       * @param  {Function} callback
       * @return {[type]}
       */
       watch : function(field,callback){
        if (!this.watchers)
          this.watchers = {};
        if (!this.watchers[field])
          this.watchers[field] = [];

        this.watchers[field].push(callback);

      },

      /**
       * [xApply description]
       * @param  {[type]} action
       * @param  {[type]} params
       * @return {[type]}
       */
       xApply : function(action,params){

        action.apply(this,params);

        var changes = action.toString().match(/(this..+?\s*=)|(this..+?\s*.splice)|(this..+?\s*.split)/g);
        if (changes !== null){
          var i = 0;
          while (i < changes.length){
            var changed = changes[i];
            var repI = i;
            console.log(changed);


            changed = changed.replace(/(\s?=)|(this\.)|(this\[)/,'').replace(/\s?=/,'').replace(/\'\]/,'').replace("'",'').replace(/\.split/,'').replace(/\.splice/,'');
            if (this.watchers){
              for (var watcher in this.watchers[changed]){
                this.watchers[changed][watcher]();
              }
            }

            var links =  this.getPlaceholders('{{'+changed+'}}');
            for (var link in links){
              if (links[link].originalFields['{{'+changed+'}}'] != this[changed]){
                links[link].textContent = links[link].originalText;
                links[link].originalFields['{{'+changed+'}}'] = this[changed];
                links[link].textContent = x.core.render(links[link],links[link].originalFields);
              }
            }
            i++;
          }
        }
      },


      /**
       * [appendModel description]
       * @param  {[type]} model
       * @return {[type]}
       */
       appendModel : function(model){
        this[model.getModelName()] = model; 
      }
    };
    
  }else{
    /**
     * Controller DO NOT exists
     */
     if (x.controllers[arguments[0]] === undefined){
      /**
       * Created the contoller
       */
       x.controllers[arguments[0]] = new x.Controller(arguments[0],'API_CALL');
     }

    var controller = x.controllers[arguments[0]];
    var dependencies = x.core.checkDependencies(arguments[1]);



    if (typeof arguments[1] === 'object'){
        arguments[1][arguments[1].length-1].apply(controller,dependencies);
     }else{
        arguments[1].apply(controller,dependencies); 
     }
     
     return x.controllers[arguments[0]];
   }
 };

})(this.x);

//File : src/controller.js

(function(x){
  'use strict';
/**
 * [Model description]
 * @param {[type]} controller
 * @param {[type]} htmlElement
 */
 x.Model = function(controller,htmlElement){
  var self = this;
  var data = {};
  var modelName = htmlElement.getAttribute('x-model');

  var htmlElements = [htmlElement];


  /**
    * [getInputs description]
    * @return {[type]}
    */
    var getInputs = function(){
      var elements = htmlElement.getElementsByTagName('input');
      var temp = {};
      for(var element in elements){
        if (typeof elements[element]  == 'object'){
          var field = elements[element].getAttribute('name');
          temp[field] = elements[element].value;
          elements[element].addEventListener('keypress',inputChange);
          elements[element].addEventListener('change',inputChange);
        }
      }
      return absorveData(data,temp);
    };



  /**
   * [inputChange description]
   * @param  {[type]} e
   * @return {[type]}
   */
   var inputChange = function(e){
    var el = e.target;
    var name = el.getAttribute('name');
    var value = el.value;
    data[name] =  value;
    broadcast(data);
  };


  /**
   * [absorveData description]
   * @param  {[type]} data
   * @param  {[type]} newData
   * @return {[type]}
   */
   var absorveData = function(data,newData){
    for(var field in newData){
      data[field] = newData[field];
    }
    return data;
  };


  /**
   * [broadcast description]
   * @param  {[type]} data
   * @return {[type]}
   */
   var broadcast = function(data){
    for(var propertie in data){
      applyValues(propertie,data[propertie]);
    }
  };


  /**
   * [applyValues description]
   * @param  {[type]} propertie
   * @param  {[type]} value
   * @return {[type]}
   */
   var applyValues = function(propertie,value){
    htmlElements.forEach(function(element){
      element.querySelectorAll('[name="'+propertie+'"]').forEach(function(a,b){
        a.value = value;
      });
    });
  };


  /**
   * [structByDom description]
   * @return {[type]}
   */
   var structByDom = function(){
    absorveData(getInputs(),data);
    return Model;
  };


  structByDom();

  var Model = this;
  return {

    /**
     * [appendDom description]
     * @param  {[type]} element
     * @return {[type]}
     */
     appendDom : function(element){
      htmlElements.push(element);
    },

    /**
     * [getModelName description]
     * @return {[type]}
     */
     getModelName : function(){
      return modelName;
    },

    /**
     * [getData description]
     * @return {[type]}
     */
     getData : function(){
      var result = {};
      result[modelName] = data;
      return result;
    },

    /**
     * [edit description]
     * @param  {[type]} record
     * @return {[type]}
     */
     edit : function(record){
      broadcast(record);
      return record;
    }
  };
};

})(this.x);
//File : src/controller.js

(function(x){
  'use strict';
  /**
   * [Service description]
   */
  x.Service = function(){
  		/**
  		 * Creating the service
  		 */
      

    var dependencies = x.core.checkDependencies(arguments[1]);
    if (typeof arguments[1] === 'object'){
        x.services[arguments[0]] = new arguments[1][arguments[1].length-1](dependencies);
     }else{
        x.services[arguments[0]] = new arguments[1](dependencies); 
     }
  };

})(this.x);
//File : src/methods/x.init.js
(function(x,world){
	'use strict';

	/**
	 * Check and load Controller dependencies
	 * @return {[type]}
	 */
	x.methods.init = function(){
		return x.core.parse();
	};
	document.addEventListener('DOMContentLoaded', x.methods.init, false);
})(this.x,this);
