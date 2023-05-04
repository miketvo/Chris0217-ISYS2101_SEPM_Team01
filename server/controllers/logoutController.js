const handleLogout = (req, res) => {
	req.session.is_logined = false;
	delete req.session.username;
	req.session.save(()=> {
		res.redirect('/');
	})
}

module.exports = { handleLogout };
