exports.index = function(req,res) {
	let msg = '';
	res.render('index', {message: msg});
}