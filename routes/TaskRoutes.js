const router = require('express').Router();
const TaskController = require('../controllers/TaskController');

router.use(require('./../middlewares/validateUser'));

//CREATE
router.post('/', (req, res) => {
    TaskController.createTask(req, res);
});

//READ
router.get('/', (req, res) => {
    TaskController.readAllTask(req, res);
});

//READ Single
router.get('/:id', (req, res) => {
    TaskController.readTask(req, res);
});

//UPDATE
router.put('/:id', (req, res) => {
    TaskController.updateTask(req, res);
});

//DELETE
router.delete('/:id', (req, res) => {
    TaskController.deleteTask(req, res);
});

module.exports = router;
