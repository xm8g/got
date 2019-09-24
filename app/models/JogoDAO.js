function JogoDAO(connection) {
    this._connection = connection;
}
JogoDAO.prototype.gerarHabilidades = function (idUsuario, res) {

    var skills = {
        usuario: idUsuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    }

    var dados = {
        operacao: "inserir",
        object: skills,
        collection: "jogo",
        callback: function (err, result) {

        }
    }
    this._connection(dados);
}

JogoDAO.prototype.iniciaJogo = function (idUsuario, req, res, actionReturn) {
    const casa = req.session.casa;
    //obter as skills do usuario
    var dados = {
        operacao: "procurarPorId",
        object: idUsuario,
        collection: "jogo",
        callback: function (err, result) {
            res.render('jogo', { imgCasa: casa, jogo: result[0], actionReturn: actionReturn });
        }
    };
    this._connection(dados);
}

JogoDAO.prototype.ordenar = function (ordem) {
    var acao = ordem.acao;
    var now = new Date();
    var periodo = null;
    switch (parseInt(acao)) {
        case 1: periodo = 1 * 60 * 60000;
            break;
        case 2: periodo = 2 * 60 * 60000;
            break;
        case 3: periodo = 5 * 60 * 60000;
        case 4: periodo = 5 * 60 * 60000;
    }
    ordem.termino = now.getTime() + periodo;
    var dados = {
        operacao: "inserir",
        object: ordem,
        collection: "acao",
        callback: function (err, result) {
            
        }
    }
    this._connection(dados);
}

JogoDAO.prototype.atualizarMoedas = function (ordem) {
    var acao = ordem.acao;
    var moedas = null;
    switch (parseInt(acao)) {
        case 1: moedas = -2 * ordem.quantidade;
            break;
        case 2: moedas = -3 * ordem.quantidade;
            break;
        case 3: 
        case 4: moedas = -1 * ordem.quantidade;
    }
    ordem.pagamento = moedas;
    var dados = {
        operacao: "decrementarMoedas",
        object: ordem,
        collection: "jogo",
        callback: function (err, result) {
            
        }
    }
    this._connection(dados);
}

JogoDAO.prototype.listarOrdens = function (idUsuario, res) {
    var dados = {
        operacao: "procurarPorAcoesAtivas",
        object: idUsuario,
        collection: "acao",
        callback: function (err, result) {
            console.log('ordens', result)
            res.render('pergaminhos', {ordens : result});
        }
    };
    this._connection(dados);
}

JogoDAO.prototype.apagarOrdem = function (ordemId, usuario, res) {
    var dados = {
        operacao: "apagarOrdem",
        object: ordemId,
        collection: "acao",
        callback: function (err, result) {
            //está apagando mas não tá atuaLIZANDO A LISTA
            res.redirect('jogo?actionReturn=O');
        }
    };
    this._connection(dados);
}


module.exports = function () {
    return JogoDAO;
};