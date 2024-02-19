import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    content: { type: String, required: true },
    receiver: { type: String, required: true }
});

export const Message= mongoose.model("Message",messageSchema)
