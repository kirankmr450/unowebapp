(() => {

	//Global Variable Assigning
	var mPropertyId;
	var mPropertyDetails;
	// Do followings, on page load.
	$(document).ready(() => {
        if(!Auth.isLoggedIn()) {
			//go to login
			Nav.gotoLogin();
            return;
		}
		// Get the propertyid Value
		mPropertyId = Utils.getURLParameter('building_id', window.location);
		fetchPropertyAmenitiesandRulesDetails();

		// GO TO BUILDING Landmark
		$('#Go_back_to_building_landmark').on('click', () => {
			// go to Landmark
			Nav.gotoLandmark(mPropertyId);
		});
        $(document).on('click', '#SignOut', function () {
			Auth.logout();
			//go to login
			Nav.gotoLogin();
		});
	});

	// Fetch amenites and rules
	function fetchPropertyAmenitiesandRulesDetails() {

		// FEATCH BUILDING AMENITES WITH SELECTED VALUE
		Meta.getBuildingAmenities().done((amenities) => {
			var amenitieshtml = '';

			var amenitieslength = amenities.length;

			for (i = 0; i <= amenitieslength - 1; i++) {

				if (i % 4 === 5) {
					amenitieshtml += '<div  class="checkbox"><label><input type="checkbox" value="' + amenities[i] + '">' + amenities[i].replace(/([A-Z])/g, ' $1').trim() + '</label></div></br>';
				} else {
					amenitieshtml += '<div id="alignment" class="checkbox"><label><input type="checkbox" class="chk" value="' + amenities[i] + '">' + amenities[i].replace(/([A-Z])/g, ' $1').trim() + '</label></div>';
				}

			};

			$("#Put_checkbox").html(amenitieshtml);

			// Select value in amenities
			Property.getProperty(mPropertyId).done((property) => {
				mPropertyDetails = property;
				var amenities_get = property.amenities;

				for (var all_amenities in amenities_get) {
					$('input[value=' + amenities_get[all_amenities] + ']').prop("checked", true);
				}
				// Fetch rules & regulation
				var rulestitle = '';
				var rulesid = mPropertyDetails.rules.length;

				var display = mPropertyDetails.rules;

				for (i = 0; i <= rulesid - 1; i++) {

					rulestitle += '<div class="form-group form-inline"><label for="title">' + (i + 1) + '.' + '&nbsp' + '</label><span class="validateError" style="color:red;font-size:12px;display:none;">Rules & regulation must be filled out (or) Delete.</span>' +

					'<input type="text" id="author_email" class="form-control col-md-10 rules" value="' + display[i] + '">' +

					'<a style="color:red;font-size:12px;" href="#" class="remove_field"><i class="fa fa-times" aria-hidden="true"></i>Delete</a></div>';

				}

				$("#list_of_rules").html(rulestitle);

				// Handle update button click
				$('#get_amenities').on('click', updateAmenitiesRules);

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

				//show ADD IMAGES OR VIEW IMAGES Button
				var imagesLength = mPropertyDetails.images.length;
				if (imagesLength == 0) {
					$(".ADD_IMAGES").show();
				} else {
					$(".VIEW_IMAGES").show();
				}
				$('.ADD_IMAGES').on('click', () => {
					// go to building images
					Nav.gotoAddBuildingImages(mPropertyId);
				});
				$('.VIEW_IMAGES').on('click', () => {
					// go to building images
					Nav.gotoAddBuildingImages(mPropertyId);
				});

				//Handle Add Rules button
				var ruleslength = mPropertyDetails.rules.length;
				if (ruleslength === 0) {
					$(".view_rules").show();
					var max_fields = 20; //maximum input boxes allowed
					var wrapper = $(".items"); //Fields wrapper
					var add_button = $(".add_field_button"); //Add button ID

					var x = 1; //initlal text box count
					$(add_button).click(function (e) { //on add input button click
						e.preventDefault();
						if (x < max_fields) { //max input box allowed
							x++; //text box increment

							$(wrapper).append('<div class="form-group form-inline"><label for="title">' + ((x - 1) + 1) + '.' + '&nbsp' + '</label><div class="validateError col-xl-12" style="color:red;font-size:12px;margin-top:-20px;display:none;">Rules & regulation must be filled out (or) Delete.</div>' +

								'<input type="text" id="author_email" class="form-control col-md-10 rules">' +

								'<a style="color:red;font-size:12px;" href="#" class="remove_field"><i class="fa fa-times" aria-hidden="true"></i>Delete</a></div>'); //add input box

						}
					});

					$(wrapper).on("click", ".remove_field", function (e) { //user click on remove field
						e.preventDefault();
						$(this).parent('div').remove();
						x--;
					})

				} else {
					$(".view_rules").remove();
					var max_fields = 20; //maximum input boxes allowed
					var wrapper = $(".items"); //Fields wrapper
					var add_button = $(".add_field_button"); //Add button ID

					var x = 1; //initlal text box count

					$(add_button).click(function (e) { //on add input button click
						e.preventDefault();
						if (x < max_fields) { //max input box allowed
							x++; //text box increment
							console.log(x);
							$(wrapper).append('<div class="form-group form-inline">' +

								'<label for="title">' + ((ruleslength + x) - 1) + '.' + '</label><span class="validateError col-xl-12" style="color:red;font-size:12px;margin-top:-20px;display:none;">Rules & regulation must be filled out (or) Delete.</span>' +

								'<input type="text" id="author_email" class="form-control col-md-10 rules">' +

								'<a style="color:red;font-size:12px;" href="#" class="remove_field"><i class="fa fa-times" aria-hidden="true"></i>Delete</a></div>'); //add input box

						}
					});

					$(wrapper).on("click", ".remove_field", function (e) { //user click on remove field
						e.preventDefault();
						$(this).parent('div').remove();
						x--;
					})
				}

				// // Delete first table
				$('.remove_first_rules').on('click', () => {
					$(".view_rules").remove();
				});
			});
		});

	}

	// Function for goTop
	function goTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

	}

	// Function updates aminites & rules data to backend
	function updateAmenitiesRules() {

		var chkArray = [];

		var chkrules = [];

		$(".chk:checked").each(function () {
			chkArray.push($(this).val());
		});

		$(".rules").each(function () {
			chkrules.push($(this).val());
		});

		var exitSubmit = false;
		var rules_focus = document.getElementById("author_email");

		$(".rules").each(function () {

			var selectedTr = $(this);
			i = 0;
			var value = $(this).val();
			if (!value) {

				selectedTr.prev(".validateError").show();

				i++;
				exitSubmit = true;
				selectedTr.focus();
				return false;

			} else {
				selectedTr.prev(".validateError").hide();

			}

		});

		if (exitSubmit) {
			return false;
		}
		var rules = chkrules;
		var amenities = chkArray;

		Property.updateAmenities(mPropertyId, amenities, rules)
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			// Refresh
			location.reload();
			// fetchPropertyAmenitiesandRulesDetails();
		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		});
	}

})();
