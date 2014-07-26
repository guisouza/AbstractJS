//File : src/core/x.js

(function(world){
  'use strict';
  NodeList.prototype.forEach = Array.prototype.forEach;
  world.x = function(){ 

    return {
      methods : {

      },
      controllers : {

      },
      core : {
        randomString : function(){
          return 'randomString';
        },
        parsers : {

        }
      }
    };
  }();
})(this);
//File : src/core/coreMethods/x.core.addController.js

(function(x){
	'use strict';

	x.core.addController = function(controllerName,htmlElement){

		if (x.controllers[controllerName] === undefined){
			x.controllers[controllerName] = new x.Controller(controllerName,htmlElement);
		}
		return x.controllers[controllerName];
	};

})(this.x);
//File : src/core/coreMethods/x.core.addParser.js

(function(x){
	'use strict';

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
	x.core.ajax = function(url,callback){

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
		             } // end for
		        }
		         
		        xhr.onreadystatechange = ensureReadiness;
		         
		        function ensureReadiness() {
		            if(xhr.readyState < 4) {
		                return;
		            }
		             
		            if(xhr.status !== 200) {
		                return;
		            }
		 
		            // all is well  
		            if(xhr.readyState === 4) {
		                callback(JSON.parse(xhr.response));
		            }           
		        }
		         
		        xhr.open('GET', url, true);
		        xhr.send('');

	};


})(this.x);
//File : src/core/coreMethods/x.core.parse.js

(function(x){

  'use strict';
  x.core.parse = function(){

    if(typeof arguments[0] == 'string'){
      applyParserGroup(arguments[0],arguments[1],arguments[2]);
    }else{
      var controllerElements = document.querySelectorAll('[x-controller]');
      controllerElements.forEach(function(element,index){
        var controller = x.core.parsers['x-controller'](element);
        for(var parser in x.core.parsers){
          if (typeof x.core.parsers[parser] == 'function'){
            applyParser(parser,x.core.parsers[parser],element,controller);
          }else{
            console.log(parser);
            console.log(element);
            console.log(controller);
            applyParserGroup(parser,element,controller);
          }
        }
      });
    }

    function applyParserGroup(parserGroup,element,controller){
      console.log(x.core.parsers[parserGroup]);
      for (var parser in x.core.parsers[parserGroup]){
        applyParser(parser,x.core.parsers[parserGroup][parser],element,controller);
      }
    }

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

//File : src/core/parsers/x-ajax.js

(function(x){
	'use strict';
	x.core.addParser('x-ajax',function(element,controller){
		var URL = element.getAttribute('x-ajax');

		if (element.tagName.toUpperCase() == 'FORM'){

			var name = element.getAttribute('x-model');

			if (!controller[name]){
				controller.appendModel(new x.Model(controller,element));

			}else{
				controller[name].appendDom(element);
			}

			element.addEventListener('submit', function(e) {
				e.preventDefault();
			});

		}else{

		}

	});
})(this.x);
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

		x.core.ajax(URL,function(e){

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
		});
		
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
//File : src/core/parsers/x-controller.js

(function(x){
	'use strict';
	x.core.addParser('x-controller',function(element){

		var controller = element.getAttribute('x-controller');
		return x.core.addController(controller,element);

	});
})(this.x);
//File : src/core/parsers/x-events.js

(function(x){
  'use strict';

  x.core.addParser('events.x-click',function(element,controller){

    var action = element.getAttribute('x-click');
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
      element.addEventListener('click',function(){
        console.log(controller);
        controller[action].apply(controller,params);
      });

    });

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
        console.log(controller);
        controller[action].apply(controller,params);
      });

  });


})(this.x);
//File : src/controller.js

(function(x){
  'use strict';

  x.xModel = function(){
    console.log(arguments);

  };

})(this.x);
//File : src/controller.js

(function(x){
  'use strict';

  x.Controller = function(controllerName,htmlElement){

    //Check if this controller is being generated by DOM or API
    if (arguments[1].tagName || arguments[1] == 'API_CALL'){

      this.htmlElement = htmlElement;
      this.controllerName = controllerName;

      return {
        appendModel : function(model){
          this[model.getModelName()] = model; 
        }
      };
      
    }else{

      if (x.controllers[controllerName] === undefined){
        //Controller dont exists
        x.controllers[controllerName] = new x.Controller(controllerName,'API_CALL');
      }
      arguments[1][arguments[1].length-1].call(x.controllers[controllerName]);
      return x.controllers[controllerName];
    }
  };

})(this.x);
//File : src/controller.js

(function(x){
  'use strict';

  x.Model = function(controller,htmlElement){
    var self = this;
    var data = {};
    var modelName = htmlElement.getAttribute('x-model');

    var htmlElements = [htmlElement];

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

    var inputChange = function(e){
      var el = e.target;
      var name = el.getAttribute('name');
      var value = el.value;
      data[name] =  value;
      broadcast(data);
    };

    var absorveData = function(data,newData){
      for(var field in newData){
        data[field] = newData[field];
      }
      return data;
    };

    var broadcast = function(data){
      for(var propertie in data){
        applyValues(propertie,data[propertie]);
      }
    };

    var applyValues = function(propertie,value){

      htmlElements.forEach(function(element){
        element.querySelectorAll('[name="'+propertie+'"]').forEach(function(a,b){
          a.value = value;
        });
      });

    };

    var  structByDom = function(){
      absorveData(getInputs(),data);
      return Model;
    };

    var editData = function(record){
      broadcast(record);
      return record;
    };

    structByDom();

    var Model = this;
    return {
      appendDom : function(element){
        htmlElements.push(element);
      },
      getModelName : function(){
        return modelName;
      },
      getData : function(){
        var result = {};
        result[modelName] = data;
        return result;
      },
      edit : function(record){
        return editData(record);
      }
    };
  };

})(this.x);
//File : src/methods/x.init.js

(function(x,world){
	'use strict';
	x.methods.init = function(){
		x.core.parse();
	};
	document.addEventListener('DOMContentLoaded', x.methods.init, false);
})(this.x,this);