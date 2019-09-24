const { check } = require('express-validator');

module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        application.app.controllers.cadastro.cadastro(application, req, res);
    });

    application.get('/confirmacaoCadastro', function (req, res) {
        application.app.controllers.cadastro.confirmacao(application, req, res);
    });

    application.post('/cadastrar', [
        check('nome', 'Nome é Obrigatório!').not().isEmpty(),
        check('usuario', 'Usuário é Obrigatório!').not().isEmpty(),
        check('senha', 'A Senha é Obrigatória!').not().isEmpty(),
        check('casa', 'Casa é Obrigatória!').not().isEmpty()
    ], function (req, res) {
        application.app.controllers.cadastro.cadastrar(application, req, res);
    });
}