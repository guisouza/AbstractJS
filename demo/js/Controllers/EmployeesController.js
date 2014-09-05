x.Controller('EmployeesController',['MessagesService',function(MessagesService){

	this.edit = function(param){
		record = this.allEmployees[param]
		this.employee.edit(record);
	}

	this.testeee = 1;

	this.alert = function(message){

		this.teste1 = function(){return this.testeee++}.bind(this);
		this.teste2 = 'alterei2';
		this.employees = this.employees.splice(1,1);
	}

	this.employees = [

				{
					"id":"0",
					"name" : "John",
					"age": "21",
					"company" : {
						"name": "Google",
						"area" : {
							"name" : "Technology"
						}
					}
				},

				{
					"id":"1",
					"name" : "Mark",
					"age": "22",
					"company" : {
						"name": "Facebook",
						"area" : {
							"name" : "Technology"
						}
					}
				},

				{
					"id":"2",
					"name" : "Garry",
					"age": "23",
					"company" : {
						"name": "Instagram",
						"area" : {
							"name" : "Technology"
						}
					}
				},

				{
					"id":"3",
					"name" : "Silverster Stalone",
					"age": "24",
					"company" : {
						"name": "Picasa",
						"area" : {
							"name" : "Technology"
						}
					}
				}]


	x.core.ajax({
		url:'data.json',
		callback:function(){
			console.log('data Loaded');
		}
	})

	this.teste1 = new Date();
	this.teste2 = 'nome2';

}]);
