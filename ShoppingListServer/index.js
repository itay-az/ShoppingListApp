import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bparser from 'body-parser';
import actions from './actions.js'

const app = express();
app.use(cors())

app.use(bparser.urlencoded({extended:false}));
app.use(bparser.json());

const mongoUrl = '' // enter your mongodb url
const port = 3002;

app.use('/api', actions);


mongoose.connect(mongoUrl)
.then(results => {
    app.listen(port, function(){
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error);
})
