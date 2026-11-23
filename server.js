import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import connection from './db/connection.js';
import productRoutes from  './routes/productRoutes.js';


connection.then(()=> console.log('Database Connected Successfully!'))
.catch((e)=> console.log('Failed to connect with database!',e));

const app = express();
app.set("json spaces",2);
app.use(express.json());

const port = 3000;
app.get('/', (req,res)=>{

    res.send('Hello');

})

app.use('/api/products', productRoutes)



app.listen(port, ()=>{
    console.log('Server running at port: '+port);
})
