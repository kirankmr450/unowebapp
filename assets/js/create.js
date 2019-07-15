$(function () {
    $("#save").on("click", function () {



        var buildingname = $("#usr").val();
        var building_name = document.getElementById("usr");
        var HoursEntry = $("#location option:selected").val();
        var location_name = document.getElementById("location");
        var address1 = $("#address1").val();
        var address_1 = document.getElementById("address1");
        var address2 = $("#address2").val();
        var address_2 = document.getElementById("address2");
        var pincode = $("#pincode").val();
        var pin_code = document.getElementById("pincode");
        var pat1 = /^\d{6}$/;
        var emailid = $("#emailid").val();
        var user_id = document.getElementById("emailid");
        var filter = /^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([A-Za-z]{2,4})$/;
        var phone1 = $("#phone1").val();
        var user_mobile = document.getElementById("phone1");
        var pattern = /^\d{10}$/;

        if (1 == 1) {


            if (buildingname == "") {
                $("#build").html("Building Name must be filled out");
            } else {
                $("#build").html("");
            }



            if (HoursEntry == undefined) {

                $("#msg").html("Please select the location");
            } else {
                $("#msg").html("");
            }


            if (address1 == "") {
                $("#add1").html("Address 1 must be filled out");
            } else {
                $("#add1").html("");
            }


            if (address2 == "") {
                $("#add2").html("Address 2 must be filled out");
            } else {
                $("#add2").html("");
            }


            if (pincode == "") {
                $("#pin-code").html("Pin code must be filled");
            } else if (!pat1.test(pin_code.value)) {
                $("#pin-code").html("Pin code should be 6 digits");
            } else {
                $("#pin-code").html("");
            }



            if (emailid == "") {
                $("#email-id").html("Email ID must be filled");
            } else if (!filter.test(user_id.value)) {
                $("#email-id").html("Email ID should be xyz@gmail.com Format");
            } else {
                $("#email-id").html("");
            }



            if (phone1 == "") {
                $("#phone-1").html("Phone no must be filled");
            } else if (!pattern.test(user_mobile.value)) {
                $("#phone-1").html("Phone no should be 10 digits");
            } else {
                $("#phone-1").html("");
            }
        }

        //-------------------------------------------//

        if (buildingname == "") {
            return false;
        }


        if (HoursEntry == undefined) {

            return false;
        }

        if (address1 == "") {
            return false;
        }


        if (address2 == "") {
            return false;
        }


        if (pincode == "") {
            return false;
        } else if (!pat1.test(pin_code.value)) {
            return false;
        }

        if (emailid == "") {
            return false;
        } else if (!filter.test(user_id.value)) {
            return false;
        }


        if (phone1 == "") {
            return false;
        } else if (!pattern.test(user_mobile.value)) {
            return false;
        }

        //-------------------------------------------//				

        var Data = {
            "name": $("#usr").val(),
            "phonenumber1": $("#phone1").val(),
            "phonenumber2": $("#phone2").val(),
            "emailid": $("#emailid").val(),
            // "amenities": ["SwimmingPool", "Spa"],
            // "rules": ["Rule-1", "Rule-2"],
            "address": {
                "line1": $("#address1").val(),
                "line2": $("#address2").val(),
                "locality": $("#location").val(),
                "city": $("#city").val(),
                "pin": $("#pincode").val(),
                "country": "India",
                "location": {
                    "latitude": $("#lat").val(),
                    "longitude": $("#log").val()
                }
            },
            "description": $("#description").val()
        }

        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.211:3000/facility/',
            data: JSON.stringify(Data), // or JSON.stringify ({name: 'jonas'}),
            success: function (data) {

                alert('General Building Details added');
                var Latestid = data._id;
                console.log(Latestid);
                window.location.href = 'http://localhost/unoroom-admin/add-building-landmark.html?building_id=' + Latestid;
            },
            contentType: "application/json",
            dataType: 'json'

        });





    });
});
