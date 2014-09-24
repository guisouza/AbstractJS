x.Controller('EmployeesController',function(MessagesService,xHttp){

	var i=0
	while(i<10000){
		this['x'+i] = i+'z'
		i++
	}

	this.alert = function(){
		this['x1'] = 'zz';
	}

});
