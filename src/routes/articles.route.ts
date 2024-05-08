import { Router } from "express";
import {
  createArticles,
  getArticle,
  getArticles,
  updateArticles,
  deleteArticles,
} from "@/controllers/articles.controllers";
import validate from "@/middleware/validator.middleware";
import {
  createArticlesSchema,
  updateArticlesSchema,
} from "@/validator/articles.validator";
import { singleUpload } from "@/middleware/uploadPhoto.middleware";
import authenticated from "@/middleware/authenticated.middleware";

const router = Router();

router.get("/", getArticles);
router.get("/:slug", getArticle);
router.post(
  "/",
  authenticated,
  singleUpload,
  validate(createArticlesSchema),
  createArticles
);
router.put(
  "/:id",
  authenticated,
  singleUpload,
  validate(updateArticlesSchema),
  updateArticles
);
router.delete("/:id", authenticated, deleteArticles);
export default router;
