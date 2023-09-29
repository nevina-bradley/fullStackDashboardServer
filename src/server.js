const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/villagers', (req, res) => {
    const apiUrl = 'http://acnhapi.com/v1/villagers';

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error('Error: ', error);
        res.status(500).json({ error: 'An error occurred' });
    });
});