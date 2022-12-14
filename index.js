const http = require('http');
const https = require('https');
const express = require("express");
const app = express();
const { resolve } = require('path');
const { port, isHttps, credentials } = require(resolve('src', 'config'));
const consign = require('consign');
const cors = require('cors');
const { sequelize } = require(resolve('src', 'app', 'models'));
const { readFileSync } = require('fs');

app.use(cors());
app.use(express.json());

app.use(express.static(resolve('build')));

consign()
  .include('src/controllers')
  .into(app);

app.get('*', (req, res)=>{
  try {
      return res.status(200).sendFile(resolve('build', 'index.html'));
  } catch (error) {
      return res.status(500).json(error.message);
  }
});

let server = isHttps ? https.createServer({
  key: readFileSync(credentials.key, 'utf8'),
  cert: readFileSync(credentials.cert, 'utf8'),
  ca: readFileSync(credentials.ca, 'utf8')
}, app) : http.createServer(app);

new Promise(async (resolve, reject)=>{
  try {
      resolve(await sequelize.authenticate());
      } catch (error) {
      reject(error);
  }
})
  .then(()=>{
      console.log('A conexão com o banco de dados foi estabelecida com sucesso.');
      server.listen(port, ()=>console.log(`Application running at port ${port}`));
  })
  .catch(error=>console.error('Não foi possível conectar ao banco de dados:', error));