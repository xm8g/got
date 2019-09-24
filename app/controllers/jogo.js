const { validationResult } = require('express-validator');
var ObjectId = require('mongodb').ObjectID;

module.exports.jogo = function (application, req, res) {
    if (req.session.autenticado !== true) {
        res.render('index', {
            validacao: [
                {
                    msg: 'Usuário não logado!'
                }
            ]
        }
        );
        return;
    }
    
    var actionReturn = '';
    if (req.query.actionReturn !== '') {
        actionReturn = req.query.actionReturn;
    }
    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var idUsuario = req.session.idUsuario;

    JogoDAO.iniciaJogo(idUsuario, req, res, actionReturn);
}

module.exports.suditos = function (application, req, res) {
    if (req.session.autenticado !== true) {
        res.send('Usuário não logado');
        return;
    }
    res.render('suditos', { validacao: {} });
}

module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autenticado !== true) {
        res.send('Usuário não logado');
        return;
    }
    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var idUsuario = req.session.idUsuario;
    JogoDAO.listarOrdens(idUsuario, res);

}

module.exports.ordenarSudito = function (application, req, res) {
    if (req.session.autenticado !== true) {
        res.send('Usuário não logado');
        return;
    }
    var dadosForm = req.body
    dadosForm.usuario = new ObjectId(req.session.idUsuario);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.redirect('jogo?actionReturn=S');
        return;
    }
    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.ordenar(dadosForm);
    JogoDAO.atualizarMoedas(dadosForm);
    res.redirect('jogo?actionReturn=A');
}

module.exports.revogarOrdem = function (application, req, res) {
    if (req.session.autenticado !== true) {
        res.send('Usuário não logado');
        return;
    }
    var connection = application.config.dbConnection
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var idOrdem = req.query.ordemId;
    var usuario = new ObjectId(req.session.idUsuario);
    JogoDAO.apagarOrdem(idOrdem, usuario, res);
}

module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render('index', { validacao: {} });
    })
}