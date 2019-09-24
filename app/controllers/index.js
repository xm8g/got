const { validationResult } = require('express-validator');

module.exports.index = function(application, req, res) {
    res.render('index', {validacao : {} });
}
module.exports.autenticar = function(application, req, res) {
    var dadosForm = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('index', {validacao: errors.array()});
        return;
    }

    var connection = application.config.dbConnection;
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.autenticar(dadosForm, req, res);
   
    
}