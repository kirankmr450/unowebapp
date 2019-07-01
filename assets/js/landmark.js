

// $(function() {
// $( "#save_landmark" ).on("click", function(){

$(document).on('click','#save_landmark',function(){


var landmarkname = $("#landmark_name").val();
var landmark_name=document.getElementById("landmark_name");
var latitude = $("#landmark_lat").val();
var latitude_code=document.getElementById("landmark_lat");
var pat1= /^-?([0-8]?[0-9]|90)\.[0-9]{1,7}$/;
var longitude = $("#landmark_log").val();
var longitude_code=document.getElementById("landmark_log");
var pat2= /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,7}$/;
var distancename = $("#Distance_from").val();
var distance_name=document.getElementById("Distance_from");
var pat3= /^[0-9]+$/;

if(1==1){


			if (landmarkname == "") {
			$("#land_Mark").html("Landmark Name must be filled out");
			}
			else
			{
			$("#land_Mark").html("");
			}
			
			
			if(latitude == "") {
			$("#latitude-code").html("Latitude number must be filled");
			}else if(!pat1.test(latitude_code.value))
			{
			$("#latitude-code").html("Latitude number should be xx.xxxxxxx");
			}else
			{
			$("#latitude-code").html("");
			}
			
			
			if(longitude == "") {
			$("#longitude-code").html("Longitude number must be filled");
			}else if(!pat2.test(longitude_code.value))
			{
			$("#longitude-code").html("Longitude number should be xx.xxxxxxx");
			}else
			{
			$("#longitude-code").html("");
			}
			
			
			
			if (distancename == "") {
			$("#distance_Metre").html("Distance must be filled out");
			}else if(!pat3.test(distance_name.value))
			{
			$("#distance_Metre").html("Numeric characters only");
			}else
			{
			$("#distance_Metre").html("");
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
		
		
		    if (landmarkname == "") {
			return false;
			}
		
			
			
			if(latitude == "") {
			return false;
			}else if(!pat1.test(latitude_code.value))
			{
			return false;
			}
			
			
			if(longitude == "") {
			return false;
			}else if(!pat2.test(longitude_code.value))
			{
			return false;
			}
			
			
			
			if (distancename == "") {
			return false;
			}else if(!pat3.test(distance_name.value))
			{
			return false;
			}
			
		
		
		

		var Data =	{
		"locationtype":  $("#landmark_type").val(),
		"name": $("#landmark_name").val(),
		"location": {
		"latitude": $("#landmark_lat").val(),
		"longitude": $("#landmark_log").val()
		},
		"distanceinmeters":  $("#Distance_from").val()

		}

		$.ajax({
		type: 'POST',
		url: 'http://192.168.1.211:3000/facility/nearby/' + buildingidvalue,
		data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),
		success: function(result) {
		alert(landmarkname + '- Added');
		var showid = result.nearby; 

		for (var i in showid) {
		if ( landmarkname == showid[i].name){

		var landmarkid = showid[i]._id;
		console.log(landmarkid);



		}}
		// if (history.pushState) {
		// var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?building_id=' + buildingidvalue + "&currentlandmark=" + landmarkid;
		// window.history.pushState({path:newurl},'',newurl);
		// }

		window.location.href = "http://localhost/unoroom-admin/add-building-landmark.html?building_id=" + buildingidvalue;



		},
		contentType: "application/json",
		dataType: 'json'

		});















		});
		});
		// });

		// $("#edit_Landmark" ).on("click", function(){
		$(document).on('click','#edit_Landmark',function(){


		$("#Update_landMark").show();
		$("#save_landmark").css('display','none');

		$('#landmark_type').prop("disabled", false);
		$('#landmark_name').prop("disabled", false);
		$('#landmark_lat').prop("disabled", false);
		$('#landmark_log').prop("disabled", false);
		$('#Distance_from').prop("disabled", false);


		});



		// $( "#Update_landMark" ).on("click", function(){
		$(document).on('click','#Update_landMark',function(){

var landMarkName = $("#landmark_name").val();
var landmark_name=document.getElementById("landmark_name");
var latitude = $("#landmark_lat").val();
var latitude_code=document.getElementById("landmark_lat");
var pat1= /^-?([0-8]?[0-9]|90)\.[0-9]{1,7}$/;
var longitude = $("#landmark_log").val();
var longitude_code=document.getElementById("landmark_log");
var pat2= /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,7}$/;
var distancename = $("#Distance_from").val();
var distance_name=document.getElementById("Distance_from");
var pat3= /^[0-9]+$/;

if(1==1){


			if (landMarkName == "") {
			$("#land_Mark").html("Landmark Name must be filled out");
			}
			else
			{
			$("#land_Mark").html("");
			}
			
			
			if(latitude == "") {
			$("#latitude-code").html("Latitude number must be filled");
			}else if(!pat1.test(latitude_code.value))
			{
			$("#latitude-code").html("Latitude number should be xx.xxxxxxx");
			}else
			{
			$("#latitude-code").html("");
			}
			
			
			if(longitude == "") {
			$("#longitude-code").html("Longitude number must be filled");
			}else if(!pat2.test(longitude_code.value))
			{
			$("#longitude-code").html("Longitude number should be xx.xxxxxxx");
			}else
			{
			$("#longitude-code").html("");
			}
			
			
			
			if (distancename == "") {
			$("#distance_Metre").html("Distance must be filled out");
			}else if(!pat3.test(distance_name.value))
			{
			$("#distance_Metre").html("Numeric characters only");
			}else
			{
			$("#distance_Metre").html("");
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
				var landmarkname =  GetURLParameter('currentlandmark');

				console.log(buildingidvalue,landmarkname);

			if (landMarkName == "") {
			return false;
			}
		
			
			
			if(latitude == "") {
			return false;
			}else if(!pat1.test(latitude_code.value))
			{
			return false;
			}
			
			
			if(longitude == "") {
			return false;
			}else if(!pat2.test(longitude_code.value))
			{
			return false;
			}
			
			
			
			if (distancename == "") {
			return false;
			}else if(!pat3.test(distance_name.value))
			{
			return false;
			}





				var Data =	{
				"locationtype":  $("#landmark_type").val(),
				"name": $("#landmark_name").val(),
				"location": {
				"latitude": $("#landmark_lat").val(),
				"longitude": $("#landmark_log").val()
				},
				"distanceinmeters":  $("#Distance_from").val()

				}




				$.ajax({
				type: 'PUT',
				url: 'http://192.168.1.211:3000/facility/nearby/' + buildingidvalue + "/" + landmarkname,
				data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),
				success: function(data) {
				alert(landMarkName + ' - Landmark Updated Successfully');
				location.reload();
				},
				contentType: "application/json",
				dataType: 'json'

				});

				// $("#landmark_type").attr('disabled','disabled');
				// $("#landmark_name").attr('disabled','disabled');
				// $("#landmark_lat").attr('disabled','disabled');
				// $("#landmark_log").attr('disabled','disabled');
				// $("#Distance_from").attr('disabled','disabled');

				// $("#Update_landMark").css('display','none');

				});
				});



				// $( "#Delete_landmark" ).on("click", function(){
				$(document).on('click','#Delete_landmark',function(){

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
						var landmarkid =  GetURLParameter('currentlandmark');
						var landmarkname = $("#landmark_name").val();

						console.log(buildingidvalue,landmarkname);

						var data="Are you sure to delete this Landmark?"+"\n"+landmarkname; 
						if(confirm(data)){

						$.ajax({
						type: "DELETE",
						url: 'http://192.168.1.211:3000/facility/nearby/' + buildingidvalue + "/" + landmarkid,
						data: {_method: 'delete'},
						success: function (data) {
						alert(landmark_name + ' - Landmark Deleted');

						if (history.pushState) {
						var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?building_id=' + buildingidvalue + "&currentlandmark=" + landmarkid;
						window.history.pushState({path:newurl},'',newurl);
						}

						$('#div1-wrapper').load(newurl + ' #div1');


						$.getJSON("http://192.168.1.211:3000/meta/locationtype", function(result){
						$.each(result, function(){

						var landmatk = '';

						var landmarkplace = result.length;
						for(i=0;i<=landmarkplace-1;i++){

								landmatk +='<option value="'+ result[i] +'">'+ result[i].replace(/([A-Z])/g, ' $1').trim() +'</option>';


								};

								$("#landmark_type").html(landmatk);




								});
								});



								},
								error: function (data) {
								console.log('Error:', data);
								}

								});
								}

								});
								});


								$(document).on('click','#go_to_amenities',function(){
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
										window.location.href = "http://localhost/unoroom-admin/add-building-amenities.html?building_id=" + buildingidvalue;


										});
										
										});














										