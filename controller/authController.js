import { userModal } from '../modals/userModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class authController {
  async register(req, res) {
    try {
        const { name, password, role } = req.body;

        if (role === 'admin') {
            const existingAdmin = await userModal.findOne({ role: 'admin' });
            if (existingAdmin) {
              return res.status(403).send({ message: "Admin already exists. Only one admin is allowed." });
            }
          }
      const hashed = await bcrypt.hash(password, 10);
      const user = new userModal({ name, password: hashed, role });
      await user.save();
      res.status(201).send({ message: "User registered", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).send({ message: "Registration failed", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const user = await userModal.findOne({ name });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } catch (error) {
      res.status(500).send({ message: "Login failed", error: error.message });
    }
  }
}
