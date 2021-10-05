const auctionService = require("../services/auctions");

exports.show = function (req, res) {
    try {
        const auctionId = req.params.id;
        var auction = auctionService.getById(auctionId);
        return res.status(200).json({ status: 200, data: auction, message: "Successful" });
    } catch (e) {
        throw Error('Error while getting auction');
    }
}