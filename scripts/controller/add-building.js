(() => {

	$(document).ready(() => {
        if(!Auth.isLoggedIn()) {
			//go to login
			Nav.gotoLogin();
            return;
		}
        
		// Declaring main function
		addBuildingandpopulateAllDropdown();
        $(document).on('click', '#SignOut', function () {
			Auth.logout();
			//go to login
			Nav.gotoLogin();
		});
	});

	// Main function to show all the elements
	function addBuildingandpopulateAllDropdown() {

		// Fetch cities and populate city drop-down
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

		// Fetch States and populate State drop-down

		Meta.getStates().done((states) => {
			var statehtml = states.reduce((acc, cv) => {
					acc += '<option value="' + cv + '">' + cv + '</option>';
					return acc;
				}, '');
			$('#state').html(statehtml);
		});

		// Fetch BuildingType and populate State drop-down

		Meta.getBuildingTypes().done((buildingtype) => {
			var buildingtypehtml = buildingtype.reduce((acc, cv) => {
					acc += '<option value="' + cv + '">' + cv.replace(/([A-Z])/g, ' $1').trim() + '</option>';
					return acc;
				}, '');
			$('#property-type').html(buildingtypehtml);
		});

		// Handle Save Button
		$('#save').on('click', createProperty);
		
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

	}

	// Function to create property data to backend
	function createProperty() {
		if (!uiValidationPassed())
			return;

		var fb = new Property.PropertyBuilder();
		fb.addName($("#usr").val())
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

		.create()
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			var mPropertyId = property._id;
			// go to View building Browse
			Nav.gotoViewProperty(mPropertyId);

		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		})
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
