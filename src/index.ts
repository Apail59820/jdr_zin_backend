import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import LoggerSingleton from "./utils/winston";

import userRoutes from './routes/userRoutes';

const app = express();
const port = 8055;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const logger = LoggerSingleton.getLogger();

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/users', userRoutes);

app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
});
