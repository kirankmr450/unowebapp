$(document).on('click','#save_room',function(){
// <!--ROOOM NAME VALIDATION OPEN-->
var roomname = $("#room_name").val();
var room_name=document.getElementById("room_name");
var roomsize = $("#room_size").val();
var room_size=document.getElementById("room_size");
var pat1= /^[0-9]{3,4}$/;
var roomprice = $("#room_price").val();
var room_price=document.getElementById("room_price");
var pat2= /^[0-9]+$/;
var roomcount = $("#room_count").val();
var room_count=document.getElementById("room_count");
var pat3= /^[0-9]{1,2}$/;
if(1==1){
				if (roomname == "") {
				$("#room_name_val").html("Room Name must be filled out");
				
				
				}
				else
				{
				$("#room_name_val").html("");
				}
	
				if(roomsize == "") {
				$("#room_size_val").html("Room Size must be filled");
				
				
				}else if(!pat1.test(room_size.value))
				{
				$("#room_size_val").html("Room Size should be 3-4 digits");
				
				
				}else
				{
				$("#room_size_val").html("");
				}
				if(roomprice == "") {
				$("#room_price_val").html("Room Price must be filled");
				
				
				}else if(!pat2.test(room_price.value))
				{
				$("#room_price_val").html("Numeric characters only");
				
				
				}else
				{
				$("#room_price_val").html("");
				}
	
				if (roomcount == "") {
				$("#room_count_val").html("Room Count must be filled out");
				
				return false;
				}else if(!pat3.test(room_count.value))
				{
				$("#room_count_val").html("Room Count should be 1-2 digits");
				
				return false;
				}else
				{
				$("#room_count_val").html("");
				}
	
}
$(function GetURLParameter(sParam)
{
var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
for (var i = 0; i < sURLVariables.length; i++)
		{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
		return sParameterName[1];
		}
		}
		var buildingidvalue= GetURLParameter('building_id');
		console.log(buildingidvalue);
		
				if (roomname == "") {
				return false;
				}
				if(roomsize == "") {
				return false;
				}else if(!pat1.test(room_size.value))
				{
				return false;
				}
				if(roomprice == "") {
				return false;
				}else if(!pat2.test(room_price.value))
				{
				return false;
				}
				if (roomcount == "") {
			    return false;
				}else if(!pat3.test(room_count.value))
				{
				return false;
				}
		
		var Data =	{
		"name": $("#room_name").val(),
		"type":  $("#room_type").val(),
		"size":  $("#room_size").val(),
		"price":  $("#room_price").val(),
		"count":  $("#room_count").val(),
		"amenities": []
		}
		$.ajax({
		type: 'POST',
		url: 'http://192.168.1.211:3000/facility/room/' + buildingidvalue,
		data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),
		success: function(result) {
		alert(roomname + '- Added');
		// if (history.pushState) {
		// var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?building_id=' + buildingidvalue + "&currentlandmark=" + landmarkid;
		// window.history.pushState({path:newurl},'',newurl);
		// }
		window.location.href = "http://localhost/unoroom-admin/add-building-rooms-apartment.html?building_id=" + buildingidvalue;
		},
		contentType: "application/json",
		dataType: 'json'
		});
		});
		});
		// });
		$(document).on('click','#edit_room',function(){
		$("#Update_room").show();
		$("#save_room").css('display','none');
		$('#room_type').prop("disabled", false);
		$('#room_name').prop("disabled", false);
		$('#room_size').prop("disabled", false);
		$('#room_price').prop("disabled", false);
		$('#room_count').prop("disabled", false);
		});
		// $( "#Update_landMark" ).on("click", function(){
		$(document).on('click','#Update_room',function(){
// <!--ROOOM NAME VALIDATION OPEN-->
var roomname = $("#room_name").val();
var room_name=document.getElementById("room_name");
var roomsize = $("#room_size").val();
var room_size=document.getElementById("room_size");
var pat1= /^[0-9]{3,4}$/;
var roomprice = $("#room_price").val();
var room_price=document.getElementById("room_price");
var pat2= /^[0-9]+$/;
var roomcount = $("#room_count").val();
var room_count=document.getElementById("room_count");
var pat3= /^[0-9]{1,2}$/;
if(1==1){
                
				if (roomname == "") {
				$("#room_name_val").html("Room Name must be filled out");
				
				
				}
				else
				{
				$("#room_name_val").html("");
				}
				
	
				if(roomsize == "") {
				$("#room_size_val").html("Room Size must be filled");
				
				
				}else if(!pat1.test(room_size.value))
				{
				$("#room_size_val").html("Room Size should be 3-4 digits");
				
				
				}else
				{
				$("#room_size_val").html("");
				}
				if(roomprice == "") {
				$("#room_price_val").html("Room Price must be filled");
				
			
				}else if(!pat2.test(room_price.value))
				{
				$("#room_price_val").html("Numeric characters only");
				
				
				}else
				{
				$("#room_price_val").html("");
				}
	
				if (roomcount == "") {
				$("#room_count_val").html("Room Count must be filled out");
				
				
				}else if(!pat3.test(room_count.value))
				{
				$("#room_count_val").html("Room Count should be 1-2 digits");
				
				
				}else
				{
				$("#room_count_val").html("");
				}
	
}
	
		$(function GetURLParameter(sParam)
		{
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++)
				{
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sParam)
				{
				return sParameterName[1];
				}
				}
				var buildingidvalue= GetURLParameter('building_id');
				var Current_room =  GetURLParameter('currentroom');
				console.log(buildingidvalue,Current_room);
				
				if (roomname == "") {
				return false;
				}
				
	
				if(roomsize == "") {
				return false;
				}else if(!pat1.test(room_size.value))
{
				return false;
				}
				if(roomprice == "") {
				return false;
				}else if(!pat2.test(room_price.value))
				{
				return false;
				}
				if (roomcount == "") {
			    return false;
				}else if(!pat3.test(room_count.value))
				{
				return false;
				}
	
				var Data =	{
				"name": $("#room_name").val(),
				"type":  $("#room_type").val(),
				"size":  $("#room_size").val(),
				"price":  $("#room_price").val(),
				"count":  $("#room_count").val(),
				"amenities": []
				}
				$.ajax({
				type: 'PUT',
				url: 'http://192.168.1.211:3000/facility/room/' + buildingidvalue + "/" + Current_room,
				data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),
				success: function(data) {
				alert(roomname + ' - Room Updated Successfully');
				location.reload();
				},
				contentType: "application/json",
				dataType: 'json'
				});
				});
				});
				