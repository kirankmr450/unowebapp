// All Facility APIs
var Facility = (() => {
    // Creating a new facility
    var createFacility = (facilityname, phonenumber1, phonenumber2,
        emailid, address, description) => {
        var payload = {
            name: facilityname,
            phonenumber1,
            phonenumber2,
            emailid,
            address,
            description
        };

        return $.ajax({
            type: 'POST',
            url: Env.getBaseUrl() + '/facility/',
            data: JSON.stringify(payload),
            contentType: "application/json",
            dataType: 'json'
        });
    }

    // Updating a facility
    var updateFacility = () => {
        
    }

    return {
        createFacility,
        updateFacility
    }
})();
