const mongoose = require('mongoose');
const CakeSchema = new mongoose.Schema({
    baker: { type: String, required: true },
    imgurl: { type: String, required: true },
    comments: [{
        text: { type: String, default: '' },
        rating: { type: Number, default: 5 }
    }],
}, {timestamps: true });
mongoose.model('Cake', CakeSchema);
