describe('Testing X Model', function () {

	it('DOM - should create the controller and the model inside it', function() {

		x.controllers = {};

		var div = document.createElement('div');
		div.setAttribute("x-controller","TestController");
		var form = document.createElement('form');
		form.setAttribute('x-model','myModel');
		form.setAttribute('x-ajax','#');
		var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('name','name');
		form.appendChild(input);
		div.appendChild(form);
		document.body.appendChild(div);

		x.core.parse()

		expect(x.controllers.TestController).not.toBeUndefined();
		expect(x.controllers.TestController.myModel).not.toBeUndefined();

	});

})