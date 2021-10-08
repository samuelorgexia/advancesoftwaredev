module.exports = (io, socket) => {
    const createBid = ({ userBid, highestBid }) => {
        let newHighestBid = highestBid
        if (userBid > highestBid) {
            newHighestBid = userBid;
            socket.emit("bid:read", { message: "You are the new highest bidder!", price: newHighestBid });
            socket.broadcast.emit("bid:read", { message: `A new offer was made at $${newHighestBid.toLocaleString()}!`, price: newHighestBid });
        }
        else {
            socket.emit("bid:read", { message: "The offer you made was not enough. Please try again.", price: newHighestBid });
        }
    }

    socket.on("bid:create", createBid);
}