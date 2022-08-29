const mssql = require('mssql');
require('dotenv').config();
const config = require('../Config/config');
const {generateToken} = require('../Middleware/authentication');

const getReaders = async (req,res) => {
    await mssql.connect(config);
    const request = new mssql.Request();
    const procResult = await request.execute('dbo.sp_get_readers');

    console.log(procResult.recordset);
    res.send(procResult.recordset);
}

const getWriters = async (req,res) => {
    await mssql.connect(config);
    const request = new mssql.Request();
    const procResult = await request.execute('dbo.sp_get_writers');

    console.log(procResult.recordset);
    res.send(procResult.recordset);
}

const readerLogin = async (req,res) => {
    /*ToDo: validate inputs */
    const {email,password} = req.body;
    await mssql.connect(config);
    const request = new mssql.Request();
    request.input('Email', mssql.NVarChar,`${email}`);
    const procResult = await request.execute('dbo.sp_get_a_reader');

    if(procResult.recordset.length > 0){
        const reader = procResult.recordset[0];
        if(reader.Password === password){
            res.send("valid");
        }
        else{
            res.send("invalid password");
        }
    }
    else{
        res.send("This email is not registered");
    }

}

const writerLogin = async (req,res) => {
    /*ToDo: validate inputs */
    const {email,password} = req.body;
    await mssql.connect(config);
    const request = new mssql.Request();
    request.input('Email', mssql.NVarChar,`${email}`);
    const procResult = await request.execute('dbo.sp_get_a_writer');

    if(procResult.recordset.length > 0){
        const writer = procResult.recordset[0];
        if(writer.Password === password){
            let token = generateToken(writer);
            res.cookie("jwt",token,{maxAge:1000000});
            res.send("valid");
        }
        else{
            res.send("invalid password");
        }
    }
    else{
        res.send("This email is not registered");
    }

}



const readerSignUp = async (req,res) => {
    /*ToDo: validate inputs */
    const {firstName,lastName,email,password,interests} = req.body;
    await mssql.connect(config);
    const request = new mssql.Request();
    request.input('FirstName', mssql.NVarChar,`${firstName}`);
    request.input('LastName', mssql.NVarChar,`${lastName}`);
    request.input('Email', mssql.NVarChar,`${email}`);
    request.input('Password', mssql.NVarChar,`${password}`);
    request.input('Interests', mssql.NVarChar,`${interests}`);
    request.output('Message', mssql.NVarChar);
    const procResult = await request.execute('dbo.sp_reader_signup');

    res.send(procResult.output.Message);      

}

const WriterSignUp = async (req,res) => {
    /*ToDo: validate inputs */
    const {firstName,lastName,email,password,phoneNumber,dateOfBirth} = req.body;
    await mssql.connect(config);
    const request = new mssql.Request();
    request.input('FirstName', mssql.NVarChar(50),`${firstName}`);
    request.input('LastName', mssql.NVarChar(50),`${lastName}`);
    request.input('Email', mssql.NVarChar(200),`${email}`);
    request.input('Password', mssql.NVarChar(200),`${password}`);
    request.input('phoneNumber', mssql.NVarChar(13),`${phoneNumber}`);
    request.input('dateOfBirth', mssql.NVarChar,`${dateOfBirth}`);
    request.output('Message', mssql.NVarChar);
    const procResult = await request.execute('dbo.sp_writer_signup');

    res.send(procResult.output.Message);      

}

const deleteReader = async(req,res) => {
    const readerId = req.params.readerId;

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('ReaderId',mssql.Int,readerId);
    const procResult = await reqest.execute('dbo.sp_delete_reader');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

const deactivateWriter = async(req,res) => {
    const writerId = req.params.writerId;

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('WriterId',mssql.Int,writerId);
    const procResult = await reqest.execute('dbo.sp_deactivate_writer');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

const activateWriter = async(req,res) => {
    const writerId = req.params.writerId;

    await mssql.connect(config);
    const reqest = new mssql.Request();
    reqest.input('WriterId',mssql.Int,writerId);
    const procResult = await reqest.execute('dbo.sp_activate_writer');

    console.log(`Proc output: ${procResult.rowsAffected}`);
    res.status(200).send(`Proc output: ${procResult.rowsAffected}`);
};

module.exports = {getReaders,getWriters,readerLogin,writerLogin,readerSignUp,WriterSignUp,deleteReader,deactivateWriter,activateWriter}


