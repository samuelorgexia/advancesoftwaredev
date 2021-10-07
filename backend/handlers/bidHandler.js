module.exports = (io, socket) => {
    let currentBid = 100000;

    const createBid = (bid) => {
        if (bid > currentBid) {
            currentBid = bid;
            socket.emit("bid:read", { message: "You are the new highest bidder!", price: currentBid });
            socket.broadcast.emit("bid:read", { message: `A new offer was made at $${currentBid.toLocaleString()}!`, price: currentBid });
        }
        else {
            socket.emit("bid:read", { message: "The offer you made was not enough. Please try again.", price: currentBid });
        }
    }

    socket.on("bid:create", createBid);
    io.emit("bid:read", { message: `Current action starting at $${currentBid.toLocaleString()}` , price: currentBid });
}