function parseError(error) {
    if (error.name == "ValidationError") {
        return Object.values(error.errors).map(value => value.message);
    } else if (Array.isArray(error)) {
        return error.map(x => x.msg);
    } else {
        return error.message.split('\n'); // mongoose има свойство errors, като в прототипа има message
    }
}

module.exports = {
    parseError
}