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




router.get('/:id', async (req, res) => {
    try {
        const response = await Product.findById({ _id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: "Product with " + req.params.id + " not found!" });
        }

       return res.json(response);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});





router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.max(1, Number(limit) || 10);
    const skip =(currentPage -1)*perPage;
    try {
        if (req.query.category) {
            const result = await Product.find({ category: req.query.category.trim() }).collation({ locale: 'en', strength: 2 }).skip(skip).limit(perPage).lean();
            if (result.length===0) {
                return res.status(404).json({ message: `Product with category` + req.query.category + 'not found' });
            }
            return res.status(200).json(result);
        }


        const hasminPrice = req.query.minPrice != null && req.query.minPrice !== "";
        const hasmaxPrice = req.query.maxPrice != null && req.query.maxPrice !== "";
        if (hasmaxPrice || hasminPrice) {
            const price = {};
            if (hasminPrice) {
                const min = Number(req.query.minPrice);
                if (Number.isNaN(min)) {
                    return res.status(400).json({ message: 'minPrice must be a valid number' });
                }

                price.$gte = Number(min);

            }

            if (hasmaxPrice) {
                const max = Number(req.query.maxPrice);
                if (Number.isNaN(max)) {
                    return res.status(400).json({ message: 'maxPrice must be a valid number' });
                }
                price.$lte = Number(max);
            }
            const result = await Product.find({ price: price }).skip(skip).limit(perPage).lean();
            if (result.length === 0) {
                return res.status(404).json({ message: "Product not found!" });
            }
            return res.status(200).json(result);

        }
        if (req.query.sortBy) {
            const sort = {}
            if (req.query.sortBy === "price_asc") {
                sort.price = 1;
            } else if (req.query.sortBy === "price_desc") {
                sort.price = -1;
            }

            const sortResponse = await Product.find().sort(sort).skip(skip).limit(perPage).lean();
            return res.status(200).json(sortResponse);
        }
       
        const response = await Product.find({}).skip(skip).limit(perPage).lean();
        if (response.length===0) {
            return res.status(404).json({ message: "No Products found" });
        }
        return res.status(200).json(response);


    } catch (e) {
        res.status(400).json({ message: e.message });
    }


})

router.put('/:id', async (req, res) => {
    try {
        const response = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "no product found to update" });
        }
        res.status(200).json({ message: "Product updated successfully", response });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const response = await Product.findByIdAndDelete({ _id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: "no product found to be deleted" });
        }
        res.status(200).json({ message: "Product deleted successfully", response });


    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
})

export default router;