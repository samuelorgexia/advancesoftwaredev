const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const registerBidHandler = require('./bidHandler');

describe("the bid handler", () => {
    let io, serverSocket, clientSocket

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);

        httpServer.listen(() => {
            const port = httpServer.address().port;

            clientSocket = new Client(`http://localhost:${port}`);

            io.on("connection", (socket) => {
                registerBidHandler(io, socket);
                serverSocket = socket;
            });

            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test('should provide the current highest bid', ()=> {
        clientSocket.on("bid:read", (bid) => {
            expect(bid).toBe(100000);
            done();
          });
    });

    describe("given a lower bid than the current highest bid", ()=> {
        test('should not update', ()=> {
            let userBid = 1;

            clientSocket.emit("bid:create", userBid);

            serverSocket.on("bid:create", (bid) => {
                expect(bid).not.toBe(1);
                expect(bid).toBe(100000);
                done();
            });
        });
    });

    describe("given a bid greater than the current highest bid", ()=> {
        test('should update the current bid', ()=> {
            let userBid = 1;

            clientSocket.emit("bid:create", userBid);

            serverSocket.on("bid:create", (bid) => {
                expect(bid).toBe(1);
                done();
            });
        });
    });
});