x.Controller('EmployeesController',['MessagesService',function(MessagesService){

	this.edit = function(param){
		record = this.allEmployees[param]
		this.employee.edit(record);
	}


	this.alert = function(message){

		this.teste1 = this.employee;
		this.teste2 = 'alterei2';
	}

	x.core.ajax({
		url:'data.json',
		callback:function(){
			console.log('data Loaded');
		}
	})

	this.teste1 = new Date();
	this.teste2 = 'nome2';

}]);
