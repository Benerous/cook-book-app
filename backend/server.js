import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import recipeRoute from './routes/recipeRoute';
import path from 'path';

dotenv.config();

const mongodbURL = config.MONGODB_URL; // local MongoDB 

///////////// Cloud MongoDB /////////////
// const mongodbURL = 'mongodb+srv:Benerous:##########@benerous.unqyu.mongodb.net/cook-book-db?retryWrites=true&w=majority';

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/recipes", recipeRoute);

//

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join('${__dirname}/../frontend/build/index.html')));

app.listen(config.PORT, () => {console.log(`Server started at ${config.PORT}`)});