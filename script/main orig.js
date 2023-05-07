$(document).ready(function() {
	
	$("#message").empty(); // Clear previous message.
	$("#errorMessage").empty(); // Clear previous message.

    $("#getAllButton").click(function() {
		clearAllFields();
		getAll();
    });

});

arrayLength = 0;

function getAll() { // Retreive all records from the Db.
    //console.log("getAll ran");

	var url = "https://prod-19.centralus.logic.azure.com:443/workflows/43e262d25cf34e449aed689a079d691e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=h6zntI6VpWCys5vYrLw5j1LGGZY-kBhO7vk3xbjrKdk";

	$.ajax({
		type: "GET",
		url: url,
		//data: data,
		headers: { "Content-Type": "application/json" },
		dataType: 'json',
		success: function (data, status) {
			//alert("Record found. data = " + data + ", status = " + status);
//			var dataArray = data[1]; // Get the array of items from the JSON.
//			arrayLength = dataArray.length;
//			dataArray.forEach(getItems); // Iterate over the array by running 'getItems' function as a loop.
			
			data.forEach(getItems); // Iterate over the array by running 'getItems' function as a loop.

			if( !$.isArray(data) ||  !data.length ) {
				$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
			}
		},
		error: function (data, status) {
			$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
			//alert("Record not found. Failed. data = " + data + ", status = " + status);        
		}	  
	});
}

function getItems(item) { // 'item' is each array item (object) sent in from the 'dataArray.forEach' function.
	$("#resultAreaLabels").append("<div id=\"resultLabelsGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

	$("#resultLabelsGroup").append("<label id=\"resultLabelCustomerId\" style=\"float:right;\">\"Crypto Id:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelFirstName\" style=\"float:right;\">\"Db Id:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelLastName\" style=\"float:right;\">\"Name:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelAge\" style=\"float:right;\">\"Price:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelGender\" style=\"float:right;\">\"Timestamp:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<div id=\"resultLabelSeperator\" style=\"clear:both; height:20px;\"></div>");

	$("#resultAreaData").append("<div id=\"resultDataGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

//	if(arrayLength == 1) {
//		$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + item.crypto_id + "</label><img id=\"deleteCustomerRecord\" src=\"img/deleteIcon.png\" style=\"float:left; margin-left:40px;\" width=\"20\" height=\"20\"><div style=\"clear:both; height:0px;\"></div>");
//	} else {
	$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + item.crypto_id + "</label><div style=\"clear:both; height:5px;\"></div>");
//	}
	$("#resultDataGroup").append("<label id=\"resultDataFirstName\" style=\"float:left;\">" + item.id + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataLastName\" style=\"float:left;\">" + item.name + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataAge\" style=\"float:left;\">" + item.price + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataGender\" style=\"float:left;\">" + item.timestamp + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<div id=\"resultDataSeperator\" style=\"clear:both; height:20px;\"></div>");

}
	

function clearAllFields() { // Clear previous data fields.
	$("#resultLabelsGroup").remove();
	$("#resultDataGroup").remove();
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
