const Task = require('./../model/Task');
const validation = require('./../helper/validation');

module.exports = {
    //Create Task
    createTask: async (req, res) => {
        const error = validation.validateTaskCreation(req.body).error;
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        const newTask = new Task({
            title: req.sanitize(req.body.title),
            description: req.sanitize(req.body.description),
            dueDate: req.sanitize(req.body.dueDate),
            UserId: req.user_id,
        });

        newTask.title = req.body.title;

        try {
            await newTask.save();
            return res.status(200).json({
                id: newTask._id,
                message: 'Task created successfully',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send();
        }
    },

    //Read Single Task
    readTask: async (req, res) => {
        const taskId = req.sanitize(req.params.id);

        try {
            const task = await Task.find(
                {
                    $and: [
                        { _id: taskId },
                        { UserId: req.sanitize(req.user_id) },
                    ],
                },
                {
                    _id: 1,
                    title: 1,
                    description: 1,
                    currentStatus: 1,
                    dueDate: 1,
                }
            );

            if (task.length == 0) {
                return res.staus(403).json({ error: 'task not found' });
            }

            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).json({ error: 'inavlid does not exists' });
        }
    },

    //Read All task
    readAllTask: async (req, res) => {
        try {
            const tasks = await Task.find(
                {
                    UserId: req.sanitize(req.user_id),
                },
                {
                    _id: 1,
                    title: 1,
                    description: 1,
                    currentStatus: 1,
                    dueDate: 1,
                }
            );
            return res.status(200).send(tasks);
        } catch (err) {
            console.log(error);
            return res.status(400).send();
        }
    },

    //Update Task
    updateTask: async (req, res) => {
        const taskId = req.sanitize(req.params.id);

        //check task belongs to user
        try {
            const task = await Task.findOne({
                $and: [{ _id: taskId }, { UserId: req.sanitize(req.user_id) }],
            });
            if (task == null) throw new Error();
        } catch (err) {
            return res.status(403).json({ error: 'Task does not exists' });
        }

        //Input validation
        const error = validation.validateTaskUpdation(req.body).error;
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        //update task
        try {
            await Task.updateOne(
                { _id: taskId },
                {
                    title: req.sanitize(req.body.title),
                    description: req.sanitize(req.body.description),
                    dueDate: req.sanitize(req.body.dueDate),
                    currentStatus: req.sanitize(req.body.status),
                }
            );

            return res.status(200).json({ message: 'Task updated' });
        } catch (err) {
            console.log(err);
        }
    },

    //Delete Task
    deleteTask: async (req, res) => {
        const taskId = req.sanitize(req.params.id);

        //check task belongs to user
        try {
            const task = await Task.findOne({
                $and: [{ _id: taskId }, { UserId: req.sanitize(req.user_id) }],
            });
            if (task == null) throw new Error();
        } catch (err) {
            return res.status(403).json({ error: 'Inavlid Operation' });
        }

        //delete task
        try {
            await Task.deleteOne({ _id: taskId });
            return res.status(200).json({ error: 'Task deleted' });
        } catch (error) {
            return res.status(403).json({ error: 'Inavlid Operation' });
        }
    },
};
