var pool = require('./bd');
var md5 = require('md5');


async function insertSession(obj) {
    try{
        var query = "insert into hyperscanning set ?";
        var rows = await pool.query(query, [obj])
        return rows;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

//traer informacion de sesiones según observador
async function getSessionByObservador(observador) {
    var query = 'select * from hyperscanning where observador=? ';
    var rows = await pool.query(query, {observador});
    return rows[0];
}

module.exports = {insertSession }

//pool.query('insert into usuarios set ?', [obj]).then(function (resultados) {
//  console.log(resultados);
//});
