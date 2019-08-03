(() => {
	$(document).ready(() => {
		$(document).on('click', '#SignOut', function () {
			localStorage.removeItem('Authorization')
			localStorage.removeItem('userid')
			localStorage.removeItem('role')
			//go to login
			Nav.gotoLogin();

		});

	}); // document.ready()
})();
