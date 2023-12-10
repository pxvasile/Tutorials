const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'q390ffdsfsfsfsaefvfgsa';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    return createSession(user);
} 

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword); // това се явява predicate, връща true или false 

    if (hasMatch == false) {
        throw new Error('Incorrect username or password');
    }

     return createSession(user);
}


function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };

    return jwt.sign(payload, JWT_SECRET);
} 

// създаваме сесията и я връщаме, така ще накараме да работи сървиса. Потребителя изпраща 
// заявка към action-a на контролера, той подава username и password на service, той върши работата,
// ако има проблем ще хвърли грешка. Това което връща е cookie, което контролера ще каже да се запази,
// и ще редиректне към homePage.
// трябва да се погледне в заданието дали регистрацията логва потребителя или ние ще го накараме да се логне ръчно, т.е. да се препрати към login
// TODO see assignment if registration creates user session

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken
}