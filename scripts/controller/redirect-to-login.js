(() => {
	$(document).ready(() => {

		if(!localStorage.getItem('Authorization')){
			//go to login
			Nav.gotoLogin();
		}

	}); // document.ready()
})();
