const handleLogout = (req, res) => {
	delete req.session.username;
	req.session.is_logined = false;
	req.session.save(()=> {
		res.redirect('/');
	})
}

module.exports = { handleLogout };
