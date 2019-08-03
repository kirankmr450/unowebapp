var Auth = (() => {
    let AUTHORIZATION_KEY = 'auth.Authorization';
    let USERID_KEY = 'auth.userid';
    let ROLE_KEY = 'auth.role';
    
    // Logs-in the user
	var login = (username, password) => {
		var payload = {
			username,
			password
		};
		return Api.httpPost('auth/login', payload, false)
                .done((data) => {
                    localStorage.setItem(AUTHORIZATION_KEY, data.token)
                    localStorage.setItem(USERID_KEY, data.userid)
                    localStorage.setItem(ROLE_KEY, data.role)
                });
	}
    // Logs-out the user
    var logout = () => {
        localStorage.removeItem(AUTHORIZATION_KEY)
        localStorage.removeItem(USERID_KEY)
        localStorage.removeItem(ROLE_KEY)
    }
    // Get Authentication token
    var getAuthenticationToken = () => {
        return localStorage.getItem(AUTHORIZATION_KEY);
    }
    // Returns true, if the user is logged-in
    var isLoggedIn = () => {
        return (localStorage.getItem(AUTHORIZATION_KEY) !== null);
    }
    // Get current logged-in user id
    var getUserId = () => {
        return localStorage.getItem(USERID_KEY);
    }
    // Returns true, if current logged-in user is admin
    var isAdmin = () => {
        return (localStorage.getItem(ROLE_KEY) === 'Admin');
    }

	return {
		login,
        logout,
        getAuthenticationToken,
        isLoggedIn,
        getUserId,
        isAdmin
	};
})();
