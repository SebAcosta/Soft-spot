import * as SQLite from 'expo-sqlite';

//Nombre de la base de datos
const MY_DATABASE = 'soft-spot.db';


//Creamos conexión
export async function getDbConnection(){
    const db = await SQLite.openDatabase({name: MY_DATABASE});
    console.log("Conectando a la BDD...")
    return db;
}

//Creamos las tablas
export async function createTables(db){
    const query = `CREATE TABLE IF NOT EXISTS articulo (idArticulo INTEGER PRIMARY KEY AUTOINCREMENT, nombreArticulo VARCHAR(50), descArt VARCHAR(200), cantidad INTEGER(3), cantidadCrit INTEGER(3), precio DOUBLE(6,2))`;
    console.log("Tablas creadas");
    return db.transaction(tx => {tx.executeSql(query)});
}

//Inicializamos la BD
export async function initDatabase(){
    const db = await getDbConnection();
    await createTables(db);
    console.log("DB inicializada")
    db.closeAsync();
}

//Inserts para ARTICULOS
export async function insertArticulo(db, nombreArticulo, descArt, cantidad, cantidadCrit, precio){
    const insertQuery = `INSERT INTO articulo (nombreArticulo,descArt,cantidad,cantidadCrit,precio) VALUES ('${nombreArticulo}','${descArt}','${cantidad}','${cantidadCrit}','${precio}');`
    console.log(`Insertando en articulos: '${nombreArticulo}','${descArt}','${cantidad}','${cantidadCrit}','${precio}'`);
    return db.transaction(tx=> {tx.executeSql(insertQuery)});
}

//Obtener ARTICULOS
// export async function getArticulos(db){
//     console.log("Obteniendo articulos...")
//     const articulosLista = [];
//     const results = await db.transaction(tx => {tx.executeSql('SELECT * FROM articulo', null,
//         (txObj, resultSet) => setArticulos(resultSet.rows._array),
//         (txObj, error) => console.log(error)
//     )});
//     console.log(articulos);

//     return articulosLista;
// }