import express from 'express';
import Product from '../models/Product.js';
import upload from '../middleware/upload.js';
import auth from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product with image upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, design } = req.body;
    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const newProduct = new Product({ name, design, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, design, image } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, design, image },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Serve uploaded images statically
router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

export default router;
