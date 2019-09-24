const { check } = require('express-validator');

module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar', [
        check('usuario', 'Usuário é Obrigatório!').not().isEmpty(),
        check('senha', 'A Senha é Obrigatória!').not().isEmpty()
    ], function (req, res) {
        application.app.controllers.index.autenticar(application, req, res);
    });
}