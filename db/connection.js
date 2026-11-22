import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

//connection
const connection = mongoose.connect(process.env.MONGO_URI)

export default connection;