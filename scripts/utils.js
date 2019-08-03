var Utils = (() => {
	
	//Get URL ID Value
    var getURLParameter = (sParam, location) => {
        var sPageURL = location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
	
	 // Validated Pin Code
    var validatePinCode = (pincode) => {
        return /^\d{6}$/.test(pincode);
    } 
    
    // Validates Email Id
    var validateEmailId = (emailId) => {
        return /^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([A-Za-z]{2,4})$/.test(emailId);
    }
    
    // Validates Phone Number
    var validatePhoneNumber = (phNumber) => {
        return /^\d{10}$/.test(phNumber);
    }
	
	 // Validates Latitude
    var validateLatitude = (latitude) => {
        return /^-?([0-8]?[0-9]|90)\.[0-9]{1,7}$/.test(latitude);
    }
	
	
	 // Validates Latitude
    var validateLongitude = (longitude) => {
        return /^-?([0-8]?[0-9]|90)\.[0-9]{1,7}$/.test(longitude);
    }
	
	// Validates Distance
    var validateDistance = (distance) => {
        return /^[0-9]+$/.test(distance);
    }
	
		// Validates Distance
    var validateRoomSize = (roomsize) => {
        return /^[0-9]{3,4}$/.test(roomsize);
    }
	
	// Validates Distance
    var validatePrice = (price) => {
        return /^[0-9]+$/.test(price);
    }
	
	// Validates Distance
    var validateCount = (count) => {
        return /^[0-9]{1,2}$/.test(count);
    }
	

    return {
        getURLParameter,
		validatePinCode,
		validateEmailId,
		validatePhoneNumber,
		validateLatitude,
		validateLongitude,
		validateDistance,
		validateRoomSize,
		validatePrice,
		validateCount
		
		
    }
})();
