import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import LoggerSingleton from "./utils/winston";

import userRoutes from "./routes/userRoutes";
const chalk = require('chalk')

const app = express();
const port = 8055;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const logger = LoggerSingleton.getLogger();

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    const statusColor = chalk.hex("#9400D3");

    logger.info(
      `${req.method} ${req.url} ${statusColor(statusCode)} - ${duration}ms`,
    );
  });

  next(); // Continue to the next middleware
});

app.use("/users", userRoutes);

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
