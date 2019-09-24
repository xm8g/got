const { validationResult } = require('express-validator');

module.exports.cadastro = function(application, req, res) {
    res.render('cadastro', {validacao : {}, dadosForm: {} });
}
module.exports.cadastrar = function(application, req, res) {
    var dadosForm = req.body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('cadastro', {validacao: errors.array(), dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);
    UsuariosDAO.inserirUsuario(dadosForm, req, res, JogoDAO);    

    res.redirect('confirmacaoCadastro');
}

module.exports.confirmacao = function(application, req, res) {
    res.render('confirmacaoCadastro');
}