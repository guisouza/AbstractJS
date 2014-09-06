x.Controller('EmployeesController',['MessagesService',function(MessagesService){

	this.edit = function(param){
    // this.x = y;
		record = this.allEmployees[param];
		this.employee.edit(record);
    this.funcionarios.splice(param,1);
    this.teste = 8;
    
	}

	this.testeee = 1;



	this.alert = function(message){
    x.core.ajax({
      url:'data1.json',
      callback:function(e){
        this.funcionarios = JSON.parse(e).data;
      }
    })

	}

	this.funcionarios = [

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


	this.teste1 = new Date();
	this.teste2 = 'nome2';

}]);
