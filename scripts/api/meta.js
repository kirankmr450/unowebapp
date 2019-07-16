var Meta = (() => {
    var getCities = () => {
        return $.getJSON(Env.getBaseUrl() + '/meta/cities');
    }

    var getLocalitiesByCity = (city) => {
        return $.getJSON(Env.getBaseUrl() + '/meta/localities?city=' + city);
    }
    
    return {
        getCities,
        getLocalitiesByCity
    }
})();
