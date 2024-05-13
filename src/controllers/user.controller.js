import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
  static instance;
  constructor() {
    this.repository = new UserRepository();
  }

  createTaskUser = async (req, res) => {
    const userData = req.body;
    const createdTask = await this.repository.createUser(userData);
    return res.json(createdTask);
  };

  getUser = async (req, res) => {
    const id = req.user.userId;
    const user = await this.repository.getUser(id);
    return res.json(user);
  };

  updateTaskUser = async (req, res) => {
    const id = req.user.userId;
    const user = req.body;

    const userUpdated = await this.repository.updateUser({ id, ...user });
    return res.json(userUpdated);
  };

  deleteTaskUser = async (req, res) => {
    const id = req.user.userId;
    await this.repository.deleteUser(id);

    return res.json({ ok: true });
  };
}
