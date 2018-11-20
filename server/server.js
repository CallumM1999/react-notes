const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

const PORT = process.env.PORT || 8080;

app.use(compression())


app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));