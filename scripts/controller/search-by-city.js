(() => {
	//var mPropertyId;
	//var mPropertyDetails;
	$(document).ready(() => {
        if(!Auth.isLoggedIn()) {
			//go to login
			Nav.gotoLogin();
            return;
		}
        
		fetchPropertyDetailsSearchByCity();
		populateLocationTypeDropDown();
        
        $(document).on('click', '#SignOut', function () {
			Auth.logout();
			//go to login
			Nav.gotoLogin();
		});
	}); // document.ready()


	// Fetch Search By City

	function fetchPropertyDetailsSearchByCity() {
		UI.getSearchByCity().done((searchbycity) => {

			var searchbycityhtml = '';
			var imageid = searchbycity.images;
			var imagelength = searchbycity.length;
			// var imageUrls = imageid.map(image => 'http://192.168.1.211:3000/facility/' + image.url);

			for (i = 0; i <= imagelength - 1; i++) {

				searchbycityhtml += '<tr class="Delete_LandMark">' +
				'<td>' + (i + 1) + '</td>' +
				// '<td><img class="imageThumb" id="yourImgId" src=\"' + imageUrls[i] + '\" title="" + file.name + ""/></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + searchbycity[i].images + '">' + searchbycity[i].images + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + searchbycity[i].cityname + '">' + searchbycity[i].cityname + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + searchbycity[i].placename + '">' + searchbycity[i].placename + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + searchbycity[i].location.latitude + '">' + searchbycity[i].location.latitude + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + searchbycity[i].location.longitude + '">' + searchbycity[i].location.longitude + '</button></td>' +

				'<td><button  class="btn btn-light Delete_bul" value="' + searchbycity[i]._id + '" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button></td>' +
				'</tr>';

			};

			$("#buildingtitle > tbody").html(searchbycityhtml);

			// // IMAGE UI CONTROL
			var closebtns = document.getElementsByClassName("close-thin");
			var i;
			for (i = 0; i < closebtns.length; i++) {
				closebtns[i].addEventListener("click", function () {
					this.parentElement.style.display = 'none';
				});
			}

			$(document).ready(function () {
				if (window.File && window.FileList && window.FileReader) {
					$("#file").on("change", function (e) {
						var files = e.target.files,
						filesLength = files.length;
						for (var i = 0; i < filesLength; i++) {
							var f = files[i]
								var fileReader = new FileReader();
							fileReader.onload = (function (e) {
								var file = e.target;
								$("<div class=\"pip\">" + "<span class=\"remove\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span>" +
									"<img class=\"imageThumbing\" id=\"yourImgId\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>"
									 +
									"</div>").insertBefore("#dialog");
								$(".remove").click(function () {
									$(this).parent(".pip").remove();
									document.getElementById("file").value = "";
								});
							});
							fileReader.readAsDataURL(f);
						}
					});
				} else {
					alert("Your browser doesn't support to File API")
				}
			});
			//save search by City
			$('#save_image').on('click', saveSearchCity);
			// Delete Search By City
			$("#buildingtitle").on('click', '.Delete_bul', deleteSearchCity);

			// Handle Top button
			$("#myBtn").on('click', goTop);

			// Onscrool button shows
			window.onscroll = function () {
				scrollFunction()
			};

			function scrollFunction() {
				if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
					document.getElementById("myBtn").style.display = "block";
				} else {
					document.getElementById("myBtn").style.display = "none";
				}
			}

		});
	}

	// Fetch cities and populate city drop-down
	function populateLocationTypeDropDown() {
		Meta.getCities().done((cities) => {
			var cityhtml = cities.reduce((acc, cv) => {
					acc += '<option value="' + cv + '">' + cv + '</option>';
					return acc;
				}, '');
			$('#city').html(cityhtml);
			var getcity = $('select>option:eq(1)').prop('selected', true).val();
			Meta.getLocalitiesByCity(getcity).done((localities) => {
				var localityhtml = localities.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv + '</option>';
						return acc;
					}, '');
				$('#location').html(localityhtml);
			});
		});
		// On city select, fetch corresponding localities
		// and populate drop-down
		$('#city').change(function () {
			var selectedCity = $(this).find("option:selected").val();
			Meta.getLocalitiesByCity(selectedCity).done((localities) => {
				var localityhtml = localities.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv + '</option>';
						return acc;
					}, '');
				$('#location').html(localityhtml);
			});
		});
	}

	// Handle Save Button
	function saveSearchCity() {
		if (!uiValidationPassed())
			return;

		var cityname = $("#city").val();
		var placename = $("#location").val();
		var location = {
			latitude: $("#landmark_lat").val(),
			longitude: $("#landmark_log").val()
		};
		var images = [];

		UI.addSearchbycity(cityname, placename, location, images)
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			// go to Search By City (same Page)
			//Nav.gotoSearchByCity();
			location.reload();
		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		});
	}

	// Delete Search By City
	function deleteSearchCity() {

		var currentRow = $(this).closest("tr");

		var col2 = currentRow.find("td:eq(2)").text();
		var propertyid = $(this).val();
		var data = "Are you sure to delete this Landmark?" + "\n" + col2;

		if (confirm(data)) {

			UI.deleteSearchByCity(propertyid).done((property) => {
				// go to Search By City (same Page)
				Nav.gotoSearchByCity();
			});

		}

	}

	// Function for goTop
	function goTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

	}

	// Validate all UI fields.
	// Should be invoked before creating a property.
	var uiValidationPassed = () => {
		var img_files = $('#file')[0].files;
		var latitude = $("#landmark_lat").val();
		var longitude = $("#landmark_log").val();

		if (img_files.length == 0) {
			$("#dialog2").html("Upload the Building Images");
		} else {
			$("#dialog2").html("");
		}

		if (!latitude) {
			$("#latitude-code").html("Latitude number must be filled");
		} else if (!Utils.validateLatitude(latitude)) {
			$("#latitude-code").html("Latitude number should be xx.xxxxxxx");
		} else {
			$("#latitude-code").html("");
		}

		if (!longitude) {
			$("#longitude-code").html("Longitude number must be filled");
		} else if (!Utils.validateLongitude(longitude)) {
			$("#longitude-code").html("Longitude number should be xx.xxxxxxx");
		} else {
			$("#longitude-code").html("");
		}

		if (img_files.length == 0) {
			return false;
		}

		if (latitude == "") {
			return false;
		} else if (!Utils.validateLatitude(latitude)) {
			return false;
		}

		if (longitude == "") {
			return false;
		} else if (!Utils.validateLongitude(longitude)) {
			return false;
		}

		return true;
	}

})();
