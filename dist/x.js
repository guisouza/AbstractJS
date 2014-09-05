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
      services : {

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

		x.core.mapper.map(htmlElement,x.controllers[controllerName]);


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
		                callback(xhr.response);
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
//File : src/core/coreMethods/x.core.bind.js

(function(x){
	'use strict';

	x.core.bind = function(parserName,parser){

	};


	x.core.bindField = function(){

	};


})(this.x);
//File : src/core/coreMethods/x.core.checkDependencies.js

(function(x){

  'use strict';
  x.core.checkDependencies = function(data){
  	var rDependencies = [];
  	for(var dependencie in data){
  		if (dependencie < data.length-1){

  			if (x.services[data[dependencie]]){

  				rDependencies[dependencie] = x.services[data[dependencie]];
  			}else{
  				throw('Dependencie Not Fount =[');
  			}
  		}
  	}

  	return rDependencies;

  };
})(this.x);

//File : src/core/coreMethods/x.core.extractField.js

(function(x){
	'use strict';
	x.core.extractField = function(stringField,object){
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
            applyParserGroup(parser,element,controller);
          }
        }
      });
    }

    function applyParserGroup(parserGroup,element,controller){
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

//File : src/core/coreMethod/x.core.render.js

(function(x){

	'use strict';
	x.core.render = function(obj,fields){
		var text = obj.originalText;
		for (var field in fields){
			text = text.replace(new RegExp(field,'g'),fields[field]);
		}
		return text;
	};

})(this.x);

//File : src/core/coreMethods/x.core.serialize.js

(function(x){
	'use strict';
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
        controller.xApply(controller[action],params);
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
        controller[action].apply(controller,params);
      });

  });


})(this.x);

//File : src/controller.js

(function(x){
  'use strict';

  x.Collection = function(){};

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
        xApply : function(action,params){

          action.apply(this,params);

          var changes = action.toString().match(/this..+?\s*=/g);

          if (changes !== null){
            changes.forEach(function(changed,repI){
              changed = changed.replace(/(\s?=)|(this\.)|(this\[)/,'').replace(/\s?=/,'').replace(/\'\]/,'').replace("'",'');

              var links =  this.placeholders['{{'+changed+'}}'];

              for (var link in links){
                if (links[link].originalFields['{{'+changed+'}}'] != this[changed]){
                  links[link].textContent = links[link].originalText;
                  links[link].originalFields['{{'+changed+'}}'] = this[changed];
                  links[link].textContent = x.core.render(links[link],links[link].originalFields);
                }
              }
            }.bind(this));
          }
        },
        appendModel : function(model){
          this[model.getModelName()] = model; 
        }
      };
      
    }else{

      if (x.controllers[controllerName] === undefined){
        //Controller DO NOT exists
        x.controllers[controllerName] = new x.Controller(controllerName,'API_CALL');
      }


      arguments[1][arguments[1].length-1].apply(x.controllers[controllerName],x.core.checkDependencies(arguments[1]));
      // arguments[1][arguments[1].length-1].call(x.controllers[controllerName]);
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

    var structByDom = function(){
      absorveData(getInputs(),data);
      return Model;
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
        broadcast(record);
        return record;
      }
    };
  };

})(this.x);
//File : src/controller.js

(function(x){
  'use strict';

  x.Service = function(){

		x.services[arguments[0]] = new arguments[1][arguments[1].length-1]();
  };

})(this.x);
//File : src/core/coreMethods/x.core.extractField.js

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
        if (!Controller.placeholders[placeholders[field]]){
          Controller.placeholders[placeholders[field]] = [];
        }
        Controller.placeholders[placeholders[field]].push(obj);
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
      if (!Controller.placeholders){
        Controller.placeholders = [];
      }
        if(htmlElement.getAttribute && htmlElement.getAttribute('x-content') === null){
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
//File : src/methods/x.init.js

(function(x,world){
	'use strict';
	x.methods.init = function(){
		x.core.parse();
	};
	document.addEventListener('DOMContentLoaded', x.methods.init, false);
})(this.x,this);