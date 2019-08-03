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
		fetchPropertyRoomDetails();
		populateRoomTypeDropDown();

		// Go back to building images
		$('#Go_back_to_image').on('click', () => {
			// go to building images
			Nav.gotoAddBuildingImages(mPropertyId);
		});
        $(document).on('click', '#SignOut', function () {
			Auth.logout();
			//go to login
			Nav.gotoLogin();
		});
	});

	// Fetch property room details
	function fetchPropertyRoomDetails() {
		// Fetch Room Details
		Property.getProperty(mPropertyId).done((property) => {
			mPropertyDetails = property;
			var room = '';
			var roomid = mPropertyDetails.rooms.length;
			var display = mPropertyDetails.rooms;
			var uiRoomType = {
				"SingleBedRoom": "Single Bed Room",
				"DoubleBedRoom": "Double Bed Room",
				"OneBHKApartment": "One BHK Apartment",
				"TwoBHKApartment": "Two BHK Apartment",
				"ThreeBHKApartment": "Three BHK Apartment",
			};
			for (i = 0; i <= roomid - 1; i++) {
				room += '<tr class="Delete_room">' +
				'<td>' + (i + 1) + '</td>' +
				'<td><button  class="btn btn-light buildingname roomtype" type="button" value="' + display[i].type + '">' + uiRoomType[display[i].type] + '</button></td>' +
				'<td><button  class="btn btn-light buildingname locationname" type="button" value="' + display[i].name + '">' + display[i].name + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + display[i].size + '">' + display[i].size + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + display[i].price + '">' + display[i].price + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" type="button" value="' + display[i].count + '">' + display[i].count + '</button></td>' +
				'<td><button  class="btn btn-light buildingname" value="' + display[i]._id + '" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button> <button  class="btn btn-light Delete_bul" value="' + display[i]._id + '" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button></td>' +
				'</tr>';
			};
			$("#buildingtitle > tbody").html(room);

			// Handle save button click
			$('#save_room').on('click', createRoom);

			// Handle update button click
			$('#Update_room').on('click', updateRoom);

			// Handle room deletion
			$("#buildingtitle").on('click', '.Delete_bul', deleteRoom);

			// Handle Edit button
			$("#buildingtitle").on('click', '.buildingname', handleEditButton);
			
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
	
	// Display the particular Room by clicking the Room name
	function handleEditButton() {
		var currentRow = $(this).closest("tr");
		var roomid = currentRow.find(".Delete_bul").val();
		var roomtype = currentRow.find(".roomtype").val();

		Meta.getRoomTypes().done((rooms) => {

			var uiRoomType = {
				"SingleBedRoom": "Single Bed Room",
				"DoubleBedRoom": "Double Bed Room",
				"OneBHKApartment": "One BHK Apartment",
				"TwoBHKApartment": "Two BHK Apartment",
				"ThreeBHKApartment": "Three BHK Apartment",
			};
			var roomhtml = rooms.reduce((acc, cv) => {
					acc += '<option value="' + cv + '">' + uiRoomType[cv] + '</option>';
					return acc;
				}, '');
			$('#room_type').html(roomhtml);
			$("#room_type option").each(function () {
				if ($(this).val() == roomtype) {
					$(this).attr("selected", "selected");
				}
			});
		});

		var edited = mPropertyDetails.rooms;
		for (var i in edited) {
			if ((roomid == edited[i]._id)) {
				$("#room_name").attr("value", edited[i].name);
				$("#room_size").attr("value", edited[i].size);
				$("#room_price").attr("value", edited[i].price);
				$("#room_count").attr("value", edited[i].count);
			}
		}

		if (history.pushState) {
			var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?building_id=' + mPropertyId + "&currentroom=" + roomid;
			window.history.pushState({
				path: newurl
			}, '', newurl);
		}
		$("#Update_room").show();
		$("#save_room").css('display', 'none');

	}
	
	// Fetch available room types and show in drop-down
	function populateRoomTypeDropDown() {
		var uiRoomType = {
			"SingleBedRoom": "Single Bed Room",
			"DoubleBedRoom": "Double Bed Room",
			"OneBHKApartment": "One BHK Apartment",
			"TwoBHKApartment": "Two BHK Apartment",
			"ThreeBHKApartment": "Three BHK Apartment",
		};
		var rtype = ["SingleBedRoom", "DoubleBedRoom", "OneBHKApartment", "TwoBHKApartment", "ThreeBHKApartment"];
		var getlength = rtype.length;
		var typeget = uiRoomType[rtype];
		roomTypehtml = [];
		for (i = 0; i <= getlength - 1; i++) {
			roomTypehtml += '<option value="' + rtype[i] + '">' + uiRoomType[rtype[i]] + '</option>';
		}
		$("#room_type").html(roomTypehtml);
	}

	// Function creates room data to backend
	function createRoom() {
		if (!uiValidationPassed())
			return;

		var fb = new Property.RoomBuilder();
		fb.setPropertyId(mPropertyId)
		.addName($("#room_name").val())
		.addType($("#room_type").val())
		.addSize($("#room_size").val())
		.addPrice($("#room_price").val())
		.addRoomCount($("#room_count").val())
		.create()
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			// Refresh
			location.reload();
		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		});
	}

	// Function Updates room data to backend
	function updateRoom() {
		if (!uiValidationPassed())
			return;

		var roomid = Utils.getURLParameter('currentroom', window.location);

		var fb = new Property.RoomBuilder();
		fb.setPropertyId(mPropertyId)
		.setId(roomid)
		.addName($("#room_name").val())
		.addType($("#room_type").val())
		.addSize($("#room_size").val())
		.addPrice($("#room_price").val())
		.addRoomCount($("#room_count").val())
		.update()
		.done((property) => {
			// Success Handler
			console.log(JSON.stringify(property))
			// Refresh
			location.reload();
		}).fail((e) => {
			// Error handler
			console.log(JSON.stringify(e));
		});
	}
	
	// Deletes a rooms
	function deleteRoom() {
		var currentRow = $(this).closest("tr");
		var col2 = currentRow.find("td:eq(2)").text();
		var roomId = $(this).val();
		var data = "Are you sure to delete this Room?" + "\n" + col2;
		if (confirm(data)) {

			Property.deleteRoom(mPropertyId, roomId).done((property) => {
				// refresh
				location.reload();
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
		var roomname = $("#room_name").val();
		var roomsize = $("#room_size").val();
		var roomprice = $("#room_price").val();
		var roomcount = $("#room_count").val();

		if (!roomname) {
			$("#room_name_val").html("Room Name must be filled out");
		} else {
			$("#room_name_val").html("");
		}

		if (!roomsize) {
			$("#room_size_val").html("Room Size must be filled");
		} else if (!Utils.validateRoomSize(roomsize)) {
			$("#room_size_val").html("Room Size should be 3-4 digits");
		} else {
			$("#room_size_val").html("");
		}

		if (!roomprice) {
			$("#room_price_val").html("Room Price must be filled");
		} else if (!Utils.validatePrice(roomprice)) {
			$("#room_price_val").html("Numeric characters only");
		} else {
			$("#room_price_val").html("");
		}

		if (!roomcount) {
			$("#room_count_val").html("Room Count must be filled out");
		} else if (!Utils.validateCount(roomcount)) {
			$("#room_count_val").html("Room Count should be 1-2 digits");
		} else {
			$("#room_count_val").html("");
		}

		if (!roomname) {
			return false;
		}
		if (!roomsize) {
			return false;
		} else if (!Utils.validateRoomSize(roomsize)) {
			return false;
		}
		if (!roomprice) {
			return false;
		} else if (!Utils.validatePrice(roomprice)) {
			return false;
		}
		if (!roomcount) {
			return false;
		} else if (!Utils.validateCount(roomcount)) {
			return false;
		}

		return true;
	}
})();
