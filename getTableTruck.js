


$(document).ready( function () {
	var user = getCookie('name');
	console.log(user);
	if(user.localeCompare('admin')==0){
		var urlString = 'http://localhost:3000/getTable?p1=vehicles';
	}
	else{ var urlString = 'http://localhost:3000/getRows?p1=vehicles&p2=idProducer&p3='+user; }
	
	
	$.ajax({
		type: 'GET',
		url: urlString,

		success: function (res) {
			var dataSet = []
			var trucks = JSON.parse(res.rows);
			for(i in trucks){
				dataSet.push(Object.values(trucks[i]));
			}
			console.log(dataSet);
			

			$('#tableTruck').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"Capacity"},
					{title:"isRefregitrated"},
					{title:"Producer"}
				]	
			});	
			
		},
		error: function (request, status, error) {
			alert(error);
		}		
	});

});

