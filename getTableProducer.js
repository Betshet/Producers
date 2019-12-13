


$(document).ready( function () {
	
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/getTable?p1=producer',

		success: function (res) {
			var dataSet = []
			console.log(res.table);
			var producers = JSON.parse(res.table);
			dataSet.push(Object.values(producers[0]));
			console.log(dataSet);
			

			$('#tableProducers').DataTable({
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

