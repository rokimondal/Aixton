import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import connect from './db/db.js';


const app = express();

connect();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/users', userRoutes);

app.use('/', (req, res) => {
    res.send("Hlw Guys");
})


export default app;