import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate:{
            validator: function(value){
                return value > 0;
            }, message: 'Price must be greater than 0'
        }

    },
    category: {
        type: String,
        required: true
    },

    inStock: {
        type: Boolean,
        default: true
    },
    tags:{
        type: [String],

    },
    createdAt:{
        type: Date,
        default: ()=>Date.now(),
        immutable:true
    }

});

const Product = mongoose.model('Product', productSchema);
export default Product;