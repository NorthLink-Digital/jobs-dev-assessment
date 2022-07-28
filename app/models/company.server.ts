import { prisma } from '~/db.server';

export function getCompaniesWithUserId(userId: string) {
  return prisma.company.findMany({
    where: {
      users: {
        some: {
          id: userId
        }
      }
    },
    include: {
      users: true
    }
  });
}

export function getCompanyData(companyId: string) {
  return prisma.company.findUnique({
    where: {
      id: companyId
    },
    include: {
      jobs: true
    }
  });
}