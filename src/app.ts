import express from "express";

import indexRouter from "./routes";

import checkPass from "./middlewares/check-pass";
import errorHandler from "./middlewares/error-handler";

const app = express();

app.use("/", checkPass, indexRouter);

app.use(errorHandler);

export default app;
