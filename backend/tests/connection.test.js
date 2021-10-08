const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("connection", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should establish handshake", (done) => {
    serverSocket.on("connected", (cb) => {
      cb("connection established");
    });
    clientSocket.emit("connected", (arg) => {
      expect(arg).toBe("connection established");
      done();
    });
  });
});