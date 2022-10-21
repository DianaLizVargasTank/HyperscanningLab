var pool = require('./bd');

async function getAgenda() {
    var query = 'select * from prox_sesiones';
    var rows = await pool.query(query);
    return rows;
}

async function deleteAgendaById(Id) {
var query = 'delete from prox_sesiones where id = ?';
var rows = await pool.query(query, [id]);
return rows;
}

module.exports = { getAgenda, deleteAgendaById }