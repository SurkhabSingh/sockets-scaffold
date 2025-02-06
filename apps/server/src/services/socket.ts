import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "127.0.0.1",
  port: 6379,
});
const sub = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket service....");
    sub.subscribe("MESSAGES");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;
    console.log("init socket listener");
    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new message received", message);

        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
