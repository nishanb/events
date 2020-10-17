var express = require('express');
var router = express.Router();
var FoodController = require('../controllers/FoodController.js');

//Use auth middleware
router.use(require('./../middlewares/validateUser'));

/*
 * GET
 */
router.get('/', FoodController.list);

/*
 * GET
 */
router.get('/:id', FoodController.show);

/*
 * POST
 */
router.post('/', FoodController.create);

/*
 * PUT
 */
router.put('/:id', FoodController.update);

/*
 * DELETE
 */
router.delete('/:id', FoodController.remove);

module.exports = router;
