const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing'); 

mongoose.connect('mongodb+srv://FlorianOPEN2:Ankou35.@cluster0.lju0dda.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.get('/api/products', async (req, res, next) => {
    try {
        const products = await Thing.find(); 
        res.json({ products });
    } catch (error) {
        res.status(400).json({ error }); 
    }
});

app.get('/api/products/:id', async (req, res, next) => {
    try {
        const product = await Thing.findById(req.params.id); 
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Product non trouvé' });
        }
    } catch (error) {
        res.status(404).json({ error }); 
    }
});

app.post('/api/products', async (req, res, next) => {
    try {
        const newProduct = await Thing.create(req.body); 
        res.status(201).json({ product: newProduct });
    } catch (error) {
        res.status(400).json({ error }); 
    }
});

app.put('/api/products/:id', async (req, res, next) => {
    try {
        const updatedProduct = await Thing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedProduct) {
            res.json({ message: 'Modifié !' }); 
        } else {
            res.status(404).json({ error: 'Product non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error }); 
    }
});

app.delete('/api/products/:id', async (req, res, next) => {
    try {
        const deletedProduct = await Thing.findByIdAndDelete(req.params.id); 
        if (deletedProduct) {
            res.json({ message: 'Deleted!' });
        } else {
            res.status(404).json({ error: 'Product non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error }); 
    }
});

module.exports = app;