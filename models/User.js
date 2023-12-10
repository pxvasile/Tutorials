const { Schema, model } = require('mongoose');

//TODO add User properties and validation according to assignment
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long'] }, // required e валидация
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, { // това ни позволява да добавим unique
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;