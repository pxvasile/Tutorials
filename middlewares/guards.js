function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login'); // ако е нужен user, a няма user
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/'); //TODO check assigntment for correct redirect
        } else {
            next();
        }
    };
};

module.exports = {
    hasUser,
    isGuest
}