import { Request, Response } from "express";
import response from "../utils/response.util";
import prisma from "@/database/mysql.database";
import { stringToSlug } from "@/utils/stringToSlug.util";
import fs from "fs";
import path from "path";

export const createArticles = async (req: Request, res: Response) => {
  let { title, content, image } = req.body;

  try {
    const articles = await prisma.article.create({
      data: {
        slug: stringToSlug(title),
        title,
        content,
        image,
      },
    });

    return response.success(res, "Create articles success", articles);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const getArticles = async (_: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        slug: true,
        title: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.success(res, "Get articles success", articles);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const getArticle = async (req: Request, res: Response) => {
  let { slug } = req.params;

  try {
    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!article) {
      return response.failed(res, "Article not found", 404);
    }

    return response.success(res, "Get article success", article);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const updateArticles = async (req: Request, res: Response) => {
  let { title, content, image } = req.body;
  let { id } = req.params;

  try {
    const articles = await prisma.article.findUniqueOrThrow({
      where: {
        uid: id,
      },
    });

    if (image) {
      fs.unlinkSync(path.join(__dirname, `../../public/${articles.image}`));
    }

    await prisma.article.update({
      where: {
        uid: id,
      },
      data: {
        title,
        content,
        ...(image && { image }),
      },
    });

    return response.success(res, "Update articles success");
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const deleteArticles = async (req: Request, res: Response) => {
  let { id } = req.params;

  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: {
        uid: id,
      },
    });

    fs.unlinkSync(path.join(__dirname, `../../public/${article.image}`));

    await prisma.article.delete({
      where: {
        uid: id,
      },
    });

    return response.success(res, "Delete articles success");
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};
