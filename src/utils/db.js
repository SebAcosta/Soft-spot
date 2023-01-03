import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// Para poder trabajar con promesas
enablePromise(true);
//Nombre de la base de datos
const MY_DATABASE = 'soft-spot.db';


//Creamos conexión
export async function getDbConnection(){
    const db = await openDatabase({name: MY_DATABASE, location: 'default'});
    return db;
}

//Creamos las tablas
export async function createTables(db){
    const query = `CREATE TABLE IF NOT EXIST articulo (idArticulo int PRIMARY KEY AUTOINCREMENT, nombreArticulo varchar(50), 
    descArt varchar(200), cantidad int(3), cantidadCrit int(3), precio double(6,2));`;
    console.log("Tabla Artículos creada")
    return db.executeSql(query);
}

//Inicializamos la BD
export async function initDatabase(){
    const db = await getDbConnection();
    await createTables(db);
    db.close();
}

//Inserts para ARTICULOS
export async function insertArticulo(db, nombreArticulo, descArt, cantidad, cantidadCrit, precio){
    const insertQuery = `INSERT INTO articulo (nombreArticulo,descArt,cantidad,cantidadCrit,precio) 
    VALUES ('${nombreArticulo}','${descArt}','${cantidad}','${cantidadCrit}','${precio}');`
    console.log(insertQuery);
    return db.executeSql(insertQuery);
}
//Obtener ARTICULOS
export async function getArticulos(db){
    const articulos = [];
    const results = await db.executeSql('SELECT * FROM articulo');
    results.forEach(function (resultSet) {
        for(let index =0;index<resultSet.rows.length; index++){
            articulos.push(resultSet.rows.item(index));
        }
    });
    return articulos;
}