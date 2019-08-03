var UI = (() => {
	
	// Get all feature property
	var getFeaturedProperty = () => Api.httpGet('ui/dashboard/featuredproperty/');
	
	var getSearchByCity = () => Api.httpGet('ui/dashboard/places/');
	
	// addToFeatureProperty
	 var addToFeatureProperty = (propertyid) => {
        return Api.httpPut('ui/dashboard/featuredproperty/' + propertyid, null, true);
    }
	
	// Delete Feature Property
	 var deletefeaturedProperty = (propertyid) => {
        return Api.httpDelete('ui/dashboard/featuredproperty/' + propertyid, null, true);
    }
	
	// Add Search By City
	var addSearchbycity = (cityname, placename, location, images) => {
		var payload = {
			cityname,
			placename,
			location,
			images
		};
		return Api.httpPost('ui/dashboard/places', payload, true);
	}
	
	
	// Delete Search By City
	var deleteSearchByCity = (propertyid) => {
		return Api.httpDelete('ui/dashboard/places/' + propertyid, null, true);
	}
	
		return {
		getFeaturedProperty,
		getSearchByCity,
		addToFeatureProperty,
		deletefeaturedProperty,
		addSearchbycity,
		deleteSearchByCity
	}
})();