function parseError(error) {
    if (error.name == "ValidationError") {
        return Object.values(error.errors).map(value => value.message); // Изваждаме грешката, която е подадена 
        //като рестрикция в userSchema в username
    } else {
        return error.message.split('\n'); // mongoose има свойство errors, като в прототипа има message
    }
}

module.exports = {
    parseError
}