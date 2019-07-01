$(function() {
$.getJSON("http://192.168.1.211:3000/facility/", function(data){

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

		// var result ='';

		for (var i in data) {
		if (( buildingidvalue == data[i]._id))

		{


		// result+= data[i].emailid;
		$("#usr").attr("value",data[i].name);
		// $("#city option").html(data[i].address.city);
		// $("#location option").html(data[i].address.locality);
		$("#address1").html(data[i].address.line1);
		$("#address2").html(data[i].address.line2);
		$("#pincode").attr("value",data[i].address.pin);
		$("#emailid").attr("value",data[i].emailid);
		$("#phone1").attr("value",data[i].phonenumber1);
		$("#phone2").attr("value",data[i].phonenumber2);
		$("#lat").attr("value",data[i].address.location.latitude);
		$("#log").attr("value",data[i].address.location.longitude);
		$("#description").html(data[i].description);
		
		console.log(data[i].name,data[i].address.city);

				} 


				}   

			

				});	
				});
				});
				

				