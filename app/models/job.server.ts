import type { User, Job } from "@prisma/client";

import { prisma } from "~/db.server";
import { Company } from "@faker-js/faker/modules/company";

export type { Job } from "@prisma/client";

export function getJob({
  id,
  userId,
}: Pick<Job, "id"> & {
  userId: User["id"];
}) {
  return prisma.job.findFirst({
    select: { id: true, description: true, title: true },
    where: { id, userId },
  });
}

export function getJobListItems() {
  return prisma.job.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      location: true,
      contractType: true,
      contractLength: true,
      user: true,
      company: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createJob({
  description,
  title,
  userId,
  companyId,
  location,
  contractType,
  contractLength,
}: Pick<Job, "description" | "title" | "location" | "contractLength" | "contractType"> & {
  userId: User["id"];
  companyId: Company["id"];
}) {
  return prisma.job.create({
    data: {
      title,
      description,
      location,
      contractType,
      contractLength,
      user: {
        connect: {
          id: userId,
        },
      },
      company: {
        connect: {
          id: companyId,
        },
      },
    },
  });
}

export function deleteJob({
  id,
  userId,
}: Pick<Job, "id"> & { userId: User["id"] }) {
  return prisma.job.deleteMany({
    where: { id, userId },
  });
}
