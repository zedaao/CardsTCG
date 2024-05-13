import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  static instance;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createProduct({ name, description, price, type, imageUrl }) {
    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        type,
        imageUrl,
      },
    });

    return product;
  }

  async getProducts() {
    const product = await this.prisma.product.findMany();
    return product;
  }

  async getProduct(id) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  async updateProduct({ id, name, description, price, type, imageUrl }) {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        type,
        imageUrl,
      },
    });
    return product;
  }

  async deleteProduct(id) {
    await this.prisma.product.delete({ where: { id } });
  }
}
