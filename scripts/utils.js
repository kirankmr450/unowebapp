var Utils = (() => {
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
    
    return {
        validatePinCode,
        validateEmailId,
        validatePhoneNumber
    };
})();
