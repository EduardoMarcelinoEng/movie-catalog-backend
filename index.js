const express = require("express");
const app = express();
const { resolve } = require('path');
const { port } = require(resolve('src', 'config'));
const consign = require('consign');
const cors = require('cors');

app.use(cors());
app.use(express.json());

consign()
  .include('src/controllers')
  .into(app);

app.listen(port, ()=>console.log(`Application running at port ${port}`));