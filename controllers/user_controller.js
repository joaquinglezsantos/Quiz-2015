var users = {
	admin: {id: 1, username: "admin", pwd: "1234"},
	pepe: {id: 2, username: "pepe", pwd: "1234"},
	joaquin: {id: 3, username: "joaquin", pwd: "1234"}
};

exports.autenticar = function(login, pwd, callback) {
	var err = 'Usuario o contraseña incorrecto.'
	if(users[login]) {
		if(pwd === users[login].pwd) {
			callback(null, users[login]);
		}
		else {
			callback(new Error(err));
		}
	}
	else {
		callback(new Error(err));
	}
}