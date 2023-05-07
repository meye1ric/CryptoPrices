$(document).ready(function() {
	
	$("#message").empty(); // Clear previous message.
	$("#errorMessage").empty(); // Clear previous message.

    $("#getAllButton").click(function() {
		clearAllFields();
		getAll();
    });

});

arrayLength = 0;

beginTable = "<table id=\"resultTable\" class=\"hover\">";
endTable = "</table>";
beginTableHead = "<thead>";
endTableHead = "</thead>";
beginHeading = "<th>";
endHeading = "</th>";
beginBody = "<tbody>";
endBody = "</tbody>";
beginRow = "<tr>";
endRow = "</tr>";
beginData = "<td>";
beginDataWide = "<td width=50>";
beginDataTdHyperlink = "<td class=\"tdHyperlink\">";
endData = "</td>";


function getAll() { // Retreive all records from the Db.
    // console.log("getAll ran");
   
	result = beginTable + beginTableHead + beginRow + beginHeading + "Name" + endHeading + beginHeading + "Price" + endHeading + beginHeading + "Timestamp" + endHeading + beginHeading + "Id" + endHeading + endRow + endTableHead + beginBody;

	var url = "https://prod-19.centralus.logic.azure.com:443/workflows/43e262d25cf34e449aed689a079d691e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=h6zntI6VpWCys5vYrLw5j1LGGZY-kBhO7vk3xbjrKdk";

	$.ajax({
		type: "GET",
		url: url,
		//data: data,
		headers: { "Content-Type": "application/json" },
		dataType: 'json',
		success: function (data, status) {
			//alert("Record found. data = " + data + ", status = " + status);
			//console.log("Record found. data = " + data + ", status = " + status);
			

			if( !$.isArray(data) ||  !data.length ) {
				$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
			} else {
				data.forEach(getItems); // Iterate over the array by running 'getItems' function as a loop.
				result = result + endBody + endTable;
				//console.log("final result = " + result);	
			}

			$("#subcontainer1").append("<div id=\"result\"></div>");
			$("#result").append(result);

			// Initialize the 'DataTable' Jquery add-on.
			$('#resultTable').DataTable({
				order: [[2, 'desc']],  // Initialize with the 2nd column in descending order.
				lengthMenu:            // Initialize with custom menu length dropdown.
					[20, 50, 100]
			});  

		},
		error: function (data, status) {
			$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
			//alert("Record not found. Failed. data = " + data + ", status = " + status);        
		}	  
	});
}

function getItems(item) { // 'item' is each array item (object) sent in from the 'data.forEach' function.

	result = result + beginRow + beginData + item.name + endData + beginData + item.price + endData + beginData + item.timestamp + endData + beginData + item.id + endData + endRow;
    // console.log("result = " + result);

}
	

function clearAllFields() { // Clear previous data fields.
	$("#result").remove();
//	$("#resultTable").remove();
}



// For reference only:
// Syntax to access 1st item within an array at the top layer of the JSON Object.
// $("#resultDataFirstName").html(data[1][0].firstName);
// $("#resultDataLastName").html(data[1][0].lastName);
// $("#resultDataAge").html(data[1][0].Age);
// $("#resultDataGender").html(data[1][0].Gender);

// Syntax to access 2nd item at the top layer of the JSON Object.
// $("#resultDataFirstName").html(data[1].firstName);
// $("#resultDataLastName").html(data[1].lastName);
// $("#resultDataAge").html(data[1].Age);
// $("#resultDataGender").html(data[1].Gender);
