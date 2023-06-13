/*const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'nome-do-banco-de-dados';

const client = new MongoClient(url);

let db;

async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Conexão com o banco de dados estabelecida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

function getDb() {
  return db;
}

async function close() {
  await client.close();
  console.log('Conexão com o banco de dados encerrada.');
}

module.exports = {
  connect,
  getDb,
  close,
};
*/