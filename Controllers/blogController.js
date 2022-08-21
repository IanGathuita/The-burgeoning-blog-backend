const { is } = require('express/lib/request');
const mssql = require('mssql');
require('dotenv').config();
const config = require('../Config/config');

const getNewBlogs = async(req,res) => {
    await mssql.connect(config);
    const request = new mssql.Request();
    const procResult = await request.execute('dbo.sp_get_blogs');
    console.log(procResult.recordsets[0]);
    res.status(200).send('Got blogs/blogs ');
};

const getBlogComments = async(req,res) => {
    const id = req.params.id;
    await mssql.connect(config);
    const request = new mssql.Request();
    request.input('blogId',mssql.Int,1)
    const procResult = await request.execute('dbo.sp_get_comments');
    console.log(procResult.recordsets[0]);
    res.status(200).send('Got blogs/comments ');
};

const createNewBlog = async(req,res) => {
    const {title,body,tags,likes,writerId} = req.body;
    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('Title',mssql.NVarChar(100),`${title}`);
    reqest.input('Body',mssql.NVarChar,`${body}`);
    reqest.input('Tags',mssql.NVarChar,`${tags}`);
    reqest.input('Likes',mssql.Int,likes);
    reqest.input('WriterId',mssql.Int,writerId);
    const procResult = await reqest.execute('dbo.sp_create_blog');

    console.log(`Rows affected: ${procResult.rowsAffected}`);
    res.status(200).send(`Rows affected: ${procResult.rowsAffected}`);
};

const commentOnBlog = async(req,res) => {
    const {comment,commenterId} = req.body;
    const blogId = req.params.id;
    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('Comment',mssql.NVarChar(50),`${comment}`);
    reqest.input('BlogId',mssql.Int,blogId);
    reqest.input('CommenterId',mssql.Int,commenterId);
    reqest.output('res',mssql.VarChar(50));
    const procResult = await reqest.execute('dbo.sp_comment_on_blog');

    console.log(`Proc output: ${procResult.output.res}`);
    res.status(200).send(`Proc output: ${procResult.output.res}`);
};

const likeBlog = async(req,res) => {
    const blogId = req.params.blogId;
    await mssql.connect(config);
    const reqest = new mssql.Request();
    /*ToDo: Track who liked the post to avoid subsequent likes */
    reqest.input('IsLiked',mssql.Bit,0);
    reqest.input('BlogId',mssql.Int,blogId);
    reqest.output('Likes',mssql.Int);
    const procResult = await reqest.execute('dbo.sp_like_blog');

    console.log(`Proc output: ${procResult.output.Likes}`);
    res.status(200).send(`Proc output: ${procResult.output.Likes}`);
};

const updateBlog = async(req,res) => {
    const blogId = req.params.blogId;
    let {title,body,tags} = req.body;
    typeof(title) === 'undefined' && (title = '');
    typeof(body) === 'undefined' && (body = '');
    typeof(tags) === 'undefined' && (tags = '');

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('Title',mssql.NVarChar(50), `${title}`);
    reqest.input('Body',mssql.NVarChar, `${body}`);
    reqest.input('Tags',mssql.NVarChar, `${tags}`);
    reqest.input('BlogId',mssql.Int,blogId);
    const procResult = await reqest.execute('dbo.sp_update_blog');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

const deleteBlog = async(req,res) => {
    const blogId = req.params.blogId;

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('BlogId',mssql.Int,blogId);
    const procResult = await reqest.execute('dbo.sp_delete_blog');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

const deleteComment = async(req,res) => {
    const commentId = req.params.commentId;

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('CommentId',mssql.Int,commentId);
    const procResult = await reqest.execute('dbo.sp_delete_comment');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

module.exports = {getNewBlogs,getBlogComments,createNewBlog,commentOnBlog,likeBlog,updateBlog,deleteBlog,deleteComment};