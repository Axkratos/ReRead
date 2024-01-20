
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    
  },
  genre: {
    type: String,
    required: true,
  },

//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
  location:{
    type:Number,
    required:true
  },
  photo: {
    type: String, //book ko url
    required: true
  },
  
},{timestamps:true});

export const Book = mongoose.model('Book', bookSchema);


