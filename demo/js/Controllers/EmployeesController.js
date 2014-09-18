x.Controller('EmployeesController',function(MessagesService,xHttp){
	console.log(MessagesService)

	xHttp
	var i=0
	while(i<1000){
		this['x'+i] = i+'z'
		i++
	}

	xHttp.get('http://localhost:5554/demo/data.json',function(x){
		console.log(x);
	})

	this.alert = function(){
		this.x1 = 'zz';
	}

});
