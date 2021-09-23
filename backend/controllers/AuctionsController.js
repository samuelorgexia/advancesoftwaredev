const AuctionService = require("../services/Auctions");

exports.show = function (req, res) {
    try {
        const auctionId = req.params.id;
        var auction = AuctionService.getById(auctionId);
        return res.status(200).json({ status: 200, data: auction, message: "Successful" });
    } catch (e) {
        throw Error('Error while getting auction');
    }
}