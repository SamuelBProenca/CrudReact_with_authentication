const {MongoClient, ObjectId} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const express = require('express');
const router = express.Router();

function validaToken(req,res,next){
  const header = req.headers['authorization'];
  if(typeof header !== 'undefined'){
    const token = header.split(' ')[1];//quebra o valor do authorization em um array separado por espaço e lê o valor do segundo item do array (posição 1)
    if(req.session.token == token){
      next();
    }else{
      res.status(403).json({message: "Forbidden", type: "error"});
    }
  }else{
    res.status(403).json({message: "Forbidden", type: "error"});
  }
}

/*Rota de listagem padrão*/
router.get('/', validaToken, async (req, res) => {
  try{
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('produtos');
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Erro na listagem, por favor tente novamente mais tarde', type: 'error'});
  }finally{
    await client.close();
  }
});

/*Rota de listagem de categorias*/
router.get('/:categoria', validaToken, async (req, res) => {
  let categoria = req.params.categoria;
  try{
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('produtos');
    const result = await collection.find({categoria : categoria}).toArray();
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Erro na listagem da categoria selecionada, por favor tente novamente mais tarde', type: 'error'});
  }finally{
    await client.close();
  }
});

/*Rota de adição de produto*/
router.post('/add', validaToken, async (req, res) => {
  let produto = req.body;
  try{
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('produtos');
    const result = await collection.insertOne(produto);
    res.status(200).json(result.ops[0]);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Erro na adição do produto, por favor tente novamente mais tarde', type: 'error'});
  }finally{
    await client.close();
  }
});

/*Rota de edição de produtos*/
router.put('/edit/:id', validaToken, async (req, res) => {
  let id = req.params.id;
  let updatedProduct = req.body;
  try{
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('produtos');
    const result = await collection.updateOne({_id : new ObjectId(id)}, {$set: updatedProduct});
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Erro na edição do produto, por favor tente novamente mais tarde', type: 'error'});
  }finally{
    await client.close();
  }
});

/*Rota de remoção de produtos*/
router.delete('/remove/:id', validaToken, async (req, res) => {
  let id = req.params.id;
  try{
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('produtos');
    const result = await collection.deleteOne({_id : new ObjectId(id)});
    if (result.deletedCount === 1) {
        res.status(200).json({message: 'deletado com sucesso'});
    } else {
        res.status(404).json({message: 'Item não encontrado found'});
    }
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Erro na remoção do produto, por favor tente novamente mais tarde', type: 'error'});
  }finally{
    await client.close();
  }
});

// Rota de cadastro de usuário:
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    await client.connect();
    const db = client.db('marketplace-api');
    const collection = db.collection('users');
    const user = { username, password, email };
    const result = await collection.insertOne(user);
    res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro no cadastro do usuário' });
  } finally {
    await client.close();
  }
});



module.exports = router;

