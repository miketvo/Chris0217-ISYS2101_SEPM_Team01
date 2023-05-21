const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypageController');

router.get('/', mypageController.getUserInfo);
router.post('/', mypageController.handleEdit);

module.exports = router;