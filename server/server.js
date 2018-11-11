const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })     

// const Deck = mongoose.model('decks', { name: String })


app.use(express.static(path.join(__dirname, '..', 'public')));

// app.get('/api/dashboard', (req, res) => {
//     Deck.find((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 message: 'unknown error'
//             });
//         }
//         return res.status(200).json(data);
//     })
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));