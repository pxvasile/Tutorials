const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const courseController = require("../controllers/courseController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/course', courseController);

    /* Глобален error Handling - не ни трябва
    app.get('/error', (req, res, next) => {
       // next(new Error('propagating error')); // Вариант 1 на next подаваме нещо, може и стринг
       throw new Error('propagating error'); // Вариант 2
    });
    
    app.use((err, req, res, next) => {
        console.log('Global error handlong');
        console.log(err.message);
        res.redirect('/');
    });
    */
};