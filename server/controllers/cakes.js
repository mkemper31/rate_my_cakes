const mongoose = require('mongoose');
const Cake = mongoose.model('Cake')
module.exports = {
    all: async (req, res) => {
        try {
            const cakes = await Cake.find();
            res.json({cakes: cakes});
        }
        catch (err) {
            res.json(err);
        }
    },
    one: async (req, res) => {
        let cake = await Cake.findById({ _id : req.params.id });
        Cake.findById({ _id : req.params.id })
            .then((data) => {
                res.json({cake: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        const cake = new Cake(req.body);
        cake.save()
            .then((data) => {
                res.json({newCake: data});
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Cake.updateOne({ _id : req.params.id }, req.body)
            .then((data) => {
                res.json({updatedCake: data});
            })
            .catch(err => res.json(err));
    },
    delete: async (req, res) => {
        Cake.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            }) ;
    },
}
