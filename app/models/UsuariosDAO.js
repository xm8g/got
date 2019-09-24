var crypto = require('crypto');

function UsuariosDAO(connection) {
    this._connection = connection;
}
UsuariosDAO.prototype.inserirUsuario = function (usuario, req, res, jogoDAO) {
    var senhaEncriptada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senhaEncriptada;
    var dados = {
        operacao: "inserir",
        object: usuario,
        collection: "usuarios",
        callback: function (err, result) {
            //gerar parâmetros iniciais (RPG) do usuário
            jogoDAO.gerarHabilidades(result.insertedId, res);
        }
    };
    this._connection(dados);
};

UsuariosDAO.prototype.autenticar = function (dadosAutenticacao, req, res) {
    var dados = {
        operacao: "procurar",
        object: dadosAutenticacao  ,
        collection: "usuarios",
        callback: function (err, result) {
            req.session.autenticado = false;
            if(result[0] != undefined) {
                req.session.autenticado = true;
                req.session.usuario = result[0].usuario; //contém o nome de usuário
                req.session.idUsuario = result[0]._id; //contém o id de usuário
                req.session.casa = result[0].casa;
            }
            if (req.session.autenticado) {
                res.redirect('jogo');
            } else {
                res.render('index', {validacao : {} });
            }
        }
    };
    this._connection(dados);
};

module.exports = function () {
    return UsuariosDAO;
};