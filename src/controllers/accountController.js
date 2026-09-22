const getBalance = (req, res) => {
    res.status(200).json({
        balance: req.user.balance
    });
};

module.exports = {
    getBalance
};