import { Message } from "../models/message.model.js"

export const createMessage = async (req, res) => {
  try {
    const { sender, content, receiver } = req.body;
    const message = new Message({ sender, content, receiver });
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};
