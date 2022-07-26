const express = require('express');
const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
  res.send('Router page');
});

module.exports = globalRouter;