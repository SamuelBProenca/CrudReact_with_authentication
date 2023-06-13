var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

//rota para autenticar o usuário
router.post('/login',(req,res) =>{
  let dadosUsuario = req.body;

  if(dadosUsuario.usuario=='admin' && dadosUsuario.senha=='123456'){
    const token = sha1(new Date());
    req.session.token = token;
    res.status(200).json({token : token});
  }else{
    res.status(200).json({message: "Usuário e/ou senha inválidos!"});
  }
});

router.post('/logout',(req,res)=>{
  req.session.destroy();
  res.status(200).json({message: 'ok'});
});

module.exports = router;
