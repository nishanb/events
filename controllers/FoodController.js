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
        FoodModel.find(function (err, Foods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Food.',
                    error: err
                });
            }
            return res.json(Foods);
        });
    },

    /**
     * FoodController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        FoodModel.findOne({_id: id}, function (err, Food) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Food.',
                    error: err
                });
            }
            if (!Food) {
                return res.status(404).json({
                    message: 'No such Food'
                });
            }
            return res.json(Food);
        });
    },

    /**
     * FoodController.create()
     */
    create: function (req, res) {
        var Food = new FoodModel({
			name : req.body.name,
			calories : req.body.calories,
			intake : req.body.intake,
			createdAt : req.body.createdAt,
			updatedAt : req.body.updatedAt,
			UserId : req.body.UserId

        });

        Food.save(function (err, Food) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Food',
                    error: err
                });
            }
            return res.status(201).json(Food);
        });
    },

    /**
     * FoodController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        FoodModel.findOne({_id: id}, function (err, Food) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Food',
                    error: err
                });
            }
            if (!Food) {
                return res.status(404).json({
                    message: 'No such Food'
                });
            }

            Food.name = req.body.name ? req.body.name : Food.name;
			Food.calories = req.body.calories ? req.body.calories : Food.calories;
			Food.intake = req.body.intake ? req.body.intake : Food.intake;
			Food.createdAt = req.body.createdAt ? req.body.createdAt : Food.createdAt;
			Food.updatedAt = req.body.updatedAt ? req.body.updatedAt : Food.updatedAt;
			Food.UserId = req.body.UserId ? req.body.UserId : Food.UserId;
			
            Food.save(function (err, Food) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Food.',
                        error: err
                    });
                }

                return res.json(Food);
            });
        });
    },

    /**
     * FoodController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        FoodModel.findByIdAndRemove(id, function (err, Food) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Food.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
