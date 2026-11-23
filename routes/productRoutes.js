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
        res.status(400).json({ message: e.message });
    }

});

router.get('/:id', async(req, res)=>{
    try{
        const response = await Product.findById({_id:req.params.id});
    if(! response){
        return res.status(404).json({ message: "Product with "+ req.params.id+" not found!" });
    }

    res.json(response);
    }catch(e){
        res.status(400).json({ message: e.message });
    }
    
});


router.put('/:id',async(req, res)=>{
    try{
        const response = await Product.findByIdAndUpdate({_id:req.params.id}, req.body,{new:true});
        res.status(200).json(response);
    }catch(e){
        return res.status(404).json({ message: "no product found to update" });
    }
})

export default router;