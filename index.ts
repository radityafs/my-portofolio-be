import express, { Express } from "express";
import {
  AuthRoute,
  LocaleRoute,
  ArticleRoute,
  ProjectRoute,
} from "@/routes/index.route";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = express.Router();
app.use("/api/v1", api);

api.use("/auth", AuthRoute);
api.use("/locale", LocaleRoute);
api.use("/articles", ArticleRoute);
api.use("/projects", ProjectRoute);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
