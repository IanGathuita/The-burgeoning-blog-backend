const {Router} = require('express');
const {getNewBlogs,getBlogComments,createNewBlog,commentOnBlog, likeBlog, updateBlog, deleteBlog, deleteComment} = require('../Controllers/blogController');
const {verifyToken} = require('../Middleware/authentication');


const blogsRouter = Router();

blogsRouter.get('/new',verifyToken, getNewBlogs);
blogsRouter.get('/comments/:id', getBlogComments);
blogsRouter.post('/newBlog', createNewBlog );
blogsRouter.post('/comment/:blogId',commentOnBlog);
blogsRouter.post('/like/:blogId', likeBlog );
blogsRouter.put('/updateBlog/:blogId',updateBlog );
blogsRouter.delete('/deleteBlog/:blogId', deleteBlog);
blogsRouter.delete('/deleteComment/:commentId', deleteComment );

module.exports = {blogsRouter};