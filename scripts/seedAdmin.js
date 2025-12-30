import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = 'admin@gmail.com';
  const password = 'Agra@1234';
  const hashedPassword = await bcryptjs.hash(password, 10);
  const exists = await Admin.findOne({ email });
  if (!exists) {
    await Admin.create({ email, password: hashedPassword });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
  mongoose.disconnect();
}

seedAdmin();
