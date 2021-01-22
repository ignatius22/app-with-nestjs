import { Document } from 'mongoose';
export interface Recipe extends Document {
  title: String,
  description: String,
  category: String,
  ingredients: Array<String>,
  image_url: String,
  instructions: String,
}