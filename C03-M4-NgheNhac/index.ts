import express from 'express';
import bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";
import router from "./src/router/Router";
import cors from 'cors'

const app = express();

AppDataSource.initialize().then(() => {
    console.log('Connect database success')
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your client's origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router)
app.listen(3000, () => {
    console.log('Server is running')
})

//npm i -D typescript tsc tsc-watch rimraf @types/express
//npm run start:dev
