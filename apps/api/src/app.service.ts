import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/database';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from NestJS API in Monorepo!';
  }

  async getUsers() {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
