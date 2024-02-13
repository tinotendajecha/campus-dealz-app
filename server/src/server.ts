import express, { Application } from 'express'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//import {models} from "./Configurations/dbconfig";
import { notFound, errorHandler } from './Middlewares/errorMiddleware';
import userRoutes from './routes/UserRoutes';
dotenv.config();
const port = process.env.PORT;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on ${port}`));

  

