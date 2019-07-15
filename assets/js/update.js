$.getJSON("http://192.168.1.211:3000/facility/", function () {

    $("#buildingtitle").on('click', '.buildingname', function () {

        var currentRow = $(this).closest("tr");

        var buildingid = currentRow.find("._id").val();
        var city = currentRow.find(".City").val();
        var locality = currentRow.find(".Locality").val();
        console.log(buildingid, city, locality);



        window.location.href = 'http://localhost/unoroom-admin/view-building-browse.html?building_id=' + buildingid + "&city=" + city + "&locality=" + locality;

    });
});