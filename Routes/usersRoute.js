const {Router} = require('express');
const {getReaders, getWriters, readerLogin, writerLogin, readerSignUp, WriterSignUp, deleteReader, deactivateWriter, activateWriter} = require('../Controllers/userController');

const usersRouter = Router();

usersRouter.get('/readers',getReaders);
usersRouter.get('/writers',getWriters);
usersRouter.post('/readerLogin',readerLogin);
usersRouter.post('/writerLogin', writerLogin);
usersRouter.post('/readerSignup',readerSignUp);
usersRouter.post('/WriterSignup',WriterSignUp);
/* ToDo: usersRouter.put('/updateUserInfo/:id',); */
usersRouter.delete('/deleteReader/:readerId',deleteReader);
usersRouter.put('/deactivateWriter/:writerId',deactivateWriter);
usersRouter.put('/activateWriter/:writerId',activateWriter);

module.exports = {usersRouter}