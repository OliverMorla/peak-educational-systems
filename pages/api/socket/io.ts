import { Server as NetServer } from "http";
import { NextApiRequest, NextConfig } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types/SocketTypes";

export const config = {
  api: {
    bodyParser: false,
  },
};

const io = require('socket.io')(ServerIO, {
  cors: {
    origin: "*", // For testing. In production, replace with your domain
    methods: ["GET", "POST"]
  }
});

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      transports: ["websocket"],
      cors: {
        origin: process.env.NEXT_PUBLIC_CLIENT_URL, // For testing. In production, replace with your domain
        methods: ["GET", "POST"]
      }
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
