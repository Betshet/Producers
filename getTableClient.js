


$(document).ready( function () {
	
	
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/getClients',

		success: function (res) {
			var dataSet = []
			var clients = JSON.parse(res.clients);
			dataSet.push(Object.values(clients[0]));
			console.log(dataSet);
			

			$('#tableClients').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"Name"},
					{title:"Surname"},
					{title:"Email"},
					{title:"Phone"}
				]	
			});	
			
		},
		error: function (request, status, error) {
			alert(error);
		}		
	});

});

