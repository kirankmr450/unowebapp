

$(document).on('click','#save_image',function(){

var img_files = $('#file')[0].files;
console.log(img_files.length);

var Category = $("#Category_from").val();
var Category_name=document.getElementById("Category_from");
var Description = $("#Description_from").val();
var Description_name=document.getElementById("Description_from");






if(1==1){
	
	
	
             if(img_files.length == 0) 
				{
				$("#dialog2").html("Upload the Building Images");
				}else
				{
				$("#dialog2").html("");
				}

				if (Category == "") {
				$("#Category").html("Category must be filled out");
				
				
				}
				else
				{
				$("#Category").html("");
				}
				
				if (Description == "") {
				$("#Description").html("Description must be filled out");
				
				return false;
				}
				else
				{
				$("#Description").html("");
				}
}


for(var i=0; i<img_files.length; i++){

		var name = document.getElementById("file").files[i].name;
		var form_data = new FormData();
		var ext = name.split('.').pop().toLowerCase();
		if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
		{
		alert("Invalid Image File");
		return false;
		}
		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById("file").files[i]);
		var f = document.getElementById("file").files[0];
		var fsize = f.size||f.fileSize;
		if(fsize > 2000000)
	{
	alert("Image File Size is very big");
	}
	else
	{
	form_data.append("category", Category);
	form_data.append("description", Description);


	form_data.append("file", document.getElementById('file').files[i]);


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

			$.ajax({
			type: 'POST',
			url:'http://192.168.1.211:3000/facility/image/' + buildingidvalue,
			data: form_data,
			contentType: false,
			cache: false,
			processData: false,   
			success:function(data)
			{
			alert('uploaded Success');
			location.reload();
			}, error: function(data){
			console.log("error");
			console.log(data);
			}
			});
			});
			}
			}
			});
			