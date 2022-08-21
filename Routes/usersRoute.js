const {Router} = require('express');

const usersRouter = Router();

usersRouter.get('/readers',);
usersRouter.get('/writers',);
usersRouter.post('/login',);
usersRouter.get('/signup',);
usersRouter.put('/updateUserInfo/:id',);
usersRouter.delete('/deleteUser/:id',);
usersRouter.put('/deactivateWriter/:id',);

module.exports = {usersRouter}