const express = require('express');
const path = require('path');
const userModel = require('./models/user')

const app = express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index'); 
});

//for read user
app.get('/read', async (req, res) => {
    try {
        let allusers = await userModel.find();
        res.render('read', { allusers: allusers });
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

//for create user
app.post('/create',async (req,res)=>{
    let{name,email,image} = req.body;

   let createuser = await userModel.create({
        name,                   //because both name same
        email,
        image
    });
    res.redirect('/read');
});

//for delete user
app.get('/delete/:id' , async (req,res)=>{
   let users = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect('/read');
});

//for edit user
app.get('/edit/:id', async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.render('edit', { user });
});

//for update user
app.post('/update/:id', async (req, res) => {
    let {name,email,image} = req.body;
    const user = await userModel.findOneAndUpdate({_id:req.params.id}, {name ,email,image},{new:true});
    res.redirect('/read');
});

const PORT = 3001;
app.listen(PORT , ()=>{
    console.log(`server started at http://localhost:${PORT}`);
});