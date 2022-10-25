var pool = require('./bd');

/*listando agenda*/
async function getAgenda() {
    var query = 'select * from prox_sesiones';
    var rows = await pool.query(query);
    return rows;
}

async function deleteAgendaById(Id) {
var query = 'delete from prox_sesiones where id = ?';
var rows = await pool.query(query, [Id]);
return rows;
}

/*agregar agendamientos*/
async function insertAgenda(obj) {
    try {
        var query = 'insert into prox_sesiones set ? ';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/*modificar un agendamiento*/
async function getAgendaById(Id) {
    var query = "select * from prox_sesiones where Id = ?" ;
    var rows = await pool.query(query, [Id]);
    return rows[0];
}

async function modificarAgendaById(obj, Id) {
    try {
        var query = "update prox_sesiones set ? where Id= ?";
        var rows = await pool.query(query, [obj, Id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
//fin modificar

/* search de agenda */
async function buscarAgenda(busqueda) {
    var query = "select * from prox_sesiones where coachee like ? OR usuario like ? OR fecha_sesion like ?";
    var rows = await pool.query(query, ['%'+busqueda+'%','%'+busqueda+'%','%'+busqueda+'%']);
    return rows;
}
//fin search

module.exports = { getAgenda, deleteAgendaById, insertAgenda, getAgendaById, modificarAgendaById, buscarAgenda }