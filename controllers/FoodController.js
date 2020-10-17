var FoodModel = require('../models/FoodModel.js');

/**
 * FoodController.js
 *
 * @description :: Server-side logic for managing Foods.
 */
module.exports = {
    /**
     * FoodController.list()
     */
    list: function (req, res) {
        FoodModel.find(
            { UserId: req.user_id },
            { _id: 1, name: 1, calories: 1, intake: 1, createdAt: 1 },
            function (err, Foods) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Food.',
                        error: err,
                    });
                }
                return res.json(Foods);
            }
        );
    },

    /**
     * FoodController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        FoodModel.findOne(
            { _id: id, UserId: req.user_id },
            { _id: 1, name: 1, calories: 1, intake: 1, createdAt: 1 },
            function (err, Food) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Food.',
                        error: err,
                    });
                }
                if (!Food) {
                    return res.status(404).json({
                        message: 'No such Food',
                    });
                }
                return res.json(Food);
            }
        );
    },

    /**
     * FoodController.create()
     */
    create: function (req, res) {
        var Food = new FoodModel({
            name: req.body.name,
            calories: req.body.calories,
            intake: req.body.intake,
            UserId: req.user_id,
        });

        Food.save(function (err, Food) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Food',
                });
            }
            return res.status(201).json({
                _id: Food.id,
                name: Food.name,
                calories: Food.calories,
                intake: Food.intake,
            });
        });
    },

    /**
     * FoodController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        FoodModel.findOne({ _id: id, UserId: req.user_id }, function (
            err,
            Food
        ) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Food',
                });
            }
            if (!Food) {
                return res.status(404).json({
                    message: 'No such Food',
                });
            }

            Food.name = req.body.name ? req.body.name : Food.name;
            Food.calories = req.body.calories
                ? req.body.calories
                : Food.calories;
            Food.intake = req.body.intake ? req.body.intake : Food.intake;
            Food.updatedAt = Date.now();
            Food.save(function (err, Food) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Food.',
                    });
                }

                return res.json({
                    _id: Food.id,
                    name: Food.name,
                    calories: Food.calories,
                    intake: Food.intake,
                });
            });
        });
    },

    /**
     * FoodController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        FoodModel.findOneAndDelete(
            {
                $and: [({ id: id }, { UserId: req.user_id })],
            },
            function (err, Food) {
                if (err || Food == null) {
                    return res.status(500).json({
                        message: 'Error when deleting the Food.',
                    });
                }
                return res.status(200).json({ message: 'Food is deleted' });
            }
        );
    },
};
