const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://patrickresplandes87:pipocafrita@cluster0.s8indxb.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.export = mongoose;