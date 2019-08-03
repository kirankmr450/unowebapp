(() => {

	//Global Variable Assigning
	var mPropertyId;
	var mPropertyDetails;

	$(document).ready(() => {
        if(!Auth.isLoggedIn()) {
			//go to login
			Nav.gotoLogin();
            return;
		}
		// Get the propertyid Value
		mPropertyId = Utils.getURLParameter('building_id', window.location);
		// Declaring main function
		viewBuildindDetails();
        $(document).on('click', '#SignOut', function () {
			Auth.logout();
			//go to login
			Nav.gotoLogin();
		});
	});

	// Fetch View building Details
	function viewBuildindDetails() {

		Property.getProperty(mPropertyId).done((property) => {
			mPropertyDetails = property;
			$("#building-ID").attr("value", mPropertyDetails.facilityid);

			$("#usr").attr("value", mPropertyDetails.name);
			$("#address1").attr("value", mPropertyDetails.address.line1);
			$("#address2").attr("value", mPropertyDetails.address.line2);
			$("#pincode").attr("value", mPropertyDetails.address.pin);
			$("#emailid").attr("value", mPropertyDetails.emailid);
			$("#phone1").attr("value", mPropertyDetails.phonenumber1);
			$("#phone2").attr("value", mPropertyDetails.phonenumber2);
			// $("#lat").attr("value", mPropertyDetails.address.location.latitude);
			// $("#log").attr("value", mPropertyDetails.address.location.longitude);
			$("#description").html(mPropertyDetails.description);

			//Fetch City
			Meta.getCities().done((cities) => {
				var cityhtml = cities.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv + '</option>';
						return acc;
					}, '');
				$('#city').html(cityhtml);
				$("#city option").each(function () {
					if ($(this).val() == mPropertyDetails.address.city) {
						$(this).attr("selected", "selected");
					}
				});
			});

			//Fetch Locality
			var selectedCity = mPropertyDetails.address.city;
			Meta.getLocalitiesByCity(selectedCity).done((localities) => {
				var localityhtml = localities.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv + '</option>';
						return acc;
					}, '');
				$('#location').html(localityhtml);
				$("#location option").each(function () {
					if ($(this).val() == mPropertyDetails.address.locality) {
						$(this).attr("selected", "selected");
					}
				});
			});

			//Fetch Property Type
			Meta.getBuildingTypes().done((buildingtype) => {
				var buildingtypehtml = buildingtype.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv.replace(/([A-Z])/g, ' $1').trim() + '</option>';
						return acc;
					}, '');
				$('#property-type').html(buildingtypehtml);
				$("#property-type option").each(function () {
					if ($(this).val() == mPropertyDetails.buildingtype) {
						$(this).attr("selected", "selected");
					}
				});
			});

			// Fetch States
			Meta.getStates().done((states) => {
				var statehtml = states.reduce((acc, cv) => {
						acc += '<option value="' + cv + '">' + cv + '</option>';
						return acc;
					}, '');
				$('#state').html(statehtml);
				$("#state option").each(function () {
					if ($(this).val() == mPropertyDetails.address.state) {
						$(this).attr("selected", "selected");
					}
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

			// Handle Edit Button
			$('#edit_building').on('click', editProperty);

			// Handle Update Button
			$('#Update_building').on('click', updateProperty);
			
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

			//Show add or view landmark button
			var nearbyLength = mPropertyDetails.nearby.length;
			if (nearbyLength == 0) {
				$(".ADD_LANDMARK").show();
			} else {
				$(".VIEW_LANDMARK").show();
			}
			$('.ADD_LANDMARK').on('click', () => {
				// go to Landmark
				Nav.gotoLandmark(mPropertyId);
			});
			$('.VIEW_LANDMARK').on('click', () => {
				// go to Landmark
				Nav.gotoLandmark(mPropertyId);
			});
		});

	}

	// Function for edit property
	function editProperty() {

		$('#change_content').html('Edit Building Details');

		$('#usr').prop("disabled", false);
		$('#phone1').prop("disabled", false);
		$('#phone2').prop("disabled", false);
		$('#emailid').prop("disabled", false);
		$('#address1').prop("disabled", false);
		$('#address2').prop("disabled", false);
		$('#location').prop("disabled", false);
		$('#city').prop("disabled", false);
		$('#property-type').prop("disabled", false);
		$('#state').prop("disabled", false);
		$('#pincode').prop("disabled", false);
		$('#lat').prop("disabled", false);
		$('#log').prop("disabled", false);
		$('#description').prop("disabled", false);

		// Show Update Button
		$("#Update_building").show();

	}

	// Handle Update Button
	function updateProperty() {
		if (!uiValidationPassed())
			return;

		var fb = new Property.PropertyBuilder();
		fb.setId(mPropertyId)
		.addName($("#usr").val())
		.addPhoneNumber($("#phone1").val())
		.addPhoneNumber($("#phone2").val())
		.addEmailId($("#emailid").val())
		.addBuildingType($("#property-type").val())
		.addAddress($("#address1").val())
		.addAddress($("#address2").val())
		.addLocality($("#location").val())
		.addCity($("#city").val())
		.addState($("#state").val())
		.addPincode($("#pincode").val())
		.addCountry('India')
		.addDescription($("#description").val())
		.update()
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			var propertyid = property._id;
			// go to View building Browse
			Nav.gotoViewProperty(propertyid);
		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		});

	}
	
	// Function for goTop
	function goTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

	}

	// Validate all UI fields.
	// Should be invoked before creating a property.
	var uiValidationPassed = () => {
		var buildingname = $("#usr").val();
		var HoursEntry = $("#location option:selected").val();
		var address1 = $("#address1").val();
		var address2 = $("#address2").val();
		var pincode = $("#pincode").val();
		var emailid = $("#emailid").val();
		var phone1 = $("#phone1").val();

		if (buildingname == "") {
			$('#build').html("Building Name must be filled out");
		} else {
			$('#build').html("");

		}

		if (HoursEntry == undefined) {
			$("#msg").html("Please select the location");
		} else {
			$("#msg").html("");
		}

		if (!address1) {
			$("#add1").html("Address 1 must be filled out");
		} else {
			$("#add1").html("");
		}

		if (!address2) {
			$("#add2").html("Address 1 must be filled out");
		} else {
			$("#add2").html("");
		}

		if (!pincode) {
			$("#pin-code").html("Pin code must be filled");
		} else if (!Utils.validatePinCode(pincode)) {
			$("#pin-code").html("Pin code should be 6 digits");
		} else {
			$("#pin-code").html("");
		}

		if (!emailid) {
			$("#email-id").html("Email ID must be filled");
		} else if (!Utils.validateEmailId(emailid)) {
			$("#email-id").html("Email ID should be xyz@gmail.com Format");
		} else {
			$("#email-id").html("");
		}

		if (!phone1) {
			$("#phone-1").html("Phone no must be filled");
		} else if (!Utils.validatePhoneNumber(phone1)) {
			$("#phone-1").html("Phone no should be 10 digits");
		} else {
			$("#phone-1").html("");
		}

		if (buildingname == "") {
			return false;
		}

		if (HoursEntry == undefined) {

			return false;
		}

		if (!address1) {
			return false;
		}

		if (!address2) {
			return false;
		}

		if (pincode == "") {
			return false;
		} else if (!Utils.validatePinCode(pincode)) {
			return false;
		}

		if (emailid == "") {
			return false;
		} else if (!Utils.validateEmailId(emailid)) {
			return false;
		}

		if (phone1 == "") {
			return false;
		} else if (!Utils.validatePhoneNumber(phone1)) {
			return false;
		}
		return true;
	}
})();
