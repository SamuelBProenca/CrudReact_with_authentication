var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Rota de autenticação/login
router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('users');

    const user = await collection.findOne({ username });

    if (user && user.password === password) {
      const token = sha1(new Date());
      req.session.token = token;
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: 'Usuário e/ou senha inválidos!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro na autenticação, por favor tente novamente mais tarde', type: 'error' });
  } finally {
    await client.close();
  }
});

// Rota de logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logout realizado com sucesso' });
});

// Rota de cadastro de usuário
router.post('/register', async (req, res) => {
  let { username, password, email } = req.body;

  try {
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('users');

    // Verifica se o usuário já existe no banco de dados
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: 'Usuário já existe. Por favor, escolha outro nome de usuário.' });
      return;
    }

    // Cria um novo usuário
    const newUser = {
      username,
      password,
      email
    };

    // Insere o novo usuário no banco de dados
    const result = await collection.insertOne(newUser);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro no cadastro de usuário, por favor tente novamente mais tarde', type: 'error' });
  } finally {
    await client.close();
  }
});

// Função de middleware para verificar se o token é válido
function validaToken(req, res, next) {
  const token = req.headers['authorization'];

  if (typeof token !== 'undefined' && token === req.session.token) {
    next(); // Token válido, continua para a próxima rota
  } else {
    res.status(401).json({ message: 'Acesso não autorizado.' });
  }
}

// Rota protegida que requer autenticação
router.get('/protegida', validaToken, (req, res) => {
  res.status(200).json({ message: 'Rota protegida. Acesso autorizado.' });
});


module.exports = router;
