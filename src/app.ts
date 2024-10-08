import express from "express";

import indexRouter from "./routes";
import { checkPass } from "./middlewares/check-pass";

const app = express();

app.use("/", checkPass, indexRouter);

export default app;
