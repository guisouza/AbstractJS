![Alt text](http://i.imgur.com/PTX3t4p.jpg "Abstrac-x")

Abstract JS
=========

Abstract JS is a client-side javascript framework that provides a clean and easy to use API to create and organize your application with Controllers, Models, Collections, Routes etc..

An Controller example

```javascript
x.Controller('EmployeesController',[function(){
	this.edit = function(param){
		record = this.allEmployees[param]
		this.employee.edit(record);
	}
}]);

```


Abstract xEngine
=========
Abstract xEngine is a parser system that gives your HTML super-powers.
Its a way to attribute actions to HTML elements and you can easily make AjaxCalls form validations or even create controllers or models just with HTML.


for example : 

```html
<table border="1">
	<thead>
		<tr>
    		<th>Name</th>
			<th>Age</th>
			<th>Company</th>
			<th>Area</th>
		</tr>
	</thead>
	<tbody x-content="js/script.js" x-model="funcionario" x-collection="allFuncionarios">
		<tr>
			<td>{{name}}</td>
			<td>{{age}}</td>
			<td>{{company.name}}</td>
			<td>{{company.area.name}}</td>
			<td><button x-click="editar({{id}})">Edit</button></td>
		</tr>
	</tbody>
</table>
```

Will automatically be parsed into this : 


```html
<table border="1" x-controller="EmployeesController">
	<thead>
		<tr>
    		<th>Name</th>
			<th>Age</th>
			<th>Company</th>
			<th>Area</th>
		</tr>
	</thead>
    <tbody x-content="js/script.js" x-model="employees" x-collection="allEmployees">
		<tr>
			<td>John</td>
			<td>21</td>
			<td>Google</td>
			<td>Technology</td>
			<td><button x-click="edit(0)">Edit</button></td>
		</tr>
		<tr>
			<td>Mark</td>
			<td>22</td>
			<td>Facebook</td>
			<td>Technology</td>
			<td><button x-click="edit(1)">Edit</button></td>
		</tr>
		<tr>
			<td>Garry</td>
			<td>23</td>
			<td>Instagram</td>
			<td>Technology</td>
			<td><button x-click="edit(2)">Edit</button></td>
		</tr>
		<tr>
			<td>Silverster Stalone</td>
			<td>24</td>
			<td>Picasa</td>
			<td>Technology</td>
			<td><button x-click="edit(3)">Edit</button></td>
		</tr>
	</tbody>
</table>
```

PS: this is a pre-alpha Version