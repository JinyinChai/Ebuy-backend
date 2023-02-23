const verifyTokenAndAuthorization = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json("You are not allowed to do that!");
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json("You are not allowed to do that!");
    }
}

// verifies Token
module.exports = {verifyTokenAndAuthorization, verifyTokenAndAdmin};



