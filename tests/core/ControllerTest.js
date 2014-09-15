describe('Testing X Controller', function () {
	it('JSAPI - should create the controller', function() {

		var c = x.Controller('TestController',[function(){
			this.teste = function(a){
				return a
			}
		}])

		expect(c.teste('2')).toEqual('2');

	});


	it('DOM - should create the controller', function() {

		x.controllers = {};

		var div = document.createElement('div');
		div.setAttribute("x-controller","TestController");
		document.body.appendChild(div);

		x.core.parse()
		expect(x.controllers.TestController).not.toBeUndefined();

	});


	it('DOM after JSAPI - should create the controller', function() {

		x.controllers = {};


		var c = x.Controller('TestController',[function(){
			this.teste = function(a){
				return a
			}
		}])


		var div = document.createElement('div');
		div.setAttribute("x-controller","TestController");
		document.body.appendChild(div);
		x.core.parse()

		expect(c.teste('2')).toEqual('2');
		expect(x.controllers.TestController).not.toBeUndefined();

	});


	it('JSAPI after DOM - should create the controller', function() {

		x.controllers = {};

		var div = document.createElement('div');
		div.setAttribute("x-controller","TestController");
		document.body.appendChild(div);
		x.core.parse()

		var c = x.Controller('TestController',[function(){
			this.teste = function(a){
				return a
			}
		}])

		expect(c.teste('2')).toEqual('2');
		expect(x.controllers.TestController).not.toBeUndefined();

	});


});