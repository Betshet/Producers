$(document).ready( function () {
	var user = getCookie('name');
	console.log(user);
	if(user.localeCompare('admin')==0){
		var urlString = 'http://localhost:3000/getTable?p1=appointment';
	}
	else{ var urlString = 'http://localhost:3000/getRows?p1=appointment&p2=idProducer&p3='+user; }
	
	
	$.ajax({
		type: 'GET',
		url: urlString,

		success: function (res) {
			var dataSet = []
			var appointments = JSON.parse(res.rows);
			for(i in appointments){
				dataSet.push(Object.values(appointments[i]));
			}
			console.log(dataSet);
			

			$('#tableAppointment').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"hour"},
					{title:"idProducer"},
					{title:"idAddress"},
					{title:"idVehicles"}
				]	
			});	
			
		},
		error: function (request, status, error) {
			alert(error);
		}		
	});

});