const express = require("express");
const app = express();
const { resolve } = require('path');
const { port } = require(resolve('src', 'config'));
const consign = require('consign');
const cors = require('cors');
const { sequelize } = require(resolve('src', 'app', 'models'));

app.use(cors());
app.use(express.json());

consign()
  .include('src/controllers')
  .into(app);

new Promise(async (resolve, reject)=>{
  try {
      resolve(await sequelize.authenticate());
      } catch (error) {
      reject(error);
  }
})
  .then(()=>{
      console.log('A conexão com o banco de dados foi estabelecida com sucesso.');
      app.listen(port, ()=>console.log(`Application running at port ${port}`));
  })
  .catch(error=>console.error('Não foi possível conectar ao banco de dados:', error));