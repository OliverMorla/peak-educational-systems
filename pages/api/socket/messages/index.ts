import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types/SocketTypes";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method === "POST") {
    // get message
    const { from_user_id, message_text, to_user_id } = await req.body;

    // save message to db
    const chat = await prisma.chat_messages.create({
      data: {
        from_user_id: from_user_id,
        to_user_id: to_user_id,
        message_text: message_text,
      },
    });

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message_text);

    // return message
    res.status(200).json({ message: message_text, ok: true, chat: chat });
  }
};
