import { Request, Response } from "express";
import response from "../utils/response.util";
import prisma from "@/database/mysql.database";
import { stringToSlug } from "@/utils/stringToSlug.util";
import fs from "fs";
import path from "path";

export const createProjects = async (req: Request, res: Response) => {
  let { name, description, images, url, type, stacks } = req.body;

  try {
    const stackJson = JSON.parse(stacks);

    const stackProject = await prisma.stack.findMany({
      where: {
        uid: {
          in: stackJson,
        },
      },
    });

    const Projects = await prisma.project.create({
      data: {
        slug: stringToSlug(name),
        name,
        description,
        url,
        type,
        images: {
          createMany: {
            data: images.map((image: string) => ({
              image,
            })),
          },
        },
        stacks: {
          createMany: {
            data: stackProject.map((stack: any) => ({
              stackId: stack.id,
            })),
          },
        },
      },
    });

    return response.success(res, "Create Projects success", Projects);
  } catch (error: any) {
    images.forEach((image: string) => {
      fs.unlinkSync(path.join(__dirname, "../../public", image));
    });

    return response.failed(res, error, 500);
  }
};

export const createStacks = async (req: Request, res: Response) => {
  let { name, image, type } = req.body;

  try {
    const stacks = await prisma.stack.create({
      data: {
        name,
        image,
        type,
      },
    });

    return response.success(res, "Create Stacks success", stacks);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const getStacks = async (_: Request, res: Response) => {
  try {
    const stacks = await prisma.stack.findMany();

    return response.success(res, "Get Stacks success", stacks);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const getProjects = async (_: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
        stacks: {
          select: {
            stack: true,
          },
        },
      },
    });

    return response.success(res, "Get Projects success", projects);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const getProject = async (req: Request, res: Response) => {
  let { slug } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        images: true,
        stacks: {
          select: {
            stack: true,
          },
        },
      },
    });

    if (!project) {
      return response.failed(res, "Project not found", 404);
    }

    return response.success(res, "Get Project success", project);
  } catch (error: any) {
    return response.failed(res, error, 500);
  }
};

export const updateProjects = async (req: Request, res: Response) => {
  let { name, description, images, url, type, stacks } = req.body;
  let { id } = req.params;

  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        uid: id,
      },
      include: {
        images: true,
      },
    });

    if (images) {
      await prisma.projectImage.deleteMany({
        where: {
          projectId: project.id,
        },
      });

      project.images.forEach((image: any) => {
        fs.unlinkSync(path.join(__dirname, "../../public", image.image));
      });

      await prisma.projectImage.createMany({
        data: images.map((image: string) => ({
          projectId: project.id,
          image,
        })),
      });
    }

    if (stacks) {
      const stackJson = JSON.parse(stacks);

      const stackProject = await prisma.stack.findMany({
        where: {
          uid: {
            in: stackJson,
          },
        },
      });

      await prisma.project.update({
        where: {
          uid: id,
        },
        data: {
          stacks: {
            deleteMany: {},
            set: stackProject.map((stack: any) => ({
              id: stack.id,
            })),
          },
        },
      });
    }

    await prisma.project.update({
      where: {
        uid: id,
      },
      data: {
        slug: name !== project.name ? stringToSlug(name) : project.slug,
        name,
        description,
        url,
        type,
      },
    });

    return response.success(res, "Update Projects success");
  } catch (error: any) {
    console.log(error);

    images.forEach((image: string) => {
      fs.unlinkSync(path.join(__dirname, "../../public", image));
    });

    return response.failed(res, error, 500);
  }
};

export const deleteProjects = async (req: Request, res: Response) => {
  let { id } = req.params;

  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        uid: id,
      },
      include: {
        images: true,
      },
    });

    project.images.forEach((image: any) => {
      fs.unlinkSync(path.join(__dirname, "../../public", image.image));
    });

    await prisma.project.delete({
      where: {
        uid: id,
      },
    });

    return response.success(res, "Delete Projects success");
  } catch (error: any) {
    console.log(error);
    return response.failed(res, error, 500);
  }
};
