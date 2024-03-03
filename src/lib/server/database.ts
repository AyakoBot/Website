import { Prisma, PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '$env/static/private';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
	try {
		const result = await next(params);
		return result;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) return null;
		throw error;
	}
});

export default prisma;
