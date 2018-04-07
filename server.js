const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'hbs');

app.use((req,res,next)=> {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=> {
        if(err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});

app.use((req,res,next)=> {
    res.render('maintenance');
})

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})


app.get('/', (req, res)=> {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: "Bob",
    //     likes: [
    //         "biking",
    //         "hiking"
    //     ]
    // });
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMsg: "Welcome to the home page!"
    })
});

app.get('/about', (req,res)=> {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res)=> {
    res.send({
        errorMessage: 'Unable to render this route'
    })
});

app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});