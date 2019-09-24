const { check } = require('express-validator');

module.exports = function (application) {
    application.get('/jogo', function (req, res) {
        application.app.controllers.jogo.jogo(application, req, res);
    });
    application.get('/sair', function (req, res) {
        application.app.controllers.jogo.sair(application, req, res);
    });
    application.get('/suditos', function (req, res) {
        application.app.controllers.jogo.suditos(application, req, res);
    });
    application.get('/pergaminhos', function (req, res) {
        application.app.controllers.jogo.pergaminhos(application, req, res);
    });
    application.post('/ordenarSudito', [
        check('acao', 'A Ação deve ser informada.').not().isEmpty(),
        check('quantidade', 'Quantidade deve ser informada.').not().isEmpty(),
    ],
    function (req, res) {
        application.app.controllers.jogo.ordenarSudito(application, req, res);
    });
    application.get('/revogarOrdem', function (req, res) {
        application.app.controllers.jogo.revogarOrdem(application, req, res);
    });
}