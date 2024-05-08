import { Router } from "express";
import {
  getProjects,
  getProject,
  createProjects,
  updateProjects,
  deleteProjects,
  getStacks,
  createStacks,
} from "@/controllers/projects.controllers";

import { multiUpload } from "@/middleware/uploadPhoto.middleware";
import authenticated from "@/middleware/authenticated.middleware";

const router = Router();
router.get("/stacks", getStacks);
router.post("/stacks", createStacks);
router.get("/", getProjects);
router.get("/:slug", getProject);
router.post("/", authenticated, multiUpload, createProjects);
router.put("/:id", authenticated, multiUpload, updateProjects);
router.delete("/:id", authenticated, deleteProjects);

export default router;
