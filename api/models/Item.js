const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    price: {
        type: String,
        require: true,
    },
    categorie: {
        type: String,
        require: true
    }
    //customization options
})

module.exports = mongoose.model("Item", itemSchema);