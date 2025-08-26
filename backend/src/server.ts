import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { initDb } from "./dbInit";
import { logger } from "./middleware/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api", routes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

export default app;
