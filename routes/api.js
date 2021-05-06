const router = require("express").Router();
const config = require('../api/config');

router.get('/config', config);

module.exports = router;