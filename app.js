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

app.get('/read', async (req, res) => {
    try {
        let allusers = await userModel.find();
        res.render('read', { allusers: allusers });
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

app.post('/create',async (req,res)=>{
    let{name,email,image} = req.body;

   let createuser = await userModel.create({
        name,                   //because both name same
        email,
        image
    });
    res.redirect('/read');
});

app.get('/delete/:id' , async (req,res)=>{
   let users = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect('/read');
});

const PORT = 3001;
app.listen(PORT , ()=>{
    console.log(`server started at http://localhost:${PORT}`);
});