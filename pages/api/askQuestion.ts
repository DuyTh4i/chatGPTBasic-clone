// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '../../lib/queryApi'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "firebase-admin"
import { adminDB } from '../../firebaseAdmin'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {prompt, chatId, model, session } = req.body
    
    if(!prompt) {
        res.status(400).json({ answer: "Please provide a prompt!"})
        return
    }

    if(!chatId) {
        res.status(400).json({ answer: "Please provide a valid chat id!"})
        return
    }

    // chatGPT query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || "chatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            image: 'https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png'
        }
    }

    await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message)


    res.status(200).json({ answer: message.text })
}
