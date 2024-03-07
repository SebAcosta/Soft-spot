import * as SQLite from 'expo-sqlite';

//Nombre de la base de datos
const MY_DATABASE = 'soft-spot.db';


//Creamos conexión
export function getDbConnection(){
    const db = SQLite.openDatabase({name: MY_DATABASE});
    console.log("Conectando a la BDD...")
    return db;
}

//Creamos las tablas
export function createTables(db){
    const query = `CREATE TABLE IF NOT EXISTS articulo (idArticulo INTEGER PRIMARY KEY AUTOINCREMENT, nombreArticulo VARCHAR(50), descArt VARCHAR(200), cantidad INTEGER(3), cantidadCrit INTEGER(3), precio DOUBLE(6,2))`;
    console.log("Tabla ARTICULO creada");
    return db.transaction(tx => {tx.executeSql(query)},(error)=>{console.log(error)},()=>{console.log("SE CREO CORRECTAMENTE ARTICULO")});
}

export async function createGrupos(db){
    const query = `CREATE TABLE IF NOT EXISTS grupo (idGrupo INTEGER PRIMARY KEY AUTOINCREMENT, nombreGrupo VARCHAR(50), descGrupo VARCHAR(200))`;
    console.log("Tabla GRUPO creada");
    return db.transaction(tx => {tx.executeSql(query)});
}

export async function createEtiquetas(db){
    const query = `CREATE TABLE IF NOT EXISTS etiqueta (idEtiqueta INTEGER PRIMARY KEY AUTOINCREMENT, nombreEtiqueta VARCHAR(50), descEtiqueta VARCHAR(200))`;
    console.log("Tabla ETIQUETA creada");
    return db.transaction(tx => {tx.executeSql(query)});
}

//Inicializamos la BD
export function initDatabase(){
    const db = getDbConnection();
    createTables(db);
    // createGrupos(db);
    // createEtiquetas(db);
    console.log("Base de datos lista");
    // db.closeAsync();
}

//Inserts
export function insertArticulo(db, nombreArticulo, descArt, cantidad, cantidadCrit, precio){
    // const insertQuery = `INSERT INTO articulo (nombreArticulo,descArt,cantidad,cantidadCrit,precio) VALUES ('${nombreArticulo}','${descArt}',${cantidad},${cantidadCrit},${precio});`
    // // console.log(`Insertando en ARTICULO: '${nombreArticulo}','${descArt}','${cantidad}','${cantidadCrit}','${precio}'`);
    // console.log(insertQuery);
    // return db.transaction(tx=> {tx.executeSql(insertQuery)},(error)=>{console.log(error)},()=>{console.log('Data inserted succesfully')});

    db.transaction(tx=>{
        tx.executeSql('INSERT INTO articulo (nombreArticulo,descArt,cantidad,cantidadCrit,precio) VALUES (?,?,?,?,?)',[nombreArticulo,descArt,cantidad,cantidadCrit,precio],);
    },(error)=>{
        console.log(error);
    },()=>{
        console.log('Darta inserted successfully');
    })
}

export async function insertGrupo(db, nombreGrupo, descGrupo){
    const insertQuery = `INSERT INTO grupo (nombreGrupo,descGrupo) VALUES ('${nombreGrupo}','${descGrupo}');`
    console.log(`Insertando en GRUPO: '${nombreGrupo}','${descGrupo}'`);
    return db.transaction(tx=> {tx.executeSql(insertQuery)},(error)=>{console.log(error)},()=>{console.log('Data inserted succesfully')});
}

export async function insertEtiqueta(db, nombreEtiqueta, descEtiqueta){
    const insertQuery = `INSERT INTO etiqueta (nombreEtiqueta,descEtiqueta) VALUES ('${nombreEtiqueta}','${descEtiqueta}');`
    console.log(`Insertando en GRUPO: '${nombreEtiqueta}','${descEtiqueta}'`);
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