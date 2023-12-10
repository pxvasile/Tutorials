const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
  
        try {
            const userData = verifyToken(token);
            req.user = userData;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
    }
}
    next();
} // тук има 3 Варианта 
// 1. Има cookie, което е token
// 2. Няма cookie, което е token
// 3. Има cookie, което не е валидно  - тук не трябва да викаме next();
// Tрябва да покрием и трите варианта