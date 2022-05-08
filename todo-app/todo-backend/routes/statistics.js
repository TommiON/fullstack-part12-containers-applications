const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (_, res) => {
    const todoCount = await redis.getAsync('todoCount')
    const response = {
        'added_todos': todoCount
    }
    res.send(response);

  });

module.exports = router;
