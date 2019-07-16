(() => {
    $(document).ready(() => {
        // Fetch cities and populate city drop-down
        Meta.getCities().done((cities) => {
            var cityhtml = cities.reduce((acc, cv) => {
                acc += '<option value="' + cv + '">' + cv + '</option>';
                return acc;
            }, '');
            $('#city').html(cityhtml);
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

        // Handle Save Button
        $('#save').on('click', () => {
            if (!uiValidationPassed()) return;
            
            var propertyName = $("#usr").val();
            var phonenumber1 = $("#phone1").val();
            var phonenumber2 = $("#phone2").val();
            var emailid = $("#emailid").val();
            var address = {
                line1: $("#address1").val(),
                line2: $("#address2").val(),
                locality: $("#location").val(),
                city: $("#city").val(),
                pin: $("#pincode").val(),
                country: "India",
                location: {
                    latitude: $("#lat").val(),
                    longitude: $("#log").val()
                }
            };
            var description = $("#description").val();
            
            Facility.createFacility(facilityname, phonenumber1, phonenumber2, 
                                    emailid, address, description).done((data) => {
                var facilityId = data._id;
                window.location.href = 
                    'http://localhost/unoroom-admin/add-building-landmark.html?building_id=' + facilityId;
            });
        });
        
        // Handle Back Button
        // TODO: Provide the relative URL
        $(document).on('click', '#Go_back_to_building_Browse', function () {
            window.location.href = "http://localhost/unoroom-admin/add-building-browse.html";
        });
        
        
        // Validate all UI fields.
        // Should be invoked before creating a property.
        var uiValidationPassed = () => {
            var buildingname = $("#usr").val();
            if (!buildingname) {
                $('#build').html("Building Name must be filled out");
                return false;
            }
            
            var HoursEntry = $("#location option:selected").val();
            if (!HoursEntry) {
                $("#msg").html("Please select the location");
                return false;
            }
            
            var address1 = $("#address1").val();
            if (!address1) {
                $("#add1").html("Address 1 must be filled out");
                return false;
            }
            
            var address2 = $("#address2").val();
            if (address2) {
                $("#add2").html("Address 2 must be filled out");
                return false;
            }
            
            var pincode = $("#pincode").val();
            if (!pincode) {
                $("#pin-code").html("Pin code must be filled");
                return false;
            }
            if (!Utils.validatePinCode(pincode)) {
                $("#pin-code").html("Pin code should be 6 digits");
                return false;
            }
        
            var emailid = $("#emailid").val();
            if (!emailid) {
                $("#email-id").html("Email ID must be filled");
                return false;
            } else if (!Utils.validateEmailId(emailid)) {
                $("#email-id").html("Email ID should be xyz@gmail.com Format");
                return false;
            }
            
            var phone1 = $("#phone1").val();
            if (!phone1) {
                $("#phone-1").html("Phone no must be filled");
                return false;
            } else if (!Utils.validatePhoneNumber(phone1)) {
                $("#phone-1").html("Phone no should be 10 digits");
                return false;
            }
            return true;
        }
    });
})();
