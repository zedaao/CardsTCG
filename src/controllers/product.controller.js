import { ProductRepository } from "../repositories/product.repository.js";

export class ProductController {
  static instance;
  constructor() {
    this.repository = new ProductRepository();
  }

  getAllProduct = async (req, res) => {
    const allProduct = await this.repository.getProducts();
    return res.json(allProduct);
  };

  getProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = await this.repository.getProduct(id);
    return res.json(product);
  };

  createTaskProduct = async (req, res) => {
    const productData = req.body;
    const createdProduct = await this.repository.createProduct(productData);
    return res.json(createdProduct);
  };

  updateTaskProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;

    const taskUpdated = await this.repository.updateProduct({ id, ...product });
    return res.json(taskUpdated);
  };

  deleteTaskProduct = async (req, res) => {
    const id = Number(req.params.id);
    await this.repository.deleteProduct(id);

    return res.json({ ok: true });
  };
}
