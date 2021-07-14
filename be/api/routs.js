const express = require('express');
const router = express.Router();

const getDataAttractions = require('./getAttractions/getAttractions.route');

const routes = (server, logger) => {

  /*** APPLICATION API ***/
  router.use('/getData', getDataAttractions);

  /*** ERROR HANDLING ***/
  server.route('/error').post((req) => {
    logger.error(JSON.stringify(req.body), req);
  });
  /*** ERROR HANDLING ***/

  return router;
};

module.exports = routes;