	$(document).on('click','#get_amenities',function(){
getValueUsingClass();
});

function getValueUsingClass(){
/* declare an checkbox array */
var chkArray = [];

var chkrules = [];

$(".chk:checked").each(function() {
chkArray.push($(this).val());
});

$(".rules").each(function() {
chkrules.push($(this).val());
});

console.log(chkrules);


/* we join the array separated by the comma */
var selected;
selected = chkArray.join(',') ;
var amenities_focus=document.getElementById("amenities_checkbox");

/* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
if(chkArray.length > 5){
$("#amenities_checkbox").html("");	
}else{
$("#amenities_checkbox").html("Please select at least more than 5 checkbox");
window.location.href='#checkbox_select';
return false;		
}



var exitSubmit = false;
var rules_focus=document.getElementById("author_email");

$(".rules").each(function() {

var selectedTr = $(this);
i =0;
var value = $(this).val();
if (!value) {
selectedTr.prev("span").show();
i++;
exitSubmit = true;
selectedTr.focus();
return false;

} else {
selectedTr.prev("span").hide();

}

});

if (exitSubmit) {

// alert("ServiceTypeCategory Name is already added! Please Choose Differnt Category Name");
return false;
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
		var Data =  {	
		"rules": chkrules,
		"amenities": chkArray

		}


		$.ajax({
		type: 'PUT',
		url: 'http://192.168.1.211:3000/facility/' + buildingidvalue,
		data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),

		success: function(data) {

		alert('Amenities & Rules are added');
		location.reload();

		},
		contentType: "application/json",
		dataType: 'json'

		});



		});







		}

		
		$(document).on('click','#go_to_building_images',function(){
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
										window.location.href = "http://localhost/unoroom-admin/add-building-images.html?building_id=" + buildingidvalue;


										});
										
										});

						












						