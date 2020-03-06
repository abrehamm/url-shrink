const express = require("express");
const mongoose = require('mongoose');
const URL = require('./models/URLs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/urls', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", async (req, res) => {
    const urls = await URL.find();
    res.render('index', {
        urls: urls
    });
});

app.post("/", async (req, res) => {
    await URL.create({
        full: req.body.url
    });
    res.redirect('/');
});

app.get('/:shortURL', async (req, res) => {
    const url = await URL.findOne({
        short: req.params.shortURL
    });
    console.log(url);
    if (url !== null) {
        console.log('====================================');
        console.log('in');
        console.log('====================================');
        url.views++;
        url.save();
        res.redirect(url.full);
    } else {
        console.log('====================================');
        console.log('404');
        console.log('====================================');
        return res.sendStatus(404);
    }
});
app.listen(5000);