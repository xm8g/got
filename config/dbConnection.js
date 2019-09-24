var mongo = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017";
const dbName = "got";
var connMongoDB = function (dados) {
    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        query(db, dados);
        client.close();
    });
};

function query(db, dados) {
    var collection = db.collection(dados.collection);
    
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.object, dados.callback);
            break;
        case "procurar":
            collection.find(dados.object).toArray(dados.callback);
            break;
        case "procurarPorId":
            var id = new ObjectId(dados.object);
            collection.find({ usuario: id}).toArray(dados.callback);
            break;
        case "procurarPorAcoesAtivas":
            var id = new ObjectId(dados.object);
            var date = new Date();
            var now = date.getTime();
            collection.find({ usuario: id, termino: {$gt:now} }).toArray(dados.callback);
            break;
        case "decrementarMoedas":
            var id = new ObjectId(dados.object.usuario);
            collection.update(
                { usuario: id}, 
                { $inc: { moeda: dados.object.pagamento} }
            );
            break;
        case "apagarOrdem":
            var idDaOrdem = new ObjectId(dados.object);
            collection.deleteOne( { _id : idDaOrdem}, dados.callback );
        default:
            break;
    }
}
module.exports = function () {
    return connMongoDB;
};