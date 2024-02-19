import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerPhone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String, //book ko url
      required: true,
    },
    available:{
      type:String,
    },
    status:{
      type:String,
    },
  },
  { timestamps: true },
)

export const Book = mongoose.model('Book', bookSchema)
