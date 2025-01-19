import prisma from "../prisma";
import { ZodError } from "zod";
import { updateProjectLink } from "../urls";
import { getRepo } from "../github";
import typesense from "../typesense";
import { authProject } from "./auth";
import { getProject } from "./get-project";
import { FormResponse, editProjectSchema } from "./utils";

export async function editProject(
  _prevState: any,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { name, description, github, website, projectId } =
      editProjectSchema.parse({
        name: data.get("name"),
        description: data.get("description"),
        github: data.get("github"),
        website: data.get("website"),
        projectId: data.get("projectId"),
      });

    await authProject({ projectId });

    const props = await getProject({ id: projectId });

    if (props.githubLink.url !== github) {
      const githubExists = await prisma.link.findUnique({
        where: { url: github },
      });

      if (githubExists) {
        throw new ZodError([
          {
            path: ["github"],
            code: "custom",
            message: "This GitHub repository is already submitted",
          },
        ]);
      }

      const githubData = await getRepo(github);

      if (!githubData.name) {
        throw new ZodError([
          {
            path: ["github"],
            code: "custom",
            message: "Invalid GitHub repository",
          },
        ]);
      }

      await updateProjectLink({
        id: props.githubLink.id,
        url: github,
      });
    }

    if (website && props.websiteLink?.url !== website) {
      // サイトのURLが変更された場合
      if (props.websiteLink) {
        // 既存のWebsiteリンクを更新
        await updateProjectLink({
          id: props.websiteLink.id,
          url: website,
        });
      } else {
        // 新しいWebsiteリンクを作成
        await prisma.link.create({
          data: {
            type: "WEBSITE",
            url: website,
            projectId,
          },
        });
      }
    }

    if (props.name !== name || props.description !== description) {
      await Promise.all([
        prisma.project.update({
          where: { id: projectId },
          data: {
            name,
            description,
          },
        }),
        typesense()
          .collections("projects")
          .documents(projectId)
          .update({ name, description }),
      ]);
    }

    return {
      status: "success",
      message: "Project updated successfully",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }
    return {
      status: "error",
      message: e.message,
    };
  }
}
