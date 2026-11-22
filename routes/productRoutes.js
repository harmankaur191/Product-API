import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json(newProduct);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }

});

router.get('/', async (req, res) => {
    try {
        const response = await Product.find({});
        if (!response) {
            return res.status(404).json({ message: "No Products found" });
        }
        res.json(response);
    } catch (e) {
        console.log(e);
    }

});

export default router;