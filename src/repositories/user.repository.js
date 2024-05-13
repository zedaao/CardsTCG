import { PrismaClient } from "@prisma/client";

export class UserRepository {
  static instance;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser({ name, email, password }) {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async updateUser({ id, name, email, password }) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async getUser(id) {
    const user = await this.prisma.user.findUnique({ where: id });
    return user;
  }

  async deleteUser(id) {
    await this.prisma.user.delete({ where: { id } });
  }

  async getUsrByEmail(email) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
}
