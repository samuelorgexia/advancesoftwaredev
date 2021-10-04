module.exports = (io, socket) => {
    let currentBid = 1000000;

    const createBid = (bid) => {
        if (bid > currentBid) {
            currentBid = bid;
        }
        
        io.emit("bid:read", currentBid);
    }
  
    socket.on("bid:create", createBid);
    io.emit("bid:read", currentBid);
}